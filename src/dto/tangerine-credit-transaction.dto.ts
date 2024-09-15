import { IsEnum, IsNotEmpty, IsString, IsNumberString } from "class-validator";

export enum TangerineTransactionType {
  DEBIT = "DEBIT",
}

export interface TangerineCreditTransaction {
  "Transaction date": string;
  Transaction: TangerineTransactionType;
  Name: string;
  Memo: string;
  Amount: string;
}

export class TangerineCreditTransactionDTO
  implements TangerineCreditTransaction
{
  @IsNotEmpty({ message: "Transaction type is required." })
  @IsString({ message: "Memo must be a string." })
  "Transaction date": string;

  @IsNotEmpty({ message: "Transaction type is required." })
  @IsEnum(TangerineTransactionType, {
    message: "Transaction must be CREDIT or add another to enum",
  })
  Transaction: TangerineTransactionType;

  @IsNotEmpty({ message: "Name is required." })
  @IsString({ message: "Name must be a string." })
  Name: string;

  @IsNotEmpty({ message: "Memo is required." })
  @IsString({ message: "Memo must be a string." })
  Memo: string;

  @IsNotEmpty({ message: "Amount is required." })
  @IsNumberString({}, { message: "Amount must be a numeric string." })
  Amount: string;
}
