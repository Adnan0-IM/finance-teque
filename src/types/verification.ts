export type verificationStatusResponse = {
  success: boolean;
  data: {
    status: "approved" | "pending" | "rejected" | "";
    isVerified: boolean;
    rejectionReason?: string;
    reviewedAt?: string;
    submittedAt?: string;
  };
};