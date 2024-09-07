import { TransactionFilters } from "@/types";

export const transactionsKeys = {
  root: ["transactions"] as const,
  all: (filters: TransactionFilters) => [
    ...transactionsKeys.root,
    "all",
    filters,
  ],
  single: (id: string) => [...transactionsKeys.root, id],
};
