import { useQueryLabels } from "@/hooks/labels";
import { Label } from "@/types";
import { Select } from "@chakra-ui/react";
import { useState } from "react";

const findLabelById = (id: string, labels: Label[]): Label => {
  const item = labels.find((label) => label.id === id);

  if (item === undefined) {
    throw new Error("Label not found");
  }

  return item;
};

const LabelSelector = ({ addLabel }: { addLabel: (label: Label) => void }) => {
  const { data } = useQueryLabels();
  const [labelsOptions, setLabelOptions] = useState<Label[] | []>(data);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value } = e.target;
    const label = findLabelById(value, labelsOptions);
    /**
     * Adds to selected list
     */
    addLabel(label);

    setLabelOptions((prev) => prev.filter((label) => label.id !== value));
  };

  return (
    <Select onChange={handleChange} placeholder="Select a label">
      {labelsOptions.map((label) => (
        <option key={label.id} value={label.id}>
          {label.name}
        </option>
      ))}
    </Select>
  );
};

export default LabelSelector;
