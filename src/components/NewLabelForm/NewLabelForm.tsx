'use client';

import { useMutateLabel } from "@/hooks/labels";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import ModalWithButton from "../Modals/ModalWithButton";


export default function NewLabelForm() {
  const { addLabel } = useMutateLabel();
  const [name, setName] = useState<string>("");

  const isError = !name;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addLabel.mutate({ name });
  };

  return (
    <ModalWithButton heading="New label">
      <Box padding={4}>
        <form onSubmit={onSubmit}>
          <FormControl isInvalid={isError}>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {!isError ? (
              <FormHelperText>Enter the new label name.</FormHelperText>
            ) : (
              <FormErrorMessage>Cannot not be empty</FormErrorMessage>
            )}
          </FormControl>

          <Divider orientation="horizontal" marginY={4} />

          <Button colorScheme="teal" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </ModalWithButton>
  );
}
