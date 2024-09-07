import React from 'react';
import { Box, Input, Select, VStack, HStack, FormControl, FormLabel } from '@chakra-ui/react';
import { SortBy, SortOrder } from '@/types';

interface FilterBarProps {
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  setMinAmount: (minAmount: number | null) => void;
  setMaxAmount: (maxAmount: number | null) => void;
  setSortBy: (sortBy: SortBy) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
}

const TransactionsFilter: React.FC<FilterBarProps> = ({ setStartDate, setEndDate, setMinAmount, setMaxAmount, setSortBy, setSortOrder }) => {
  return (
    <Box p={4} borderWidth={1} borderRadius="md" shadow="md">
      <HStack w="full">
          <FormControl>
            <FormLabel htmlFor="startDate">Start Date</FormLabel>
            <Input
              id="startDate"
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="endDate">End Date</FormLabel>
            <Input
              id="endDate"
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="minAmount">Min Amount</FormLabel>
            <Input
              id="minAmount"
              type="number"
              onChange={(e) => setMinAmount(parseFloat(e.target.value) || null)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="maxAmount">Max Amount</FormLabel>
            <Input
              id="maxAmount"
              type="number"
              onChange={(e) => setMaxAmount(parseFloat(e.target.value) || null)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="sortBy">Sort By</FormLabel>
            <Select
              id="sortBy"
              onChange={(e) => setSortBy(e.target.value as SortBy)}
            >
              <option value={SortBy.DATE}>Date</option>
              <option value={SortBy.AMOUNT}>Amount</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="sortOrder">Sort Order</FormLabel>
            <Select
              id="sortOrder"
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            >
              <option value={SortOrder.DESC}>Descending</option>
              <option value={SortOrder.ASC}>Ascending</option>
            </Select>
          </FormControl>
      </HStack>
    </Box>
  );
};

export default TransactionsFilter;
