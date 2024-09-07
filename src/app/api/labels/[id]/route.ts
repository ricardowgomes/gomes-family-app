import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  _request: Request,
  context: { params: { id: string } },
) {
  const id = context.params.id;

  try {
    const label = await prisma.label.findUnique({
      where: {
        id,
      },
    });

    return Response.json(label);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } },
) {
  const id = context.params.id;

  try {
    await prisma.label.delete({
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
    const updatedLabel = await prisma.label.update({
      where: {
        id,
      },
      data,
    });
    return Response.json(updatedLabel);
  } catch (error) {
    return Promise.reject(error);
  }
}
