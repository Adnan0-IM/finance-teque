import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import { API_URL } from "@/utils/constants";
import { getApiErrorMessage } from "@/utils/api";



interface InvestorContextType {
  loading: boolean;
  submitVerification: (verificationData: any) => Promise<void>;
  verificationStatus: () => Promise<any>;
}

const InvestorContext = createContext<InvestorContextType | undefined>(undefined);

export function InvestorProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  const submitVerification = async (verificationData: any) => {
    const {
      identificationDocument,
      passportPhoto,
      utilityBill,
      ...textFields
    } = verificationData;

    const submitTextfields = async (textFields: Record<string, unknown>) => {
      // Send only text fields here (JSON)
      const response = await axios.post(`${API_URL}/verification`, textFields);
      return response.data;
    };
    const submitDocs = async (
      identificationDocument: File,
      passportPhoto: File,
      utilityBill: File
    ) => {
      // 2. Submit files
      const formData = new FormData();
      formData.append("identificationDocument", identificationDocument);
      formData.append("passportPhoto", passportPhoto);
      formData.append("utilityBill", utilityBill);

      // Use axios directly for file upload
      const response = await axios.post(
        `${API_URL}/verification/documents`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

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
      const response = await axios.get(`${API_URL}/verification/status`);
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
      value={{
        submitVerification,
        verificationStatus,
        loading,
      }}
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
