import React from 'react';
import LabelsList from './LabelsList';
import { Heading } from '@chakra-ui/react';

export default async function Labels() {
  return (
    <div>
      <Heading>Labels</Heading>
      <LabelsList />
    </div>
  );
}
