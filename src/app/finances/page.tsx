import React from 'react'
import TransactionTable from '@/components/TransactionTable/TransactionTable';
import { transactionsKeys } from '@/hooks/transactions';
import { useServices } from '@/hooks/useServices';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Heading, VStack } from '@chakra-ui/react';
import { Metadata } from 'next';
import ModalContainer from '@/components/Modals/ModalContainer';
import { ModalTypes } from '@/constants';
import PageContainer from '@/layouts/PageContainer';

export const metadata: Metadata = {
  title: "Gomes Family Finances",
  description: "Finances for the Gomes family",
};

export default async function Finances() {
  // const { transactionService } = useServices();
  const queryClient = new QueryClient()

  // await queryClient.prefetchQuery({
  //   queryKey: transactionsKeys.all(),
  //   queryFn: async () => transactionService.getAll(),
  // })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageContainer heading="Last transactions">
        <TransactionTable />
      </PageContainer>
      <ModalContainer name={ModalTypes.ADD_TRANSACTION} />
    </HydrationBoundary>
  )
}
