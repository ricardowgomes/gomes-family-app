'use client';

import { useState } from "react";
import { IconButton, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Modal, Box } from '@chakra-ui/react';
import { AddIcon } from "@chakra-ui/icons";

import TransactionForm from "../TransactionForm";
import { ModalTypes } from "@/constants";

const MODAL_COMPONENTS = {
  [ModalTypes.ADD_TRANSACTION]: TransactionForm,
  [ModalTypes.ADD_LABEL]: TransactionForm,
};

const MODAL_TITLES = {
  [ModalTypes.ADD_TRANSACTION]: "New transaction",
  [ModalTypes.ADD_LABEL]: "New label",
};

interface ModalContainerProps {
  name: ModalTypes;
  onClose?: () => void;
  modalProps?: Record<string, unknown>;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  name,
  onClose,
  modalProps,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onCloseHandler = () => {
    if (onClose) onClose();

    setIsOpen(false);
  };

  const Component = MODAL_COMPONENTS[name];

  return (
    <Box>
      <IconButton
        position="fixed"
        bottom="4"
        right="4"
        aria-label="open modal"
        colorScheme="teal"
        icon={<AddIcon color='white' />}
        onClick={() => setIsOpen(true)}
        size='lg'
      />
      <Modal isOpen={isOpen} onClose={onCloseHandler}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {MODAL_TITLES[name]}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Component onSuccess={onCloseHandler} {...modalProps} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ModalContainer;
