
export interface User {
  verification?: {
    personal?: {
      firstName?: string;
      surname?: string;
      dateOfBirth?: string;
      localGovernment?: string;
      stateOfResidence?: string;
      residentialAddress?: string;
      ninNumber?: string;
    };
    nextOfKin?: {
      fullName?: string;
      phoneNumber?: string;
      email?: string;
      residentialAddress?: string;
      relationship?: string;
    };
    bankDetails?: {
      accountName?: string;
      accountNumber?: string;
      bankName?: string;
      bvnNumber?: string;
      accountType?: string;
    };
    documents?: {
      idDocument?: string;
      passportPhoto?: string;
      utilityBill?: string;
    };
    status?: "pending" | "approved" | "rejected";
    reviewedAt?: string;
    submittedAt?: string;
  };
  _id: string;
  name: string;
  email: string;
  phone?: string;
  isVerified: boolean;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  role?: "investor" | "startup" | "admin" | "none";

}
