import { LabelQueryParams } from '@/types';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const searchTerm: LabelQueryParams['searchTerm'] = searchParams.get('searchTerm') || '';
    const excludedIds: LabelQueryParams['excludedIds'] = (searchParams.get('excludedIds') || '').split(',');

    const labels = await prisma.label.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: 'insensitive',
        },
        id: {
          notIn: excludedIds,
        },
      },
      orderBy: {
        name: 'asc',
      }
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


