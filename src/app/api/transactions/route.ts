import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
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

    // Convert labelIds to array, default to empty array if not provided
    const labelsArray = labelIds ? labelIds.split(",") : [];

    // Parse minAmount and maxAmount
    const minAmountNumber = minAmount ? parseFloat(minAmount) : undefined;
    const maxAmountNumber = maxAmount ? parseFloat(maxAmount) : undefined;

    // Construct filters
    const filters: any = {
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

    // Ensure valid sortBy field
    const validSortFields = ["date", "amount", "name", "transactionType"];
    const orderByField = validSortFields.includes(sortBy) ? sortBy : "date";

    const transactions = await prisma.transaction.findMany({
      where: filters,
      orderBy: {
        [orderByField]: sortOrder,
      },
      include: {
        labels: true,
      },
    });

    return Response.json(transactions);
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate and format incoming data
    const { labelIds = [], ...transactionData } = data;

    // Process labels: either connect to existing labels or create new ones
    const processedLabels = await Promise.all(
      labelIds.map(async (labelId: string) => {
        const existingLabel = await prisma.label.findUnique({
          where: { id: labelId },
        });

        if (existingLabel) {
          return { id: existingLabel.id };
        } else {
          throw new Error(`Label with id ${labelId} not found`);
        }
      }),
    );

    // Create the transaction with associated labels
    const newTransaction = await prisma.transaction.create({
      data: {
        ...transactionData,
        labels: {
          connect: processedLabels,
        },
      },
    });

    return Response.json(newTransaction);
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
