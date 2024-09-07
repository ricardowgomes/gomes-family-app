import { useState } from "react";
import { Label, type NewTransaction, TransactionType } from "@/types";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { useMutateTransaction } from "@/hooks/transactions";
import { LabelSelector } from "./LabelSelector";
import LabelTag from "@/components/Labels/LabelTag/LabelTag";

const TransactionForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { addTransaction } = useMutateTransaction();
  const [transaction, setTransaction] = useState<NewTransaction>({
    transactionType: TransactionType.EXPENSE,
    name: "",
    amount: 0,
    date: new Date().toISOString(),
    labelIds: [],
  });

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
    onSuccess();
  };

  const handleSelectLabel = (labelId: string) => {
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

  const handleRemoveLabel = (labelId: string) => {
    setTransaction((prev) => ({
      ...prev,
      labels: prev.labelIds?.filter((id) => id !== labelId),
    }));
  };

  return (
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

          <LabelSelector selectLabel={handleSelectLabel} />

          <HStack>
            {transaction.labelIds?.map((id) => (
              <LabelTag
                key={id}
                labelId={id}
                onCloseClick={() => handleRemoveLabel(id)}
              />
            ))}
          </HStack>

          <Button colorScheme="teal" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default TransactionForm;
