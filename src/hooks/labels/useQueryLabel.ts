import { useSuspenseQuery } from "@tanstack/react-query";
import { labelsKeys } from "./labelsKeys";
import { useServices } from "../useServices";

export const useQueryLabel = (id: string) => {
  const { labelService } = useServices();

  return useSuspenseQuery({
    queryKey: labelsKeys.single(id),
    queryFn: async () => labelService.getOne(id),
  });
};
