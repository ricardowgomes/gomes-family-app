import React from "react";
import {
  Box,
  Input,
  HStack,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import LabelSelector from "../LabelSelector/LabelSelector";

interface FilterBarProps {
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  setMinAmount: (minAmount: number | null) => void;
  setMaxAmount: (maxAmount: number | null) => void;
  labelIds: string[];
  setLabelIds: (labelIds: string[]) => void;
  setPageLimit: (number: number) => void;
}

const PAGE_LIMIT_OPTIONS = [10, 25, 50, 100];

const TransactionsFilter: React.FC<FilterBarProps> = ({
  setStartDate,
  setEndDate,
  setMinAmount,
  setMaxAmount,
  labelIds,
  setLabelIds,
  setPageLimit,
}) => {
  const addLabel = (labelId: string) => {
    setLabelIds([...labelIds, labelId]);
  };

  const onLabelRemoval = (labelId: string) => {
    setLabelIds(labelIds.filter((id) => id !== labelId));
  };
  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="md"
      shadow="md"
      backgroundColor={"white"}
      w="100%"
    >
      <HStack w="full" marginBottom={2}>
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
          <FormLabel htmlFor="pageLimit">Page limit</FormLabel>
          <Select
            id="pageLimit"
            onChange={(e) => setPageLimit(parseInt(e.target.value, 10))}
          >
            {PAGE_LIMIT_OPTIONS.map((limit) => (
              <option key={limit} value={limit}>
                {limit}
              </option>
            ))}
          </Select>
        </FormControl>
      </HStack>
      <LabelSelector
        onLabelSelection={addLabel}
        onLabelRemoval={onLabelRemoval}
        selectedLabelIds={labelIds}
      />
    </Box>
  );
};

export default TransactionsFilter;
