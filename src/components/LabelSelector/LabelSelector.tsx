import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useMutateLabel, useQueryLabels } from "@/hooks/labels";
import { SingleValue } from "react-select";
import { VStack } from "@chakra-ui/react";
import { NewTransaction } from "@/types";
import SelectedLabels from "./SelectedLabels";
import styles from "./LabelSelector.module.scss";

interface LabelSelectorProps {
  onLabelSelection: (labelId: string) => void;
  onLabelRemoval: (labelId: string) => void;
  selectedLabelIds: NewTransaction["labelIds"];
}

interface SelectOption {
  label: string;
  value: string;
}

const LabelSelector: React.FC<LabelSelectorProps> = ({
  onLabelSelection,
  onLabelRemoval,
  selectedLabelIds,
}) => {
  const {
    data: labels,
    excludeIdFromSearch,
    removeFromExcludedList,
  } = useQueryLabels();
  const { addLabel } = useMutateLabel();
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (selectedOption: SingleValue<SelectOption>) => {
    if (selectedOption) {
      excludeIdFromSearch(selectedOption.value);
      onLabelSelection(selectedOption.value);
      setTimeout(() => setSelectedValue(null), 10);
    }
  };

  const handleCreate = (inputValue: string) => {
    addLabel.mutate(
      {
        name: inputValue,
      },
      {
        onSuccess: (newLabel) => {
          onLabelSelection(newLabel.id);
          excludeIdFromSearch(newLabel.id);
        },
      },
    );
  };

  const handleRemoveLabel = (labelId: string) => {
    onLabelRemoval(labelId);
    removeFromExcludedList(labelId);
  };

  const options: SelectOption[] = labels.map((label) => ({
    value: label.id,
    label: label.name,
  }));

  return (
    <VStack width="100%">
      <CreatableSelect
        options={options}
        onChange={handleSelect}
        onCreateOption={handleCreate}
        value={selectedValue}
        isClearable
        isSearchable
        placeholder="Select or create a label"
        className={styles.selector}
      />
      <SelectedLabels
        labelIds={selectedLabelIds}
        handleRemoveLabel={handleRemoveLabel}
      />
    </VStack>
  );
};

export default LabelSelector;
