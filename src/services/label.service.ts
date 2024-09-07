import { Label, LabelQueryParams, NewLabel } from "@/types";
import axios from "axios";
import { BaseService } from "./base.service";

export class LabelService extends BaseService {
  private baseUrl: string;

  constructor() {
    super();

    this.baseUrl = `/api/labels`;
  }

  getAll = async (args: LabelQueryParams): Promise<Label[]> => {
    try {
      const params = this.toSearchParams(args);
      const response = await axios.get(this.baseUrl, {
        params,
      });
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  create = async (newLabel: NewLabel) => {
    try {
      const response = await axios.post(this.baseUrl, newLabel);
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

  getOne = async (id: number) => {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  update = async ({ id, ...params }: Label) => {
    try {
      const response = await axios.put(`${this.baseUrl}/${id}`, params);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
