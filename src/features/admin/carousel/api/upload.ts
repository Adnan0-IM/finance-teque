import { api, getApiErrorMessage } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

const uploadCarouselImageApi = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const res = await api.post("/uploads/carousel", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // Prefer relative url so it works across environments
    const url = (res.data?.url as string) || "";
    if (!url) throw new Error("Upload failed");
    return url;
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message || "Upload failed");
  }
};

export const useUploadCarouselImage = () => {
  return useMutation<string, Error, File>({
    mutationFn: uploadCarouselImageApi,
  });
};
