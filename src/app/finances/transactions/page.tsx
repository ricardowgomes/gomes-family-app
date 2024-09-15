import React from "react";
import TransactionTable from "@/components/TransactionTable/TransactionTable";
import { Metadata } from "next";
import ModalContainer, { ModalTypes } from "@/components/Modals/ModalContainer";
import PageContainer from "@/layouts/PageContainer";
import NewTransactionForm from "@/components/Modals/NewTransactionModal";

export const metadata: Metadata = {
  title: "Gomes Family Last Transactions",
  description: "Finances for the Gomes family",
};

export default async function Transactions() {
  return (
    <>
      <PageContainer heading="Last transactions">
        <TransactionTable />
      </PageContainer>
      <NewTransactionForm />
    </>
  );
}
