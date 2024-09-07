'use client'

import SearchBar from "@/components/SearchBar/SearchBar";
import { useMutateLabel, useQueryLabels } from "@/hooks/labels";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
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
} from '@chakra-ui/react'

const LabelsList = () => {
  const { data: labels, setSearchTerm } = useQueryLabels();
  const { removeLabel, updateLabel } = useMutateLabel();

  console.log('LabelsList labels', labels);

  return (
    <div>
     <SearchBar placeholder="search for labels" setSearchTerm={setSearchTerm} />
      {
        labels.length === 0 ? (
          <Text>No labels found</Text>
        ) : (
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>name</Th>
                  <Th/>
                  <Th/>
                </Tr>
              </Thead>
              <Tbody>
              {labels?.map((label) => (
                  <Tr key={label.id}>
                    <Td>{label.name}</Td>
                    <Td>
                      <IconButton
                        aria-label="edit label"
                        variant="outline"
                        onClick={() => updateLabel.mutate(label)}
                        icon={<EditIcon color="teal" />}
                        size="sm"
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
        )
      }
    </div>
  );
};

export default LabelsList;
