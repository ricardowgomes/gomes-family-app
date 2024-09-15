import { TangerineCreditTransaction } from "@/dto/tangerine-credit-transaction.dto";
import { TransactionType } from "@/types";

export const serializeTangerineTransaction = (
  row: TangerineCreditTransaction,
): {
  transactionType: TransactionType;
  name: string;
  amount: number;
  date: string;
  keyword: string;
} => {
  // Extract labels from Memo
  const memo = row["Memo"].split("~ Category:");
  const keyword = memo[1].trim();

  const amount = parseFloat(row["Amount"]);
  const transactionType =
    amount < 0 ? TransactionType.EXPENSE : TransactionType.INCOME;

  return {
    transactionType,
    name: row["Name"],
    amount,
    date: row["Transaction date"],
    keyword,
  };
};
