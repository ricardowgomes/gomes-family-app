import { RecordNotCreated, RecordNotFound } from "@/errors";
import { Label, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createLabel(labelName: string): Promise<Label> {
  try {
    const label = await prisma.label.create({
      data: {
        name: labelName,
      },
    });

    return label;
  } catch (error) {
    throw new RecordNotCreated(`Label ${labelName} not created`);
  }
}

export async function findOrCreateLabel(labelName: string): Promise<Label> {
  try {
    const label = await prisma.label.upsert({
      where: { name: labelName },
      update: {},
      create: {
        name: labelName,
      },
    });

    return label;
  } catch (error) {
    throw new RecordNotCreated(`Label ${labelName} not created`);
  }
}

export async function getLabelByKeywordName(
  keywordName: string,
): Promise<Label> {
  const keyword = await prisma.keyword.findFirst({
    where: {
      name: {
        // Use the `contains` operator with `mode: 'insensitive'` for case-insensitive search
        contains: keywordName,
        mode: "insensitive",
      },
    },
    include: {
      label: true, // Include the related label
    },
  });

  // Check if the keyword was found and return its label
  if (keyword) {
    return keyword.label;
  } else {
    throw new RecordNotFound(`Label for ${keywordName} keyword not found`);
  }
}

export async function findHomonymLabel(
  keywordName: string,
): Promise<Label | null> {
  const label = await prisma.label.findFirst({
    where: {
      name: {
        // Use the `contains` operator with `mode: 'insensitive'` for case-insensitive search
        contains: keywordName,
        mode: "insensitive",
      },
    },
  });

  return label;
}

export async function getLabelsById(labelIds: string[]): Promise<Label[]> {
  try {
    const labels = await prisma.label.findMany({
      where: {
        id: {
          in: labelIds,
        },
      },
    });

    return labels;
  } catch (error) {
    throw new RecordNotFound(`Labels not found: ${error.message}`);
  }
}

export async function createLabels(labelNames: string[]): Promise<void> {
  try {
    const labels = await prisma.label.createMany({
      data: labelNames.map((name) => ({ name })),
    });

    console.log(
      `${labelNames.length} names given, ${labels.count} labels created!`,
    );
  } catch (error) {
    throw new RecordNotCreated(`Labels not created: ${error.message}`);
  }
}
