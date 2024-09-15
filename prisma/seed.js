import { PrismaClient } from "@prisma/client";
import { fileURLToPath } from "url";
import { dirname } from "path";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

// Recreate __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  // Load data from JSON files
  const keywordsFilePath = path.join(__dirname, "seeds/keywords.json");
  const labelsFilePath = path.join(__dirname, "seeds/labels.json");

  const keywordsData = JSON.parse(fs.readFileSync(keywordsFilePath, "utf-8"));
  const labelsData = JSON.parse(fs.readFileSync(labelsFilePath, "utf-8"));

  /**
   * Create Labels
   */
  await prisma.label.createMany({
    data: labelsData,
    skipDuplicates: true,
  });

  /**
   * Create Keywords
   */
  await prisma.keyword.createMany({
    data: keywordsData,
    skipDuplicates: true,
  });

  console.log("Labels and Keywords seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
