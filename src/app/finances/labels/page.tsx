import React from 'react';
import LabelsList from './LabelsList';
import PageContainer from '@/layouts/PageContainer';

export default async function Labels() {
  return (
    <PageContainer heading="Labels">
      <LabelsList />
    </PageContainer>
  );
}
