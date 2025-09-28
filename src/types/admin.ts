export type optionsType = {
  page: number;
  limit: number;
  status?: "pending" | "approved" | "rejected" | "";
  q?: string;
};

export type paginationType = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};

export type userRolePropType = {
  userId: string;
  role: "admin" | "investor" | "startup";
};

export type verifyUserPropTypes = {
  userId: string;
  statusObject: { status: "approved" | "rejected"; rejectionReason?: string };
};

export type verificationStatustypes = {
    status:"approved" | "rejected" | "pending"
    isVerified: true,
    rejectionReason: string,
    verifiedAt: Date
    reviewedAt: Date
    reviewedBy: string
    submittedAt: Date
}