"use client";

import { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";

import Modal from "./Modal";
import { Box, IconButton } from "@chakra-ui/react";

interface ModalWithButtonProps {
  heading: string;
  onClose?: () => void;
  children: React.ReactNode;
}

const ModalWithButton: React.FC<ModalWithButtonProps> = ({
  heading,
  onClose,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onCloseHandler = () => {
    if (onClose) onClose();

    setIsOpen(false);
  };

  return (
    <Box>
      <IconButton
        position="fixed"
        bottom="4"
        right="4"
        aria-label="open modal"
        colorScheme="teal"
        icon={<AddIcon color="white" />}
        onClick={() => setIsOpen(true)}
        size="lg"
        borderRadius="full"
      />
      <Modal isOpen={isOpen} onClose={onCloseHandler} heading={heading}>
        {children}
      </Modal>
    </Box>
  );
};

export default ModalWithButton;
