import { Transaction } from "@/types";

export function gefDiffTransaction<T extends object>(
  original: Transaction,
  updated: Transaction,
): Partial<Transaction> {
  const diff: Partial<T> = {};

  for (const key in updated) {
    if (updated.hasOwnProperty(key)) {
      const originalValue = original[key];
      const updatedValue = updated[key];

      if (
        typeof updatedValue === "object" &&
        updatedValue !== null &&
        !Array.isArray(updatedValue)
      ) {
        const nestedDiff = gefDiffTransaction(originalValue, updatedValue);
        if (Object.keys(nestedDiff).length > 0) {
          diff[key] = nestedDiff;
        }
      } else if (originalValue !== updatedValue) {
        diff[key] = updatedValue;
      }
    }
  }

  return diff;
}
