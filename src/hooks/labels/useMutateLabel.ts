import { useMutation, useQueryClient } from "@tanstack/react-query";
import { labelsKeys } from "./labelsKeys";
import { useServices } from "../useServices";

export const useMutateLabel = () => {
  const queryClient = useQueryClient();
  const { labelService } = useServices();

  const invalidateLabels = () => {
    queryClient.invalidateQueries({ queryKey: labelsKeys.root });
  };

  const addLabel = useMutation({
    mutationFn: labelService.create,
    onSuccess: () => {
      invalidateLabels();
    },
  });

  const removeLabel = useMutation({
    mutationFn: labelService.delete,
    onSuccess: () => {
      invalidateLabels();
    },
  });

  const updateLabel = useMutation({
    mutationFn: labelService.update,
    onSuccess: () => {
      invalidateLabels();
    },
  });

  return {
    addLabel,
    removeLabel,
    updateLabel,
  };
};
