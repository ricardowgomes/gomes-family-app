import { RecordNotCreated, RecordNotFound } from "@/errors";
import { Keyword, PrismaClient } from "@prisma/client";
import { createLabel, findHomonymLabel } from "./labelHelpers";

const prisma = new PrismaClient();

export async function createKeyword(
  keywordName: string,
  labelId: string,
): Promise<Keyword> {
  try {
    const keyword = await prisma.keyword.create({
      data: {
        name: keywordName,
        labelId,
      },
    });

    return keyword;
  } catch (error) {
    console.error("Error in createKeyword:", error);
    throw new RecordNotCreated(`Keyword ${keywordName} not created`);
  }
}

export async function getKeywordByName(keywordName: string): Promise<Keyword> {
  const keyword = await prisma.keyword.findFirst({
    where: {
      name: {
        // Use the contains operator with mode: 'insensitive' for case-insensitive search
        contains: keywordName,
        mode: "insensitive",
      },
    },
  });

  // Check if the keyword was found and return it
  if (keyword) {
    return keyword;
  } else {
    throw new RecordNotFound(`Keyword ${keywordName} not found`);
  }
}

export async function findOrCreateKeyword(
  keywordName: string,
): Promise<Keyword> {
  try {
    const keyword = await getKeywordByName(keywordName);
    return keyword;
  } catch (error) {
    if (error.name === "RecordNotFound") {
      try {
        let label = await findHomonymLabel(keywordName);

        if (!label) {
          label = await createLabel(keywordName);
        }

        const keyword = await createKeyword(keywordName, label.id);
        return keyword;
      } catch (error) {
        throw new RecordNotCreated(
          `Keyword ${keywordName} not created: ${error.message}`,
        );
      }
    }
    throw new RecordNotFound(
      `Keyword ${keywordName} not found: ${error.message}`,
    );
  }
}
