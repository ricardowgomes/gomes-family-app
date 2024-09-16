import { useSuspenseQuery } from "@tanstack/react-query";
import { transactionsKeys } from "./transactionsKeys";
import { useServices } from "../useServices";
import { useState } from "react";
import useDebounce from "../useDebounce";
import { SortBy, SortOrder } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { SITE_MAP } from "@/constants";

export const useQueryTransactions = () => {
  const { transactionService } = useServices();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [labelIds, setLabelIds] = useState<string[]>([]);
  const [searchTerm, debouncedSearchTerm, setSearchTerm] = useDebounce<string>(
    "",
    300,
  );
  const [minAmount, debouncedMinAmount, setMinAmount] = useDebounce<
    number | null
  >(null, 500);
  const [maxAmount, debouncedMaxAmount, setMaxAmount] = useDebounce<
    number | null
  >(null, 500);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.DATE);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);
  const [pageLimit, setPageLimit] = useState<number>(10);

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setLabelIds([]);
    setSearchTerm("");
    setMinAmount(null);
    setMaxAmount(null);
    setSortBy(SortBy.DATE);
    setSortOrder(SortOrder.DESC);

    router.push(SITE_MAP.transactions);
  };

  const transactionsQuery = useSuspenseQuery({
    queryKey: transactionsKeys.all({
      page,
      limit: pageLimit,
      startDate,
      endDate,
      labelIds,
      searchTerm: debouncedSearchTerm,
      minAmount: debouncedMinAmount,
      maxAmount: debouncedMaxAmount,
      sortBy,
      sortOrder,
    }),
    queryFn: async () =>
      transactionService.getAll({
        page,
        limit: pageLimit,
        startDate,
        endDate,
        labelIds,
        searchTerm: debouncedSearchTerm,
        minAmount: debouncedMinAmount,
        maxAmount: debouncedMaxAmount,
        sortBy,
        sortOrder,
      }),
  });

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
    page,
    pageLimit,
    setPageLimit,
  };
};
