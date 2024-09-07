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
  labelIds?: Label[];
}

export type NewTransaction = BaseTransaction;

export interface Transaction extends BaseTransaction {
  id: string;
}

export type PartialTransaction = Partial<Transaction>;

export interface UpdateTransaction {}

export interface TransactionFilters {
  searchTerm?: string;
  labelIds?: string[];
  startDate?: string;
  endDate?: string;
  minAmount?: number | null;
  maxAmount?: number | null;
}
