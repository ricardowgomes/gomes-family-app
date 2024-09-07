import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams;

  const searchTerm: string = query.get('searchTerm') || '';
  const labelIds: string[] = (query.get('labelIds') || '').split(','); // comma separated list of labels ids

  const transactions = await prisma.transaction.findMany();
  return Response.json(transactions)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const newTransaction = await prisma.transaction.create({
      data
    });

    return Response.json(newTransaction)
  } catch (error) {
    return Promise.reject(error)
  }
}
