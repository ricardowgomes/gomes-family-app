import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  context: { params: { id: string } },
) {
  const id = context.params.id;
  const { labelId: labelIdToRemove } = await request.json();

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      return Response.json({ error: "Transaction not found.", status: 404 });
    }

    const updatedLabelIds = transaction.labelIds.filter(
      (labelId) => labelId !== labelIdToRemove,
    );

    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: { labelIds: updatedLabelIds },
    });

    return Response.json(updatedTransaction);
  } catch (error) {
    console.error("Error removing label ID:", error);
    return Response.json({
      error: "An error occurred while updating the transaction.",
    });
  }
}
