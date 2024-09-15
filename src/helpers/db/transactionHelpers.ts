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

// Helper function: Parse query parameters
export function parseQueryParams(request: Request) {
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
    page = "1",
    limit = "10",
  } = queryObj;

  // Convert labelIds to array
  const labelsArray = labelIds ? labelIds.split(",") : [];

  // Parse amounts and pagination
  const minAmountNumber = minAmount ? parseFloat(minAmount) : undefined;
  const maxAmountNumber = maxAmount ? parseFloat(maxAmount) : undefined;
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  return {
    transactionType,
    searchTerm,
    labelsArray,
    startDate,
    endDate,
    minAmountNumber,
    maxAmountNumber,
    sortBy,
    sortOrder,
    pageNumber,
    limitNumber,
  };
}

// Helper function: Build filters
export function buildFilters({
  searchTerm,
  transactionType,
  labelsArray,
  startDate,
  endDate,
  minAmountNumber,
  maxAmountNumber,
}: any) {
  return {
    AND: [
      searchTerm
        ? { name: { contains: searchTerm, mode: "insensitive" } }
        : undefined,
      transactionType ? { transactionType } : undefined,
      labelsArray.length > 0
        ? { labels: { some: { id: { in: labelsArray } } } }
        : undefined,
      startDate ? { date: { gte: new Date(startDate) } } : undefined,
      endDate ? { date: { lte: new Date(endDate) } } : undefined,
      minAmountNumber !== undefined
        ? { amount: { gte: minAmountNumber } }
        : undefined,
      maxAmountNumber !== undefined
        ? { amount: { lte: maxAmountNumber } }
        : undefined,
    ].filter(Boolean),
  };
}

// Helper function: Validate and return the sort field
export function getValidSortField(sortBy: string) {
  const validSortFields = ["date", "amount", "name", "transactionType"];
  return validSortFields.includes(sortBy) ? sortBy : "date";
}

// Helper function: Fetch transactions
export async function fetchTransactions({
  filters,
  sortBy,
  sortOrder,
  skip,
  take,
}: any) {
  const transactions = await prisma.transaction.findMany({
    where: filters,
    orderBy: { [sortBy]: sortOrder },
    include: { labels: true },
    skip,
    take,
  });

  const totalAmount = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: filters,
  });

  const count = await prisma.transaction.count({ where: filters });

  return { transactions, totalAmount: totalAmount._sum.amount, count };
}
