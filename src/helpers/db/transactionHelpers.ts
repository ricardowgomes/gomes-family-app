import { RecordNotFound } from "@/errors";
import { PrismaClient, type Transaction } from "@prisma/client";

const prisma = new PrismaClient();

export async function getTransactionById(
  transactionId: string,
): Promise<Transaction | null> {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
      include: {
        labels: true,
      },
    });
    return transaction;
  } catch (error) {
    throw new RecordNotFound(`Transaction ID ${transactionId} not found`);
  }
}
