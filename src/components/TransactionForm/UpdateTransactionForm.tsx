'use client';

import { useState } from "react";
import { type Transaction, TransactionType } from "@/types";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
  Stack,
} from "@chakra-ui/react";
import { useMutateTransaction, useQueryTransaction } from "@/hooks/transactions";
import Modal from "../Modals/Modal";
import { gefDiffTransaction } from "@/helpers/diff";

type UpdateTransactionFormProps = {
  transactionId: string;
  isOpen: boolean;
  handleClose: () => void;
};

const UpdateTransactionForm = ({
  transactionId,
  isOpen,
  handleClose,
}: UpdateTransactionFormProps) => {
  const { data: initialTransaction } = useQueryTransaction(transactionId);
  const { updateTransaction } = useMutateTransaction();
  const [transaction, setTransaction] = useState<Transaction>(initialTransaction);

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
    const partialTransaction = gefDiffTransaction(initialTransaction, transaction);

    updateTransaction.mutate({
      id: initialTransaction.id,
      ...partialTransaction,
    });
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      heading="Update transaction"
    >
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

          <Button colorScheme="teal" type="submit">
            Update
          </Button>
        </Stack>
      </form>
    </Box>
  </Modal>
  );
};

export default UpdateTransactionForm;
