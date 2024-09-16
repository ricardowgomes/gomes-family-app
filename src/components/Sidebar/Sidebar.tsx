"use client";

import {
  Box,
  Collapse,
  Link,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

interface SidebarItemProps {
  href: string;
  isExpanded: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  children,
  href,
  isExpanded,
  onToggle,
}) => (
  <ListItem>
    <Link
      as={NextLink}
      href={href}
      p={2}
      display="flex"
      alignItems="center"
      onClick={onToggle}
      color={"white"}
    >
      {children}
      {onToggle &&
        (isExpanded ? (
          <ChevronUpIcon ml="auto" />
        ) : (
          <ChevronDownIcon ml="auto" />
        ))}
    </Link>
  </ListItem>
);

const Sidebar = () => {
  const { isOpen: isOpenFinances, onToggle: onToggleFinances } =
    useDisclosure();

  return (
    <Box
      as="nav"
      p={4}
      width="100%"
      height="100%"
      borderRight="1px"
      borderColor="gray.200"
      bg="teal"
    >
      <List spacing={3}>
        <SidebarItem href="/" isExpanded={false}>
          <Text>Home</Text>
        </SidebarItem>
        <SidebarItem
          href="#"
          isExpanded={isOpenFinances}
          onToggle={onToggleFinances}
        >
          <Text>Finances</Text>
        </SidebarItem>
        <Collapse in={isOpenFinances}>
          <List pl={4}>
            <SidebarItem href="/finances/transactions" isExpanded={false}>
              <Text>Transactions</Text>
            </SidebarItem>
            <SidebarItem href="/finances/labels" isExpanded={false}>
              <Text>Labels</Text>
            </SidebarItem>
            <SidebarItem href="/finances/upload" isExpanded={false}>
              <Text>Upload transactions</Text>
            </SidebarItem>
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default Sidebar;
