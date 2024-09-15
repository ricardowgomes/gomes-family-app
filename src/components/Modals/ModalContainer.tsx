"use client";

import { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";

import NewLabelForm from "../NewLabelForm/NewLabelForm";
import Modal from "./Modal";
import { Box, IconButton } from "@chakra-ui/react";

export enum ModalTypes {
  ADD_LABEL = "ADD_LABEL",
}

const MODAL_COMPONENTS = {
  [ModalTypes.ADD_LABEL]: NewLabelForm,
};

const MODAL_TITLES = {
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
        icon={<AddIcon color="white" />}
        onClick={() => setIsOpen(true)}
        size="lg"
      />
      <Modal
        isOpen={isOpen}
        onClose={onCloseHandler}
        heading={MODAL_TITLES[name]}
      >
        <Component onSuccess={onCloseHandler} {...modalProps} />
      </Modal>
    </Box>
  );
};

export default ModalContainer;
