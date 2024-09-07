import { useSuspenseQuery } from "@tanstack/react-query";
import { labelsKeys } from "./labelsKeys";
import { useServices } from "../useServices";
import { useState } from "react";
import useDebounce from "../useDebounce";

export const useQueryLabels = () => {
  const { labelService } = useServices();
  const [searchTerm, debouncedSearchTerm, setSearchTerm] = useDebounce<string>(
    "",
    300,
  );
  const [excludedIds, setExcludedIds] = useState<string[]>([]);

  const queryRequest = useSuspenseQuery({
    queryKey: labelsKeys.search(debouncedSearchTerm, excludedIds),
    queryFn: async () =>
      labelService.getAll({
        excludedIds,
        searchTerm: debouncedSearchTerm,
      }),
  });

  const excludeIdFromSearch = (id: string) =>
    setExcludedIds((prev) => [...prev, id]);

  return {
    ...queryRequest,
    searchTerm,
    setSearchTerm,
    excludeIdFromSearch,
  };
};
