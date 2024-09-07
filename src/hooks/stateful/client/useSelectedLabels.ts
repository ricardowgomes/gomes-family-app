import { Label } from "@/types";
import { useStore } from "@tanstack/react-store";
import { Store } from "@tanstack/store";

export const selectedLabelsStore = new Store<Label[]>([]);

const addLabel = (label: Label) => {
  selectedLabelsStore.setState((state) => {
    return [...state, label];
  });
};

const useSelectedLabels = () => {
  const selectedLabels = useStore(selectedLabelsStore, (state) => state);

  return {
    addLabel,
    selectedLabels,
  };
};

export default useSelectedLabels;
