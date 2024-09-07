import EditableField from "@/components/EditableField/EditableField";
import LabelTag from "@/components/LabelTag/LabelTag";
import { useMutateTransaction } from "@/hooks/transactions";
import { Transaction } from "@/types";
import { DeleteIcon } from "@chakra-ui/icons";
import { Tbody, Tr, Td, HStack, IconButton, VStack } from "@chakra-ui/react";
import { format } from "date-fns";

interface TransactionTableProps {
  transactions: Transaction[];
}

export const TableBody: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  const { updateTransaction, removeTransaction, removeLabelFromTransaction } =
    useMutateTransaction();

  const onLabelClose = (transactionId: string, labelId: string) => {
    removeLabelFromTransaction.mutate({
      labelId,
      transactionId,
    });
  }

  return (
    <Tbody>
      {transactions.map((transaction) => (
        <Tr key={transaction.id}>
          <Td>{transaction.transactionType}</Td>
          <Td>
            <EditableField
              defaultValue={transaction.name}
              onSubmit={(value: string) =>
                updateTransaction.mutate({
                  id: transaction.id,
                  name: value,
                })
              }
            />
          </Td>
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
