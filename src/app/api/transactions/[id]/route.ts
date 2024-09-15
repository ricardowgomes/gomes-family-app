import { getTransactionById } from "@/helpers/db";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  _request: Request,
  context: { params: { id: string } },
) {
  const id = context.params.id;

  try {
    await prisma.transaction.delete({
      where: {
        id,
      },
    });
    return Promise.resolve(new Response(null, { status: 200 }));
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function PUT(
  request: Request,
  context: { params: { id: string } },
) {
  const id = context.params.id;
  const data = await request.json();

  try {
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id,
      },
      data
    });
    return Response.json(updatedTransaction);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function GET(
  _request: Request,
  context: { params: { id: string } },
) {
  try {
    const transaction = await getTransactionById(context.params.id)
    return Response.json(transaction);
  } catch (error) {
    return Response.error();
  }
}
