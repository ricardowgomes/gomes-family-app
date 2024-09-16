import Providers from "@/components/Providers";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Gomes Family App",
  description: "An app for the Gomes family",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          <Flex minHeight="100vh">
            <Box width={250}>
              <Sidebar />
            </Box>
            <Box width="100%" bg="gray.100" p="2rem">
              {children}
            </Box>
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
