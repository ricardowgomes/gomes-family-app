import EditableField from "@/components/EditableField/EditableField";
import LabelTag from "@/components/Labels/LabelTag/LabelTag";
import { useMutateTransaction } from "@/hooks/transactions";
import { Transaction } from "@/types";
import { DeleteIcon } from "@chakra-ui/icons";
import { Tbody, Tr, Td, HStack, IconButton } from "@chakra-ui/react";

interface TransactionTableProps {
  transactions: Transaction[];
}

export const TableBody: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  const { updateTransaction, removeTransaction, removeLabelFromTransaction } =
    useMutateTransaction();

  const onLabelClose = (transactionId: string, labelId: string) =>
    removeLabelFromTransaction.mutate({
      labelId,
      transactionId,
    });

  return (
    <Tbody>
      {transactions.map((transaction, index) => (
        <Tr key={index}>
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
          <Td>{transaction.date.toString()}</Td>
          <Td>
            <HStack>
              {transaction.labelIds &&
                transaction.labelIds.map((label) => (
                  <LabelTag
                    key={label.id}
                    label={label}
                    onCloseClick={() => onLabelClose(transaction.id, label.id)}
                  />
                ))}
            </HStack>
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
