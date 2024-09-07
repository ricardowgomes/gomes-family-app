import { Label } from "./label.types";

export enum TransactionType {
  EXPENSE = "expense",
  INCOME = "income",
}

export interface BaseTransaction {
  transactionType: TransactionType;
  name: string;
  amount: number;
  date: string;
}

export interface NewTransaction extends BaseTransaction {
  labelIds: string[];
}

export interface Transaction extends BaseTransaction {
  id: string;
  labels: Label[];
}

export type PartialTransaction = Partial<Transaction>;

export interface UpdateTransaction {}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export enum SortBy {
  DATE = "date",
  AMOUNT = "amount",
}

export interface TransactionFilters {
  searchTerm?: string;
  labelIds?: string[];
  startDate?: string;
  endDate?: string;
  minAmount?: number | null;
  maxAmount?: number | null;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}

export enum StatementUploadType {
  TangerineCC = "tangerine-cc",
}
