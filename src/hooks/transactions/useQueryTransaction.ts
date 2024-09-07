import { useSuspenseQuery } from "@tanstack/react-query";
import { transactionsKeys } from "./transactionsKeys";
import { useServices } from "../useServices";

export const useQueryTransaction = (id: string) => {
  const { transactionService } = useServices();

  return useSuspenseQuery({
    queryKey: transactionsKeys.single(id),
    queryFn: async () => transactionService.getOne(id),
  });
};
