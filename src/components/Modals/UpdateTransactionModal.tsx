"use client";

import { useState } from "react";
import Modal from "./Modal";
import TransactionForm from "../TransactionForm/TransactionForm";
import { useQueryTransaction } from "@/hooks/transactions";

const UpdateTransactionForm = ({
  transactionId,
}: {
  transactionId: string;
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const initialTransaction = useQueryTransaction(transactionId);

  const handleClose = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <Modal
      isOpen={isUpdateModalOpen}
      onClose={handleClose}
      heading="Update transaction"
    >
      <TransactionForm
        initialTransaction={initialTransaction}
        onSuccess={handleClose}
      />
    </Modal>
  );
};

export default UpdateTransactionForm;
