"use client";

import EditableField from "@/components/EditableField/EditableField";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useMutateLabel, useQueryLabels } from "@/hooks/labels";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";

const LabelsList = () => {
  const { data: labels, setSearchTerm } = useQueryLabels();
  const { removeLabel, updateLabel } = useMutateLabel();

  return (
    <VStack width="100%">
      <SearchBar
        placeholder="search for labels"
        setSearchTerm={setSearchTerm}
      />
      {labels.length === 0 ? (
        <Text>No labels found</Text>
      ) : (
        <TableContainer width="100%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>name</Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              {labels.map((label) => (
                <Tr key={label.id}>
                  <Td>
                    <EditableField
                      defaultValue={label.name}
                      onSubmit={(value) =>
                        updateLabel.mutate({
                          id: label.id,
                          name: value,
                        })
                      }
                    />
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="delete label"
                      variant="outline"
                      onClick={() => removeLabel.mutate(label.id)}
                      icon={<DeleteIcon color="red" />}
                      size="sm"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </VStack>
  );
};

export default LabelsList;
