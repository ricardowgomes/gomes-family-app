import { Divider, Heading, VStack } from "@chakra-ui/react";
import React from "react";

interface PageContainerProps {
  heading: string;
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, heading }) => {
  return (
    <VStack width="100%">
      <Heading>{heading}</Heading>
      <Divider orientation="horizontal" marginY={4} />
      {children}
    </VStack>
  );
};

export default PageContainer;
