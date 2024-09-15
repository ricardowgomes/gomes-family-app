import { buildFilters, fetchTransactions, getValidSortField, parseQueryParams } from "@/helpers/db";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Route handler: GET
export async function GET(request: Request) {
  try {
    const queryParams = parseQueryParams(request);
    const filters = buildFilters(queryParams);
    const sortBy = getValidSortField(queryParams.sortBy);
    const skip = (queryParams.pageNumber - 1) * queryParams.limitNumber;
    const take = queryParams.limitNumber;

    const { transactions, totalAmount, count } = await fetchTransactions({
      filters,
      sortBy,
      sortOrder: queryParams.sortOrder,
      skip,
      take,
    });

    return Response.json({
        transactions,
        count,
        totalAmount,
        totalPages: Math.ceil(count / queryParams.limitNumber),
      });
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
