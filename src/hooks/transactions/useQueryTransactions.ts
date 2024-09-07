import { useSuspenseQuery } from "@tanstack/react-query";
import { transactionsKeys } from "./transactionsKeys";
import { useServices } from "../useServices";
import { useState } from "react";
import useDebounce from "../useDebounce";
import { SortBy, SortOrder } from "@/types";
import { set } from "date-fns";

export const useQueryTransactions = () => {
  const { transactionService } = useServices();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [labelIds, setLabelIds] = useState<string[]>([]);
  const [searchTerm, debouncedSearchTerm, setSearchTerm] = useDebounce<string>(
    "",
    300,
  );
  const [minAmount, setMinAmount] = useState<number | null>(null);
  const [maxAmount, setMaxAmount] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.DATE);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setLabelIds([]);
    setSearchTerm('');
    setMinAmount(null);
    setMaxAmount(null);
    setSortBy(SortBy.DATE);
    setSortOrder(SortOrder.DESC);
  };

  const transactionsQuery = useSuspenseQuery({
    queryKey: transactionsKeys.all({
      startDate,
      endDate,
      labelIds,
      searchTerm: debouncedSearchTerm,
      minAmount,
      maxAmount,
      sortBy,
      sortOrder,
    }),
    queryFn: async () => transactionService.getAll({
      startDate,
      endDate,
      labelIds,
      searchTerm: debouncedSearchTerm,
      minAmount,
      maxAmount,
      sortBy,
      sortOrder,
    }),
  })

  return {
    ...transactionsQuery,
    searchTerm,
    setSearchTerm,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    labelIds,
    setLabelIds,
    minAmount,
    setMinAmount,
    maxAmount,
    setMaxAmount,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    clearFilters,
  };
};
