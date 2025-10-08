import { createContext, useContext, useState, type ReactNode } from "react";
import { api, getApiErrorMessage } from "@/lib/api";
import type { FormValues } from "../schema";
import type { verificationStatusResponse } from "@/types/verification";
import type { CorporateVerificationForm } from "@/features/investors/corporate/schema";

interface InvestorContextType {
  loading: boolean;
  submitVerification: (verificationData: FormValues) => Promise<void>;
  verificationStatus: () => Promise<verificationStatusResponse>;
  verificationSubmitted: boolean;
  verStatus: verStatus | null;
  submitCorporateVerification: (
    data: CorporateVerificationForm
  ) => Promise<void>;
}

const InvestorContext = createContext<InvestorContextType | undefined>(
  undefined
);
type verStatus = {
  status: "approved" | "pending" | "rejected" | "";
  isVerified: boolean;
  rejectionReason?: string;
  reviewedAt?: string;
  submittedAt?: string;
};

export function InvestorProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [verStatus, setVerStatus] = useState<verStatus | null>(null);
  const [verificationSubmitted, setVerificationSubmitted] = useState(false);

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
      setVerificationSubmitted(true);
    } catch (error) {
      const message = getApiErrorMessage(error);
      console.log(error);
      throw new Error(message || "Failed to submit verification data");
    } finally {
      setLoading(false);
    }
  };

  const verificationStatus = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/verification/status`);
      setVerStatus(response.data.status);
      return response.data;
    } catch (error) {
      const message = getApiErrorMessage(error);
      throw new Error(message || "Failed to fetch verification status");
    } finally {
      setLoading(false);
    }
  };

  const submitCorporateVerification = async (
    data: CorporateVerificationForm
  ) => {
    const { company, bankDetails, documents, signatories, referral } = data;
    console.log(data);
    const textPayload = {
      company: { ...company, logo: undefined },
      bankDetails,
      signatories: signatories.map(
        ({ fullName, position, phoneNumber, bvnNumber, email }) => ({
          fullName,
          position,
          phoneNumber,
          bvnNumber,
          email,
        })
      ),
      referral,
    };
    console.log(`Text Payload: ${textPayload}`);
    const submitText = async () => {
      const res = await api.post(`/verification/corporate`, textPayload);
      return res.data;
    };

    const submitDocs = async () => {
      const fd = new FormData();
      if (company.logo instanceof File) fd.append("companyLogo", company.logo);

      fd.append(
        "certificateOfIncorporation",
        documents.certificateOfIncorporation
      );
      if (documents.memorandumAndArticles)
        fd.append("memorandumAndArticles", documents.memorandumAndArticles);
      fd.append("utilityBill", documents.utilityBill);
      if (documents.tinCertificate)
        fd.append("tinCertificate", documents.tinCertificate);

      signatories.forEach((s, i) => {
        if (s.idDocument instanceof File)
          fd.append(`signatories[${i}][idDocument]`, s.idDocument);
       
      });
      console.log(`Form Data: ${fd}`);
      const res = await api.post(`/verification/corporate/documents`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    };

    try {
      setLoading(true);
      await submitText();
      await submitDocs();
      setVerificationSubmitted(true);
    } catch (error) {
      const message = getApiErrorMessage(error);
      throw new Error(message || "Failed to submit corporate verification");
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
        verificationSubmitted,
        verStatus,
        submitCorporateVerification,
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
