import { useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useUser, useVerifyUser } from "../api/adminQueries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import RejectDialog from "../components/verification/RejectDialog";
import DashboardNavigation from "@/components/layout/DashboardLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  User,
  Users,
  CreditCard,
  FileText,
  Activity,
  Eye,
  EyeOff,
  Copy,
  Download,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

const UserVerificationDetails = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const {
    data: user,
    isPending,
    isError,
    error,
  } = useUser({ userId: userId || "" });
  const { mutate: verifyUser, isPending: verifying } = useVerifyUser();

  const [rejectOpen, setRejectOpen] = useState(false);

  const onApprove = useCallback(() => {
    if (!userId) return;
    verifyUser({ userId, statusObject: { status: "approved" } });
  }, [userId, verifyUser]);

  const onConfirmReject = useCallback(
    (reason: string) => {
      if (!userId) return;
      verifyUser({
        userId,
        statusObject: { status: "rejected", rejectionReason: reason },
      });
      setRejectOpen(false);
    },
    [userId, verifyUser]
  );

  const verification = user?.verification;
  const status = verification?.status ?? "pending";
  const submittedAt = verification?.submittedAt ?? user?.createdAt;
  const reviewedAt = verification?.reviewedAt;
  const reviewedBy = verification?.reviewedBy;
  const rejectionReason = verification?.rejectionReason;

  // Document preview dialog state
  const [preview, setPreview] = useState<{
    url: string;
    kind: "image" | "pdf" | "other";
    title: string;
  } | null>(null);

  const openPreview = useCallback((title: string, url?: string) => {
    if (!url) return;
    const lower = url.split("?")[0].toLowerCase();
    const kind: "image" | "pdf" | "other" = lower.endsWith(".pdf")
      ? "pdf"
      : /\.(png|jpe?g|gif|webp|bmp|svg)$/.test(lower)
      ? "image"
      : "other";
    setPreview({ url, kind, title });
  }, []);

  const personal = verification?.personal;
  const nextOfKin = verification?.nextOfKin;
  const bank = verification?.bankDetails;
  const docs = verification?.documents;

  // Mask/reveal state
  const [showBvn, setShowBvn] = useState(false);
  const [showAcct, setShowAcct] = useState(false);

  const masked = useCallback((value?: string, visible = 4) => {
    if (!value) return "-";
    if (value.length <= visible) return value;
    const hidden = value.length - visible;
    return "•".repeat(hidden) + value.slice(-visible);
  }, []);

  const copyToClipboard = useCallback(async (val?: string) => {
    if (!val) return;
    try {
      await navigator.clipboard.writeText(val);
    } catch {
      // no-op
    }
  }, []);

  // Derived doc URLs (fallback to raw fields if *_Url missing)
  const docSources = useMemo(
    () => [
      {
        key: "idDocument",
        label: "ID Document",
        url: docs?.idDocumentUrl || docs?.idDocument,
      },
      {
        key: "passportPhoto",
        label: "Passport Photo",
        url: docs?.passportPhotoUrl || docs?.passportPhoto,
      },
      {
        key: "utilityBill",
        label: "Utility Bill",
        url: docs?.utilityBillUrl || docs?.utilityBill,
      },
    ],
    [docs]
  );

  if (!userId) {
    return (
      <DashboardNavigation>
        <div className="p-6">
          <div className="max-w-md mx-auto text-center">
            <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Invalid Request</h3>
            <p className="text-muted-foreground mb-4">
              User ID is missing from the request.
            </p>
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </DashboardNavigation>
    );
  }

  if (isPending) {
    return (
      <DashboardNavigation>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardNavigation>
    );
  }

  if (isError) {
    return (
      <DashboardNavigation>
        <div className="p-6">
          <div className="max-w-md mx-auto text-center">
            <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Error Loading User</h3>
            <p className="text-muted-foreground mb-4">
              {(error as Error)?.message ||
                "Failed to load user verification details"}
            </p>
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </DashboardNavigation>
    );
  }

  const getStatusIcon = () => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  return (
    <DashboardNavigation>
      <div className=" space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        

        <div className="flex items-center justify-between bg-card shadow-sm border border-brand-accent/20 gap-2 rounded-lg p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className=" text-lg sm:text-2xl font-bold">
                  User Verification
                </h1>
                {getStatusIcon()}
              </div>
              <p className="text-muted-foreground">
                {user?.name || user?.email} • {user?.role}
              </p>
            </div>
            <Badge
              variant={
                status === "approved"
                  ? "default"
                  : status === "rejected"
                  ? "destructive"
                  : "secondary"
              }
              className="text-sm px-3 py-1"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>

          {status === "pending" && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                disabled={verifying}
                onClick={onApprove}
                className="bg-green-600 hover:bg-green-700"
              >
                {verifying ? "Processing..." : "Approve"}
              </Button>
              <Button
                variant="destructive"
                disabled={verifying}
                onClick={() => setRejectOpen(true)}
              >
                Reject
              </Button>
            </div>
          )}
        </div>

        {/* Accordion sections */}
        <Accordion
          type="multiple"
          className="space-y-4"
          defaultValue={["profile", "personal", "documents"]}
        >
          {/* Profile */}
          <AccordionItem value="profile" className="border rounded-lg">
            <AccordionTrigger className="px-5 py-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Profile Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Basic account details
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoField label="Full Name" value={user?.name} />
                <InfoField label="Email Address" value={user?.email} />
                <InfoField label="Phone Number" value={user?.phone} />
                <InfoField label="Role" value={user?.role} />
                <InfoField
                  label="Account Created"
                  value={
                    user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : undefined
                  }
                />
                <InfoField
                  label="Verified Status"
                  value={user?.isVerified ? "Yes" : "No"}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Personal Info */}
          <AccordionItem value="personal" className="border rounded-lg">
            <AccordionTrigger className="px-5 py-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Personal Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Identity and address details
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoField label="First Name" value={personal?.firstName} />
                <InfoField label="Surname" value={personal?.surname} />
                <InfoField
                  label="Date of Birth"
                  value={personal?.dateOfBirth}
                />
                <InfoField
                  label="Local Government"
                  value={personal?.localGovernment}
                />
                <InfoField
                  label="State of Residence"
                  value={personal?.stateOfResidence}
                />
                <div className="md:col-span-2 lg:col-span-3">
                  <InfoField
                    label="Residential Address"
                    value={personal?.residentialAddress}
                  />
                </div>
                <SensitiveField
                  label="NIN Number"
                  value={personal?.ninNumber}
                  shown={false}
                  allowToggle={false}
                  onToggle={() => {}}
                  onCopy={copyToClipboard}
                  maskFn={masked}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Next of kin */}
          <AccordionItem value="kin" className="border rounded-lg">
            <AccordionTrigger className="px-5 py-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Next of Kin</h3>
                  <p className="text-sm text-muted-foreground">
                    Emergency contact information
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoField label="Full Name" value={nextOfKin?.fullName} />
                <InfoField
                  label="Relationship"
                  value={nextOfKin?.relationship}
                />
                <InfoField
                  label="Phone Number"
                  value={nextOfKin?.phoneNumber}
                />
                <InfoField label="Email Address" value={nextOfKin?.email} />
                <div className="md:col-span-2 lg:col-span-3">
                  <InfoField
                    label="Residential Address"
                    value={nextOfKin?.residentialAddress}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Bank details */}
          <AccordionItem value="bank" className="border rounded-lg">
            <AccordionTrigger className="px-5 py-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Bank Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Financial account information
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoField label="Account Name" value={bank?.accountName} />
                <InfoField label="Bank Name" value={bank?.bankName} />
                <InfoField label="Account Type" value={bank?.accountType} />
                <SensitiveField
                  label="Account Number"
                  value={bank?.accountNumber}
                  shown={showAcct}
                  allowToggle={true}
                  onToggle={() => setShowAcct((s) => !s)}
                  onCopy={copyToClipboard}
                  maskFn={masked}
                />
                <SensitiveField
                  label="BVN Number"
                  value={bank?.bvnNumber}
                  shown={showBvn}
                  allowToggle={true}
                  onToggle={() => setShowBvn((s) => !s)}
                  onCopy={copyToClipboard}
                  maskFn={masked}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Documents */}
          <AccordionItem value="documents" className="border rounded-lg">
            <AccordionTrigger className="px-5 py-4 mb-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-red-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Documents</h3>
                  <p className="text-sm text-muted-foreground">
                    Uploaded verification documents
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {docSources.map((doc) => (
                  <DocumentCard
                    key={doc.key}
                    label={doc.label}
                    url={doc.url}
                    onView={() => openPreview(doc.label, doc.url)}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Activity / verification meta */}
          <AccordionItem value="verification" className="border rounded-lg">
            <AccordionTrigger className="px-5 py-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-gray-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Verification Activity</h3>
                  <p className="text-sm text-muted-foreground">
                    Review history and timeline
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InfoField
                    label="Submitted At"
                    value={
                      submittedAt
                        ? new Date(submittedAt).toLocaleString()
                        : undefined
                    }
                  />
                  <InfoField
                    label="Reviewed At"
                    value={
                      reviewedAt
                        ? new Date(reviewedAt).toLocaleString()
                        : undefined
                    }
                  />
                  <InfoField label="Reviewed By" value={reviewedBy} />
                </div>

                {status === "rejected" && rejectionReason && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-900 mb-2">
                      Rejection Reason
                    </h4>
                    <p className="text-red-700">{rejectionReason}</p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Reject dialog */}
        <RejectDialog
          open={rejectOpen}
          onOpenChange={setRejectOpen}
          onConfirm={onConfirmReject}
          loading={verifying}
        />
      </div>

      {/* Preview dialog */}
      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {preview?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            {preview?.kind === "image" ? (
              <img
                src={preview.url}
                alt={preview.title}
                className="max-h-[70vh] w-full object-contain rounded-lg"
              />
            ) : preview?.kind === "pdf" ? (
              <iframe
                src={preview.url}
                title={preview.title}
                className="w-full h-[70vh] rounded-lg border"
              />
            ) : preview ? (
              <div className="text-center py-12 space-y-4">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="font-medium">Preview not available</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    This file type cannot be previewed. Download to view the
                    content.
                  </p>
                </div>
                <Button asChild>
                  <a
                    href={preview.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download File
                  </a>
                </Button>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </DashboardNavigation>
  );
};

function InfoField({ label, value }: { label: string; value?: string }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <p className="text-sm bg-muted/50 rounded-md px-3 py-2 min-h-[2.5rem] flex items-center">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function SensitiveField(props: {
  label: string;
  value?: string;
  shown: boolean;
  allowToggle: boolean;
  onToggle: () => void;
  onCopy: (val?: string) => void;
  maskFn: (v?: string, visible?: number) => string;
}) {
  const { label, value, shown, allowToggle, onToggle, onCopy, maskFn } = props;
  const display = shown ? value || "Not provided" : maskFn(value, 4);

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <div className="flex items-center gap-2 bg-muted/50 rounded-md px-3 py-2 min-h-[2.5rem]">
        <span className="flex-1 text-sm font-mono">{display}</span>
        <div className="flex items-center gap-1">
          {allowToggle && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="h-8 w-8 p-0"
            >
              {shown ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onCopy(value)}
            disabled={!value}
            className="h-8 w-8 p-0"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function DocumentCard({
  label,
  url,
  onView,
}: {
  label: string;
  url?: string;
  onView: () => void;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-sm">{label}</h4>
              <p className="text-xs text-muted-foreground">
                {url ? "Available" : "Not uploaded"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onView}
            disabled={!url}
            className="flex-1 py-1"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={!url}
            asChild={!!url}
            className="flex-1 py-1 "
          >
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" download>
                <Download className="h-4 w-4 mr-1" />
                Download
              </a>
            ) : (
              <>
                <Download className="h-4 w-4 mr-1" />
                Download
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserVerificationDetails;
