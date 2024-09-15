"use client";

import { TableContainer, Table, VStack, Text, TableCaption } from "@chakra-ui/react";
import { TableBody } from "./TableBody";
import { TableHead } from "./TableHead";
import { useQueryTransactions } from "@/hooks/transactions";
import SearchBar from "../SearchBar/SearchBar";
import TransactionsFilter from "./TransactionsFilter";
import { useState } from "react";
import UpdateTransactionForm from "../TransactionForm/UpdateTransactionForm";
import NewTransactionForm from "../TransactionForm/NewTransactionForm";

const TransactionTable = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [activeTransactionId, setActiveTransactionId] = useState<string | null>(null);
  const {
    data,
    setSearchTerm,
    setStartDate,
    setEndDate,
    setMinAmount,
    setMaxAmount,
    setSortBy,
    setSortOrder,
  } = useQueryTransactions();

  const {
    transactions,
    count,
    totalAmount,
    totalPages,
  } = data;

  const editTransaction = (transactionId: string) => {
    setActiveTransactionId(transactionId);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setActiveTransactionId(null);
  };

  return (
    <VStack width='100%'>
      <SearchBar
        placeholder="Search for transactions"
        setSearchTerm={setSearchTerm}
      />
      <TransactionsFilter
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setMinAmount={setMinAmount}
        setMaxAmount={setMaxAmount}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
      />
      {
        transactions.length > 0 ? (
          <TableContainer width='100%'>
            <Table variant="simple">
              <TableCaption>
                {`Showing ${transactions.length} of ${count} transactions. Total amount: ${totalAmount}. Page 1 of ${totalPages}`}
              </TableCaption>
              <TableHead />
              <TableBody transactions={transactions} editTransaction={editTransaction} />
            </Table>
          </TableContainer>
        ) : (
          <Text>
            No transactions found, adjust the filters or create a new transaction.
          </Text>
        )
      }
      {
        activeTransactionId && (
          <UpdateTransactionForm
            isOpen={isUpdateModalOpen}
            handleClose={handleCloseUpdateModal}
            transactionId={activeTransactionId}
          />
        )
      }
      <NewTransactionForm />
    </VStack>
  );
};

export default TransactionTable;
