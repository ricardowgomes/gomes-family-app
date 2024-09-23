import { SortBy, SortOrder } from "@/types";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { IconButton, Th, Thead, Tr, Flex, Text } from "@chakra-ui/react";

interface HeaderWithSortProps {
  onUpClick: () => void;
  onDownClick: () => void;
  label: string;
  sortOrder: SortOrder;
  isSelected: boolean;
}

const HeaderWithSort: React.FC<HeaderWithSortProps> = ({
  onUpClick,
  onDownClick,
  label,
  sortOrder,
  isSelected,
}) => (
  <Flex justifyContent="space-between" alignItems={"center"}>
    <Text>{label}</Text>
    <Flex direction="column">
      <IconButton
        size="xsm"
        variant="unstyled"
        aria-label={`ascending order sort by ${label}`}
        icon={
          <ChevronUpIcon
            color="teal"
            width={6}
            height={6}
            opacity={isSelected && sortOrder === SortOrder.ASC ? 1 : 0.5}
          />
        }
        onClick={onUpClick}
        marginBottom={-1}
        disabled={isSelected && sortOrder === SortOrder.ASC}
      />
      <IconButton
        size="xsm"
        variant="unstyled"
        aria-label={`descending order sort by ${label}`}
        icon={
          <ChevronDownIcon
            color="teal"
            width={6}
            height={6}
            opacity={isSelected && sortOrder === SortOrder.DESC ? 1 : 0.5}
          />
        }
        onClick={onDownClick}
        marginTop={-1}
        disabled={isSelected && sortOrder === SortOrder.DESC}
      />
    </Flex>
  </Flex>
);

interface TableHeadProps {
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  sortOrder: SortOrder;
  setSortOrder: (sortOrder: SortOrder) => void;
}

export const TableHead: React.FC<TableHeadProps> = ({
  sortBy,
  setSortBy,
  setSortOrder,
  sortOrder,
}) => {
  const handleSortOrderBy = (sortBy: SortBy, sortOrder: SortOrder) => {
    console.log(sortBy, sortOrder);
    setSortBy(sortBy);
    setSortOrder(sortOrder);
  };

  return (
    <Thead>
      <Tr>
        <Th>Type</Th>
        <Th>Name</Th>
        <Th>
          <HeaderWithSort
            label="Amount"
            onUpClick={() => handleSortOrderBy(SortBy.AMOUNT, SortOrder.ASC)}
            onDownClick={() => handleSortOrderBy(SortBy.AMOUNT, SortOrder.DESC)}
            sortOrder={sortOrder}
            isSelected={sortBy === SortBy.AMOUNT}
          />
        </Th>
        <Th>
          <HeaderWithSort
            label="Date"
            onUpClick={() => handleSortOrderBy(SortBy.DATE, SortOrder.ASC)}
            onDownClick={() => handleSortOrderBy(SortBy.DATE, SortOrder.DESC)}
            sortOrder={sortOrder}
            isSelected={sortBy === SortBy.DATE}
          />
        </Th>
        <Th>Labels</Th>
        <Th />
      </Tr>
    </Thead>
  );
};
