import { TangerineCreditTransactionDTO } from "@/dto/tangerine-credit-transaction.dto";
import { validate } from "class-validator";

export async function validateTangerineTransaction(
  transaction: TangerineCreditTransactionDTO,
) {
  const transactionDto = Object.assign(
    new TangerineCreditTransactionDTO(),
    transaction,
  );
  const errors = await validate(transactionDto);

  if (errors.length > 0) {
    console.error(`\n
      [ERROR in validateTangerineTransaction] \n
      ${errors} \n
      ${JSON.stringify(transaction)} \n
    `);
    return null; // return null for invalid transaction
  }

  return transaction; // return the valid transaction
}

export async function validateTangerineTransactions(
  transactions: TangerineCreditTransactionDTO[],
) {
  const validatedTransactions = await Promise.all(
    transactions.map(validateTangerineTransaction),
  );

  // Filter out null values (invalid transactions)
  return validatedTransactions.filter((transaction) => transaction !== null);
}
