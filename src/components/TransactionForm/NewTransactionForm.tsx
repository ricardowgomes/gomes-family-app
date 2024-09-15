'use client';

import { useState } from "react";
import { type NewTransaction, TransactionType } from "@/types";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
  Stack,
} from "@chakra-ui/react";
import { useMutateTransaction } from "@/hooks/transactions";
import { useQueryLabels } from "@/hooks/labels";
import LabelSelector from "../LabelSelector/LabelSelector";
import ModalWithButton from "../Modals/ModalWithButton";

const NewTransactionForm = () => {
  const { addTransaction } = useMutateTransaction();
  const [transaction, setTransaction] = useState<NewTransaction>({
      transactionType: TransactionType.EXPENSE,
      name: "",
      amount: 0,
      date: new Date().toISOString(),
      labelIds: [],
    },
  );
  const { removeFromExcludedList } = useQueryLabels();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTransaction.mutate(transaction);
  };

  const onLabelSelection = (labelId: string) => {
    setTransaction((prev) => {
      if (prev.labelIds.includes(labelId)) {
        return prev;
      }
      return {
        ...prev,
        labelIds: [...prev.labelIds, labelId],
      };
    });
  };

  const onLabelRemoval = (labelId: string) => {
    setTransaction((prev) => ({
      ...prev,
      labelIds: prev.labelIds.filter((id) => id !== labelId),
    }));
    removeFromExcludedList(labelId);
  };

  return (
    <ModalWithButton heading="New transaction">
    <Box maxW="md" mx="auto" mt={4} p={4} borderWidth={1} borderRadius="md">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="type" isRequired>
            <FormLabel>Type</FormLabel>
            <Select
              name="transactionType"
              value={transaction.transactionType}
              onChange={handleChange}
            >
              <option value={TransactionType.EXPENSE}>Expense</option>
              <option value={TransactionType.INCOME}>Income</option>
            </Select>
          </FormControl>

          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              type="text"
              value={transaction.name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="amount" isRequired>
            <FormLabel>Amount</FormLabel>
            <Input
              name="amount"
              type="number"
              value={transaction.amount}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="date" isRequired>
            <FormLabel>Date</FormLabel>
            <Input
              name="date"
              type="date"
              value={transaction.date.split("T")[0]}
              onChange={(e) =>
                setTransaction((prev) => ({
                  ...prev,
                  date: new Date(e.target.value).toISOString(),
                }))
              }
            />
          </FormControl>

          <LabelSelector
            onLabelSelection={onLabelSelection}
            onLabelRemoval={onLabelRemoval}
            selectedLabelIds={transaction.labelIds}
          />

          <Button colorScheme="teal" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
    </ModalWithButton>
  );
};

export default NewTransactionForm;
