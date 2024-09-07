import {
  NewTransaction,
  PartialTransaction,
  Transaction,
  TransactionFilters,
} from "@/types";
import axios from "axios";
import { BaseService } from "./base.service";
import { BASE_URL } from "@/constants";

export class TransactionService extends BaseService {
  private baseUrl: string;

  constructor() {
    super();

    this.baseUrl = `${BASE_URL}/api/transactions`;
  }

  getAll = async (args: TransactionFilters): Promise<Transaction[]> => {
    try {
      const params = this.toSearchParams(args);
      const response = await axios.get(this.baseUrl, { params });
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  create = async (newTransaction: NewTransaction) => {
    try {
      const response = await axios.post(this.baseUrl, newTransaction);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  delete = async (id: string) => {
    try {
      const response = await axios.delete(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getOne = async (id: string) => {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  update = async ({ id, ...params }: PartialTransaction) => {
    try {
      const response = await axios.put(`${this.baseUrl}/${id}`, params);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  removeLabel = async ({
    transactionId,
    labelId,
  }: {
    transactionId: string;
    labelId: string;
  }) => {
    const url = `${this.baseUrl}/${transactionId}/labels`;

    try {
      const response = await axios.patch(url, {
        params: { labelId },
      });
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
