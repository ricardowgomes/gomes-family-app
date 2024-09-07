import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { transactionsKeys } from "./transactionsKeys";
import { useServices } from "../useServices";

export const useMutateTransaction = () => {
  const queryClient = useQueryClient();
  const { transactionService } = useServices();

  const invalidateTransactions = () => {
    queryClient.invalidateQueries({ queryKey: transactionsKeys.root });
  };

  const addTransaction = useMutation({
    mutationFn: transactionService.create,
    onSuccess: () => {
      invalidateTransactions();
    },
  });

  const removeTransaction = useMutation({
    mutationFn: transactionService.delete,
    onSuccess: () => {
      invalidateTransactions();
    },
  });

  const updateTransaction = useMutation({
    mutationFn: transactionService.update,
    onSuccess: () => {
      invalidateTransactions();
    },
  });

  const removeLabelFromTransaction = useMutation({
    mutationFn: transactionService.removeLabel,
    onSuccess: () => {
      invalidateTransactions();
    },
  });

  return {
    addTransaction,
    removeTransaction,
    updateTransaction,
    removeLabelFromTransaction,
  };
};
