export interface ApiResponse<T> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  error?: any;
}

export function createApiResponse<T>(options: ApiResponse<T>): ApiResponse<T> {
  return {
    status: options.status,
    message: options.message,
    data: options.data,
    error: options.error,
  };
}
