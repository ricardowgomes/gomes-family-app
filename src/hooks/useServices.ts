import { useMemo } from "react";
import { TransactionService } from "@/services/transaction.service";
import { LabelService } from "@/services/label.service";

export const useServices = (): {
  transactionService: TransactionService;
  labelService: LabelService;
} => {
  return useMemo(
    () => ({
      transactionService: new TransactionService(),
      labelService: new LabelService(),
    }),
    [],
  );
};
