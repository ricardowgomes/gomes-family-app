import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams;
  const queryObj = Object.fromEntries(query.entries());

  const {
    transactionType = "",
    searchTerm = "",
    labelIds = "",
    startDate,
    endDate,
    minAmount,
    maxAmount,
    sortBy = "date",
    sortOrder = "desc",
  } = queryObj;

  const labelsArray = labelIds.split(",");
  const minAmountNumber = minAmount ? parseFloat(minAmount) : undefined;
  const maxAmountNumber = maxAmount ? parseFloat(maxAmount) : undefined;

  const filters: any = {
    AND: [
      searchTerm
        ? { name: { contains: searchTerm, mode: "insensitive" } }
        : undefined,
      transactionType ? { transactionType } : undefined,
      labelIds.length > 0
        ? { labelIds: { some: { id: { in: labelsArray } } } }
        : undefined,
      startDate ? { date: { gte: new Date(startDate) } } : undefined,
      endDate ? { date: { lte: new Date(endDate) } } : undefined,
      minAmount !== undefined
        ? { amount: { gte: minAmountNumber } }
        : undefined,
      maxAmount !== undefined
        ? { amount: { lte: maxAmountNumber } }
        : undefined,
    ].filter(Boolean),
  };

  const transactions = await prisma.transaction.findMany({
    where: filters,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  return Response.json(transactions);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newTransaction = await prisma.transaction.create({
      data,
    });

    return Response.json(newTransaction);
  } catch (error) {
    return Promise.reject(error);
  }
}
