'use client'

import { TableContainer, Table, VStack } from "@chakra-ui/react";
import { TableBody } from "./TableBody";
import { TableHead } from "./TableHead";
import { useQueryTransactions } from "@/hooks/transactions";
import SearchBar from "../SearchBar/SearchBar";
import TransactionsFilter from "./TransactionsFilter";

const TransactionTable = () => {
  const {
    data: transactions,
    setSearchTerm,
    setStartDate,
    setEndDate,
    setMinAmount,
    setMaxAmount,
    setSortBy,
    setSortOrder,
   } = useQueryTransactions();

  return (
    <VStack>
      <SearchBar placeholder="Search for transactions" setSearchTerm={setSearchTerm} />
      <TransactionsFilter
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setMinAmount={setMinAmount}
        setMaxAmount={setMaxAmount}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
      />
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
