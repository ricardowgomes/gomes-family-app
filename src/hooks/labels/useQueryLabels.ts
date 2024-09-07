import { useQuery } from "@tanstack/react-query";
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

  const queryRequest = useQuery({
    queryKey: labelsKeys.search(debouncedSearchTerm, excludedIds),
    queryFn: async () =>
      labelService.getAll({
        excludedIds,
        searchTerm,
      }),
    initialData: [],
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
