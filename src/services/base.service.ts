export class BaseService {
  // Converts filters to URLSearchParams
  public toSearchParams(filters: Record<string, any>): URLSearchParams {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (this.isValid(value)) {
        this.appendParam(params, key, value);
      }
    });

    return params;
  }

  // Converts filters to a query string
  public toQueryString(filters: Record<string, any>): string {
    return this.toSearchParams(filters).toString();
  }

  // Helper method to append parameters based on value type
  private appendParam(params: URLSearchParams, key: string, value: any): void {
    if (Array.isArray(value)) {
      params.append(key, value.join(","));
    } else if (typeof value === "string" || typeof value === "number") {
      params.append(key, value.toString());
    } else if (value instanceof Date) {
      params.append(key, value.toISOString());
    } else {
      console.warn(`Unsupported type for key: ${key}`);
    }
  }

  private isValid(value: any): boolean {
    if (typeof value === "string") {
      return value.length > 0;
    }
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== undefined && value !== null;
  }
}
