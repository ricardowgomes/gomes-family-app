export * from "./colors";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const SITE_MAP = {
  home: "/" as const,
  finances: "/finances" as const,
  transactions: "/finances/transactions" as const,
  labels: "/finances/labels" as const,
  uploadTransactions: "/finances/upload" as const,
};
