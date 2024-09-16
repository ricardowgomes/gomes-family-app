"use client";

import {
  TableContainer,
  Table,
  VStack,
  Text,
  TableCaption,
} from "@chakra-ui/react";
import { TableBody } from "./TableBody";
import { TableHead } from "./TableHead";
import { useQueryTransactions } from "@/hooks/transactions";
import SearchBar from "../SearchBar/SearchBar";
import TransactionsFilter from "./TransactionsFilter";
import { useState } from "react";
import UpdateTransactionForm from "../TransactionForm/UpdateTransactionForm";
import NewTransactionForm from "../TransactionForm/NewTransactionForm";
import PaginationComponent from "../Pagination/Pagination";

const TransactionTable = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [activeTransactionId, setActiveTransactionId] = useState<string | null>(
    null,
  );
  const {
    data,
    setSearchTerm,
    setStartDate,
    setEndDate,
    setMinAmount,
    setMaxAmount,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    page,
    labelIds,
    setLabelIds,
    setPageLimit,
  } = useQueryTransactions();

  const { transactions, count, totalAmount, totalPages } = data;

  const editTransaction = (transactionId: string) => {
    setActiveTransactionId(transactionId);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setActiveTransactionId(null);
  };

  return (
    <VStack width="100%">
      <SearchBar
        placeholder="Search for transactions"
        setSearchTerm={setSearchTerm}
      />
      <TransactionsFilter
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setMinAmount={setMinAmount}
        setMaxAmount={setMaxAmount}
        labelIds={labelIds}
        setLabelIds={setLabelIds}
        setPageLimit={setPageLimit}
      />
      {transactions.length > 0 ? (
        <TableContainer width="100%">
          <Table variant="simple">
            <TableCaption>
              {`Showing ${transactions.length} of ${count} transactions. Total amount: ${totalAmount}. Page ${page} of ${totalPages}`}
            </TableCaption>
            <TableHead sortBy={sortBy} setSortBy={setSortBy} setSortOrder={setSortOrder} sortOrder={sortOrder} />
            <TableBody
              transactions={transactions}
              editTransaction={editTransaction}
            />
          </Table>
        </TableContainer>
      ) : (
        <Text>
          No transactions found, adjust the filters or create a new transaction.
        </Text>
      )}
      <PaginationComponent lastPage={totalPages} />
      {activeTransactionId && (
        <UpdateTransactionForm
          isOpen={isUpdateModalOpen}
          handleClose={handleCloseUpdateModal}
          transactionId={activeTransactionId}
        />
      )}
      <NewTransactionForm />
    </VStack>
  );
};

export default TransactionTable;
