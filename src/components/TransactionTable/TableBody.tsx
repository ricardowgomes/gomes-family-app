'use client';

import LabelTag from "@/components/LabelTag/LabelTag";
import { useMutateTransaction } from "@/hooks/transactions";
import { Transaction } from "@/types";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Tbody, Tr, Td, IconButton, VStack } from "@chakra-ui/react";
import { format } from "date-fns";

interface TransactionTableProps {
  transactions: Transaction[];
  editTransaction: (transactionId: string) => void;
}

export const TableBody: React.FC<TransactionTableProps> = ({
  transactions,
  editTransaction,
}) => {
  const { removeTransaction, removeLabelFromTransaction } = useMutateTransaction();

  const onLabelClose = (transactionId: string, labelId: string) => {
    removeLabelFromTransaction.mutate({
      labelId,
      transactionId,
    });
  };

  return (
    <Tbody>
      {transactions.map((transaction) => (
        <Tr key={transaction.id}>
          <Td>{transaction.transactionType}</Td>
          <Td>{transaction.name}</Td>
          <Td>${transaction.amount}</Td>
          <Td>{format(new Date(transaction.date), "dd/MM/yyyy")}</Td>
          <Td>
            <VStack>
              {transaction.labels &&
                transaction.labels.map((label) => (
                  <LabelTag
                    key={label.id}
                    labelId={label.id}
                    onCloseClick={() => onLabelClose(transaction.id, label.id)}
                  />
                ))}
            </VStack>
          </Td>
          <Td>
            <IconButton
              aria-label="update transaction"
              variant="outline"
              onClick={() => editTransaction(transaction.id)}
              colorScheme="teal"
              icon={<EditIcon />}
              size="sm"
            />
          </Td>
          <Td>
            <IconButton
              aria-label="delete transaction"
              variant="outline"
              onClick={() => removeTransaction.mutate(transaction.id)}
              colorScheme="red"
              icon={<DeleteIcon color="red" />}
              size="sm"
            />
          </Td>
        </Tr>
      ))}
    </Tbody>
  );
};
