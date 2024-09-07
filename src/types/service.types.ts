export interface ServiceResponse<T> {
  data: T;
  status: number;
  headers?: Record<string, string>;
}

export interface ServiceError {
  message: string;
  status: number;
}

export interface ServiceClientInterface {
  /**
   * Base URL for API requests.
   */
  baseUrl: string;

  /**
   * Perform a GET request.
   * @param params - Query parameters to include in the request.
   * @returns A promise that resolves with the API response or rejects with an error.
   */
  get<T>(
    params?: Record<string, any>,
  ): Promise<ServiceResponse<T> | ServiceError>;

  /**
   * Perform a POST request.
   * @param body - The body of the request.
   * @returns A promise that resolves with the API response or rejects with an error.
   */
  post<T>(body?: any): Promise<ServiceResponse<T> | ServiceError>;

  /**
   * Perform a PUT request.
   * @param body - The body of the request.
   * @returns A promise that resolves with the API response or rejects with an error.
   */
  put<T>(body?: any): Promise<ServiceResponse<T> | ServiceError>;

  /**
   * Perform a DELETE request.
   * @param params - Query parameters to include in the request.
   * @returns A promise that resolves with the API response or rejects with an error.
   */
  delete<T>(
    params?: Record<string, any>,
  ): Promise<ServiceResponse<T> | ServiceError>;

  /**
   * Perform a PATCH request.
   * @param body - The body of the request.
   * @returns A promise that resolves with the API response or rejects with an error.
   */
  patch<T>(body?: any): Promise<ServiceResponse<T> | ServiceError>;
}
