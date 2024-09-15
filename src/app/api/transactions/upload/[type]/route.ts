import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { serializeTangerineTransaction } from "@/helpers/serializers";
import { findOrCreateLabel, findOrCreateKeyword } from "@/helpers/db";
import { StatementUploadType } from "@/types";
import { validateTangerineTransactions } from "@/helpers/validators";

const prisma = new PrismaClient();

const SerializerMap = {
  [StatementUploadType.TangerineCC]: serializeTangerineTransaction,
};

const ValidatorsMap = {
  [StatementUploadType.TangerineCC]: validateTangerineTransactions,
};

export async function POST(
  request: Request,
  context: { params: { type: StatementUploadType } },
) {
  const serializer = SerializerMap[context.params.type];
  const validate = ValidatorsMap[context.params.type];
  const body = await request.json();
  const data = await validate(body.data);

  try {
    data.forEach(async (record) => {
      const { keyword, date, ...transaction } = serializer(record);

      const keywordLabel = await findOrCreateKeyword(keyword);
      const tangerineLabel = await findOrCreateLabel("tangerine-cc");

      // TODO: Extract this into a transaction helper function
      await prisma.transaction.create({
        data: {
          ...transaction,
          date: new Date(date),
          labels: {
            connect: [{ id: tangerineLabel.id }, { id: keywordLabel.labelId }],
          },
        },
      });
    });
    return NextResponse.redirect(
      "http://localhost:3000/finances/transactions",
      { status: 302 },
    );
  } catch (error) {
    console.error("[ERROR in POST for route /transactions/upload]", error);
    return NextResponse.error();
  }
}
