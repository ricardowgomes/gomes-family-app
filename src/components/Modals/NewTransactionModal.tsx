import TransactionForm from "../TransactionForm/TransactionForm";
import ModalWithButton from "./ModalWithButton";

const NewTransactionForm = () => {
  return (
    <ModalWithButton heading="New transaction">
      <TransactionForm onSuccess={() => console.log("add a handler?")} />
    </ModalWithButton>
  );
};

export default NewTransactionForm;
