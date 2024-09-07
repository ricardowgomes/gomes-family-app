import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useMutateLabel, useQueryLabels } from "@/hooks/labels";
import { Label } from "@/types";
import { SingleValue } from "react-select";

interface LabelSelectorProps {
  selectLabel: (label: Label) => void;
}

interface SelectOption {
  label: string;
  value: string;
}

export const LabelSelector: React.FC<LabelSelectorProps> = ({
  selectLabel,
}) => {
  const { data: labels, excludeIdFromSearch } = useQueryLabels();
  const { addLabel } = useMutateLabel();
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (selectedOption: SingleValue<SelectOption>) => {
    if (selectedOption) {
      excludeIdFromSearch(selectedOption.value);
      selectLabel({
        id: selectedOption.value,
        name: selectedOption.label,
      });
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
          selectLabel(newLabel);
        },
      },
    );
  };

  const options: SelectOption[] = labels.map((label) => ({
    value: label.id,
    label: label.name,
  }));

  return (
    <CreatableSelect
      options={options}
      onChange={handleSelect}
      onCreateOption={handleCreate}
      value={selectedValue}
      isClearable
      isSearchable
      placeholder="Select or create a label"
    />
  );
};
