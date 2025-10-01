export type VerificationPersonal = {
  firstName: string;
  surname: string;
  dateOfBirth: string;
  localGovernment: string;
  stateOfResidence: string;
  residentialAddress: string;
  ninNumber: string;
};

export type VerificationNextOfKin = {
  fullName: string;
  phoneNumber: string;
  email: string;
  residentialAddress: string;
  relationship: string;
};

export type VerificationBankDetails = {
  accountName: string;
  accountNumber: string;
  bankName: string;
  bvnNumber: string;
  accountType: string;
};

export type VerificationDocuments = {
  idDocument: string;
  idDocumentUrl: string;
  passportPhoto: string;
  passportPhotoUrl: string;
  utilityBill: string;
  utilityBillUrl: string;
};

export type VerificationData = {
  personal?: VerificationPersonal;
  nextOfKin?: VerificationNextOfKin;
  bankDetails?: VerificationBankDetails;
  documents?: VerificationDocuments;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  submittedAt?: string;
};

export type User = {
  _id: string;
  name?: string;
  email: string;
  phone?: string;
  role: "admin" | "investor" | "startup" | "none";
  isVerified: boolean;
  createdAt?: string;
  verification?: VerificationData;
};
