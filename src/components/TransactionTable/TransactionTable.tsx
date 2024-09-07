'use client'

import { TableContainer, Table, VStack } from "@chakra-ui/react";
import { TableBody } from "./TableBody";
import { TableHead } from "./TableHead";
import { useQueryTransactions } from "@/hooks/transactions";
import SearchBar from "../SearchBar/SearchBar";

const TransactionTable = () => {
  const { data: transactions, setSearchTerm } = useQueryTransactions();

  return (
    <VStack>
    <SearchBar placeholder="Search for transactions" setSearchTerm={setSearchTerm} />
    <TableContainer>
      <Table variant="simple">
        <TableHead />
        <TableBody transactions={transactions} />
      </Table>
    </TableContainer>
    </VStack>
  );
};

export default TransactionTable;
