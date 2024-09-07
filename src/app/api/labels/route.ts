import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('searchTerm') || '';
  const excludedIds = url.searchParams.get('excludedIds') || '';

  try {
    const labels = await prisma.label.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: 'insensitive',
        },
        id: {
          notIn: excludedIds.split(','),
        },
      },
    })

    return Response.json(labels);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function POST(request: Request) {
  const body = await request.json()

  const newLabel = await prisma.label.create({
    data: {
      name: body.name
    }
  });

  return new Response(JSON.stringify(newLabel), {
    status: 200
  })
}


