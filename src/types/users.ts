export type VerificationPersonal = {
  firstName: string;
  surname: string;
  ageBracket: string;
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

export type CorporateCompany = {
  name: string;
  incorporationNumber: string;
  dateOfIncorporation: string;
  industry: string;
  address: string;
  state: string;
  localGovernment: string;
  phone: string;
  email: string;
  logo?: string;
};

export type CorporateBankDetails = {
  bankName: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  bvnNumber?: string;
};

export type CorporateDocuments = {
  certificateOfIncorporation: string;
  memorandumAndArticles?: string;
  utilityBill: string;
  tinCertificate?: string;
};

export type CorporateSignatory = {
  fullName: string;
  position: string;
  phoneNumber: string;
  bvnNumber?: string;
  email: string;
  idDocument: string;
};

export type CorporateReferral = { officerName?: string; contact?: string };

export type CorporateVerification = {
  company: CorporateCompany;
  bankDetails: CorporateBankDetails;
  documents: CorporateDocuments;
  signatories: CorporateSignatory[];
  referral?: CorporateReferral;
};

export type VerificationData = {
  personal?: VerificationPersonal;
  nextOfKin?: VerificationNextOfKin;
  bankDetails?: VerificationBankDetails;
  documents?: VerificationDocuments;
  corporate?: CorporateVerification;
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
  investorType?: "personal" | "corporate" | "none";
  isVerified: boolean;
  createdAt?: string;
  verification?: VerificationData;
};
