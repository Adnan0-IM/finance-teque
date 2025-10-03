import { api, getApiErrorMessage } from "@/lib/api";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

export type CarouselItem = {
  _id: string;
  image: string;
  title?: string;
  description?: string;
  link?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateCarouselDto = {
  image: string;
  title?: string;
  description?: string;
  link?: string;
};

export type UpdateCarouselDto = Partial<CreateCarouselDto>;

export const carouselKeys = {
  all: ["admin", "carousel"] as const,
  list: () => ["admin", "carousel", "list"] as const,
  item: (id: string) => ["admin", "carousel", "item", id] as const,
};

const fetchCarouselItems = async (): Promise<CarouselItem[]> => {
  try {
    const res = await api.get("/carousel");
    return (res.data?.data || []) as CarouselItem[];
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message || "Failed loading carousel items");
  }
};

const createCarouselItemApi = async (
  payload: CreateCarouselDto
): Promise<CarouselItem> => {
  try {
    const res = await api.post("/carousel", payload);
    return res.data?.data as CarouselItem;
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message || "Failed creating carousel item");
  }
};

const updateCarouselItemApi = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateCarouselDto;
}): Promise<CarouselItem> => {
  try {
    const res = await api.put(`/carousel/${id}`, data);
    return res.data?.data as CarouselItem;
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message || "Failed updating carousel item");
  }
};

const deleteCarouselItemApi = async ({ id }: { id: string }) => {
  try {
    const res = await api.delete(`/carousel/${id}`);
    return (res.data?.message as string) || "Deleted";
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message || "Failed deleting carousel item");
  }
};

export const useCarouselItems = () => {
  return useQuery({
    queryKey: carouselKeys.list(),
    queryFn: fetchCarouselItems,
    placeholderData: keepPreviousData,
  });
};

export const useCreateCarouselItem = () => {
  const qc = useQueryClient();
  return useMutation<CarouselItem, Error, CreateCarouselDto>({
    mutationFn: createCarouselItemApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: carouselKeys.list() });
    },
  });
};

export const useUpdateCarouselItem = () => {
  const qc = useQueryClient();
  return useMutation<
    CarouselItem,
    Error,
    { id: string; data: UpdateCarouselDto }
  >({
    mutationFn: updateCarouselItemApi,
    onSuccess: (updated) => {
      qc.setQueryData<CarouselItem>(carouselKeys.item(updated._id), updated);
      qc.invalidateQueries({ queryKey: carouselKeys.list() });
    },
  });
};

export const useDeleteCarouselItem = () => {
  const qc = useQueryClient();
  return useMutation<string, Error, { id: string }>({
    mutationFn: deleteCarouselItemApi,
    onSuccess: (_msg, { id }) => {
      qc.invalidateQueries({ queryKey: carouselKeys.list() });
      qc.removeQueries({ queryKey: carouselKeys.item(id) });
    },
  });
};
