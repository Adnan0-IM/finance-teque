import axios from "axios"
// Extract a useful error message from Axios/server responses
export const getApiErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as
      | {
          message?: string;
          error?: string;
          success?: boolean;
          errors?: string[];
        }
      | undefined;
    if (data?.message) return data.message;
    if (data?.error) return data.error;
    if (Array.isArray(data?.errors) && data.errors.length)
      return data.errors[0];
    if (err.message) return err.message;
  }
  if (err instanceof Error) return err.message;
  return "An unexpected error occurred";
};