import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  context: { params: { id: string } },
) {
  const id = context.params.id;
  const body = await request.json();
  const labelId = body.params.labelId;

  try {
    const transaction = await prisma.transaction.update({
      where: { id },
      data: {
        labels: {
          disconnect: { id: labelId },
        },
      },
    });

    if (!transaction) {
      return Response.json({ error: "Transaction not found.", status: 404 });
    }

    return Response.json(transaction);
  } catch (error) {
    console.error("Error removing label ID:", error);
    return Response.json({
      error: "An error occurred while updating the transaction.",
    });
  }
}
