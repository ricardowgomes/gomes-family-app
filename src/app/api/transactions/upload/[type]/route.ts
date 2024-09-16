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
  const transactions = await validate(body.data.transactions);

  const tangerineLabelName = "tangerine-cc";
  const label = await findOrCreateLabel(body.data.label);
  const tangerineLabel = await findOrCreateLabel(tangerineLabelName);

  try {
    // Collect all keywords and create a map for fast lookup
    const keywords = [...new Set(transactions.map(record => serializer(record).keyword))];
    const keywordLabels = await Promise.all(keywords.map(keyword => findOrCreateKeyword(keyword)));
    const keywordMap = new Map(keywordLabels.map(kl => [kl.name, kl.labelId]));

    // Use a transaction to ensure atomicity
    await prisma.$transaction(async (prisma) => {
      await Promise.all(transactions.map(async (record) => {
        const { keyword, date, ...transaction } = serializer(record);
        const keywordLabelId = keywordMap.get(keyword);

        await prisma.transaction.create({
          data: {
            ...transaction,
            date: new Date(date),
            labels: {
              connect: [
                { id: tangerineLabel.id },
                { id: keywordLabelId },
                { id: label.id }
              ],
            },
          },
        });
      }));
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
