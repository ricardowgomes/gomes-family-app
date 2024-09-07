"use client";

import React, { useState } from "react";
import { Input, Text, IconButton, Flex } from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

interface EditableFieldProps {
  onSubmit: (v: string) => void;
  defaultValue: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
  onSubmit,
  defaultValue,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = () => {
    onSubmit(value);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(defaultValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Flex
        minWidth="200"
        alignItems="center"
        justifyContent="space-between"
        gap="8"
      >
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="md"
        />
        <Flex
          minWidth="max-content"
          alignItems="center"
          justifyContent="space-between"
          gap="2"
        >
          <IconButton
            aria-label="submit"
            variant="outline"
            onClick={handleSubmit}
            colorScheme="teal"
            icon={<CheckIcon color="teal" />}
            size="sm"
          />
          <IconButton
            aria-label="cancel"
            variant="outline"
            onClick={handleCancel}
            colorScheme="red"
            icon={<CloseIcon color="red" />}
            size="sm"
          />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex
      minWidth="200"
      alignItems="center"
      justifyContent="space-between"
      gap="8"
    >
      <Text fontSize="md">{value}</Text>
      <IconButton
        aria-label="edit"
        onClick={() => setIsEditing(true)}
        icon={<EditIcon color="teal" />}
        colorScheme="teal"
        size="sm"
        variant="outline"
      />
    </Flex>
  );
};

export default EditableField;
