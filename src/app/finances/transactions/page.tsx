import React from "react";
import TransactionTable from "@/components/TransactionTable/TransactionTable";
import { Metadata } from "next";
import PageContainer from "@/layouts/PageContainer";

export const metadata: Metadata = {
  title: "Gomes Family Last Transactions",
  description: "Finances for the Gomes family",
};

export default async function Transactions() {
  return (
    <PageContainer heading="Last transactions">
      <TransactionTable />
    </PageContainer>
  );
}
