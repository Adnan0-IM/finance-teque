import { createContext, useContext, useState, type ReactNode } from "react";
import { api, getApiErrorMessage } from "@/lib/api";
import type { FormValues } from "../schema";

export type StatusResponse = {
  success: boolean;
  data: {
    status: "approved" | "pending" | "rejected" | "";
    isVerified: boolean;
    rejectionReason?: string;
    reviewedAt?: string;
    submittedAt?: string;
  };
};
interface InvestorContextType {
  loading: boolean;
  submitVerification: (verificationData: FormValues) => Promise<void>;
  verificationStatus: () => Promise<StatusResponse>;
}

const InvestorContext = createContext<InvestorContextType | undefined>(
  undefined
);

export function InvestorProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);

  const submitVerification = async (verificationData: FormValues) => {
    const {
      identificationDocument,
      passportPhoto,
      utilityBill,
      ...textFields
    } = verificationData;

    const submitTextfields = async (fields: Record<string, unknown>) => {
      const response = await api.post(`/verification`, fields);
      return response.data;
    };

    const submitDocs = async (
      identificationDocument: File,
      passportPhoto: File,
      utilityBill: File
    ) => {
      const formData = new FormData();
      formData.append("identificationDocument", identificationDocument);
      formData.append("passportPhoto", passportPhoto);
      formData.append("utilityBill", utilityBill);

      const response = await api.post(`/verification/documents`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    };

    try {
      setLoading(true);
      await submitTextfields(textFields);
      await submitDocs(
        identificationDocument as File,
        passportPhoto as File,
        utilityBill as File
      );
    } catch (error) {
      const message = getApiErrorMessage(error);
      throw new Error(message || "Failed to submit verification data");
    } finally {
      setLoading(false);
    }
  };

  const verificationStatus = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/verification/status`);
      return response.data;
    } catch (error) {
      const message = getApiErrorMessage(error);
      throw new Error(message || "Failed to fetch verification status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <InvestorContext.Provider
      value={{ submitVerification, verificationStatus, loading }}
    >
      {children}
    </InvestorContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useInvestor = () => {
  const context = useContext(InvestorContext);
  if (context === undefined) {
    throw new Error("useInvestor must be used within an InvestorProvider");
  }
  return context;
};
