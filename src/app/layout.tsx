import Providers from "@/components/Providers";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Flex } from "@chakra-ui/react";
import type { Metadata } from "next";

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
          <Flex>
            <Sidebar />
            <main>
              {children}
            </main>
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
