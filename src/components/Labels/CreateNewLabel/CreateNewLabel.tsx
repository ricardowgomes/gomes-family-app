"use client";

import { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useMutateLabel } from "@/hooks/labels";

const CreateNewLabel = () => {
  const { addLabel } = useMutateLabel();
  const [newLabel, setNewLabel] = useState<string>("");

  const onCreateNewLabel = () => {
    if (newLabel) {
      addLabel.mutate({
        name: newLabel,
      });
    }
  };

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type="text"
        placeholder="create new label"
        value={newLabel}
        onChange={(e) => setNewLabel(e.target.value)}
      />
      <InputRightElement width="4.5rem">
        <IconButton
          aria-label="create new label"
          icon={<AddIcon color="teal" />}
          onClick={onCreateNewLabel}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default CreateNewLabel;
