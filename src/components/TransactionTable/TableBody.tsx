"use client";

import LabelTag from "@/components/LabelTag/LabelTag";
import { formatCurrency } from "@/helpers/formatters";
import { useMutateTransaction } from "@/hooks/transactions";
import { Transaction, TransactionType } from "@/types";
import { AddIcon, DeleteIcon, EditIcon, MinusIcon } from "@chakra-ui/icons";
import { Tbody, Tr, Td, IconButton, VStack, Flex } from "@chakra-ui/react";
import { format } from "date-fns";

interface TransactionTableProps {
  transactions: Transaction[];
  editTransaction: (transactionId: string) => void;
}

const TypeOfTransaction = ({ transactionType }: { transactionType: TransactionType }) => (
  <Flex borderWidth={1} borderColor={'red'} alignItems={'center'} justifyContent={'center'} w={8} h={8} borderRadius={'full'}>
    {transactionType === TransactionType.EXPENSE ? <MinusIcon color="red" /> : <AddIcon color="green" />}
  </Flex>
);

export const TableBody: React.FC<TransactionTableProps> = ({
  transactions,
  editTransaction,
}) => {
  const { removeTransaction, removeLabelFromTransaction } =
    useMutateTransaction();

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
          <Td>
            <TypeOfTransaction transactionType={transaction.transactionType} />
          </Td>
          <Td>{transaction.name}</Td>
          <Td>${formatCurrency(transaction.amount)}</Td>
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
