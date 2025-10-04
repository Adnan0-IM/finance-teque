import { useEffect, useMemo, useRef, useState } from "react";
import {
  useCarouselItems,
  useCreateCarouselItem,
  useUpdateCarouselItem,
  useDeleteCarouselItem,
  type CarouselItem as Item,
  type CreateCarouselDto,
  type UpdateCarouselDto,
} from "../api/carouselQueries";
import { useUploadCarouselImage } from "../api/upload";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  ExternalLink,
  ImagePlus,
  Pencil,
  Plus,
  Trash2,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import DashboardNavigation from "@/components/layout/DashboardLayout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Accept http(s) URLs or site-relative paths starting with "/"
const webPathSchema = z
  .string()
  .min(1, "Required")
  .refine(
    (v) => v.startsWith("/") || /^https?:\/\//i.test(v),
    "Enter a valid URL or path starting with /"
  );

const createSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: webPathSchema, // required; can be uploaded path
  link: z
    .union([
      z.literal(""),
      z
        .string()
        .refine(
          (v) => v.startsWith("/") || /^https?:\/\//i.test(v),
          "Enter a valid URL or path starting with /"
        ),
    ])
    .optional(),
});

type CreateFormValues = z.infer<typeof createSchema>;

const editSchema = createSchema.partial({});
type EditFormValues = z.infer<typeof editSchema>;

const defaultCreateValues: CreateFormValues = {
  title: "",
  description: "",
  image: "",
  link: "",
};

const ManageCarouselPage = () => {
  const { data = [], isLoading, isError, error } = useCarouselItems();
  const createMut = useCreateCarouselItem();
  const updateMut = useUpdateCarouselItem();
  const deleteMut = useDeleteCarouselItem();
  const uploadCreateMut = useUploadCarouselImage();
  const uploadEditMut = useUploadCarouselImage();

  // Delete dialog state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Item | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Dialog state
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<Item | null>(null);

  // File inputs
  const createFileRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);

  // Create form
  const createForm = useForm<CreateFormValues>({
    resolver: zodResolver(createSchema),
    defaultValues: defaultCreateValues,
    mode: "onChange",
  });

  // Edit form
  const editForm = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      link: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (selected && editOpen) {
      editForm.reset({
        title: selected.title ?? "",
        description: selected.description ?? "",
        image: selected.image ?? "",
        link: selected.link ?? "",
      });
    }
  }, [selected, editOpen, editForm]);

  const onCreateSubmit = async (values: CreateFormValues) => {
    const payload: CreateCarouselDto = {
      title: values.title,
      description: values.description?.trim() || "",
      image: values.image,
      link: values.link?.trim() || "",
    };
    try {
      await createMut.mutateAsync(payload);
      toast.success("Item created");
      createForm.reset(defaultCreateValues);
      setCreateOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Error creating item");
    }
  };

  const onEditSubmit = async (values: EditFormValues) => {
    if (!selected?._id) return;
    const update: UpdateCarouselDto = {
      title: values.title?.trim(),
      description: values.description?.trim(),
      image: values.image,
      link: (values.link ?? "").trim(),
    };
    try {
      await updateMut.mutateAsync({ id: selected._id, data: update });
      toast.success("Item updated");
      setEditOpen(false);
      setSelected(null);
    } catch (error) {
      console.log(error);
      toast.error("Error updating item");
    }
  };


  // Open delete dialog for a specific item
  const openDeleteDialog = (it: Item) => {
    setToDelete(it);
    setDeleteOpen(true);
  };

  // Confirm deletion
  const handleConfirmDelete = async () => {
    if (!toDelete?._id) return;
    setIsDeleting(true);
    try {
      await deleteMut.mutateAsync({ id: toDelete._id });
      toast.success("Item deleted");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting item");
    } finally {
      setIsDeleting(false);
      setDeleteOpen(false);
      setToDelete(null);
    }
  };

  const handleDeleteDialogChange = (open: boolean) => {
    setDeleteOpen(open);
    if (!open) setToDelete(null);
  };

  const openEdit = (it: Item) => {
    setSelected(it);
    setEditOpen(true);
  };

  const onUploadCreatePick = () => createFileRef.current?.click();
  const onUploadEditPick = () => editFileRef.current?.click();

  const handleCreateFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadCreateMut.mutateAsync(file);
      createForm.setValue("image", url, {
        shouldValidate: true,
        shouldDirty: true,
      });
      toast.success("Image uploaded");
    } catch (err) {
      toast.error((err as Error)?.message || "Upload failed");
    } finally {
      if (createFileRef.current) createFileRef.current.value = "";
    }
  };

  const handleEditFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadEditMut.mutateAsync(file);
      editForm.setValue("image", url, {
        shouldValidate: true,
        shouldDirty: true,
      });
      toast.success("Image uploaded");
    } catch (err) {
      toast.error((err as Error)?.message || "Upload failed");
    } finally {
      if (editFileRef.current) editFileRef.current.value = "";
    }
  };

  const copyToClipboard = async (text?: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  const rows = useMemo(() => data, [data]);

  return (
    <DashboardNavigation>
      <div className="mx-auto w-full max-w-6xl  space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">
              Manage Carousel
            </h1>
            <p className="text-sm text-muted-foreground">
              Create, edit, and delete carousel items.
            </p>
          </div>
          <Button size="sm" onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add item
          </Button>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto rounded-md border">
          <Table className="min-w-[720px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[160px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Link</TableHead>
                <TableHead className="w-[140px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5}>Loading...</TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-red-600">
                    {String(error)}
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-muted-foreground">
                    No items yet.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((it) => (
                  <TableRow key={it._id}>
                    <TableCell>
                      <div className="h-16 w-28 overflow-hidden rounded-md bg-muted">
                        <img
                          src={it.image}
                          alt={it.title || "carousel"}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="align-top">
                      <div className="font-medium">{it.title || "—"}</div>
                    </TableCell>
                    <TableCell className="align-top">
                      <div className="line-clamp-2 text-sm text-muted-foreground">
                        {it.description || "—"}
                      </div>
                    </TableCell>
                    <TableCell className="align-top">
                      {it.link ? (
                        <a
                          href={it.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          Open <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="align-top">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => openEdit(it)}
                          className="h-8 w-8"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => openDeleteDialog(it)}
                          disabled={deleteMut.isPending}
                          className="h-8 w-8"
                          aria-label="Delete item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Create Dialog */}
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add carousel item</DialogTitle>
              <DialogDescription>
                Provide details for the new carousel slide.
              </DialogDescription>
            </DialogHeader>
            <Form {...createForm}>
              <form
                onSubmit={createForm.handleSubmit(onCreateSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={createForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={createForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Optional description"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image URL + Upload */}
                <FormField
                  control={createForm.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <div className="flex flex-col gap-2">
                        <FormControl>
                          <Input
                            placeholder="https://... or /uploads/..."
                            {...field}
                          />
                        </FormControl>

                        <div className="flex items-center gap-2 min-w-0 relative">
                          <input
                            ref={createFileRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleCreateFileChange}
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={onUploadCreatePick}
                            disabled={uploadCreateMut.isPending}
                          >
                            <ImagePlus className="mr-2 h-4 w-4" />
                            {uploadCreateMut.isPending
                              ? "Uploading..."
                              : "Upload image"}
                          </Button>

                          {/* Truncated URL indicator */}
                          <div className="min-w-0 flex-1 ">
                            {field.value ? (
                              <span
                                className="block w-full truncate text-xs text-muted-foreground"
                                title={field.value}
                              >
                                Using:{" "}
                                {field.value.length > 40
                                  ? field.value.slice(0, 35)
                                  : field.value.slice(0, 42)}
                                {field.value.length >= 40 && "..."}
                              </span>
                            ) : null}
                          </div>

                          {/* Optional copy button */}
                          {field.value.length > 35 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 absolute right-0.5"
                              onClick={() => copyToClipboard(field.value)}
                              disabled={!field.value}
                              title="Copy image URL"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        {field.value ? (
                          <div className="mt-1 h-28 w-full overflow-hidden rounded-md bg-muted">
                            <img
                              src={field.value}
                              alt="preview"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : null}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={createForm.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://... or /path" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="gap-2 sm:gap-4">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={createMut.isPending}>
                    {createMut.isPending ? "Adding..." : "Add"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit carousel item</DialogTitle>
              <DialogDescription>
                Update the fields and save changes.
              </DialogDescription>
            </DialogHeader>

            {selected ? (
              <Form {...editForm}>
                <form
                  onSubmit={editForm.handleSubmit(onEditSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={editForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={editForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Optional description"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Image URL + Upload */}
                  <FormField
                    control={editForm.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <div className="flex flex-col gap-2">
                          <FormControl>
                            <Input
                              placeholder="https://... or /uploads/..."
                              {...field}
                            />
                          </FormControl>

                          <div className="flex items-center gap-2 min-w-0">
                            <input
                              ref={editFileRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleEditFileChange}
                            />
                            <Button
                              type="button"
                              variant="secondary"
                              onClick={onUploadEditPick}
                              disabled={uploadEditMut.isPending}
                            >
                              <ImagePlus className="mr-2 h-4 w-4" />
                              {uploadEditMut.isPending
                                ? "Uploading..."
                                : "Upload image"}
                            </Button>

                            <div className="min-w-0 flex-1">
                              {field.value ? (
                                <span
                                  className="block w-full truncate text-xs text-muted-foreground"
                                  title={field.value}
                                >
                                  Using:{" "}
                                  {field.value.length > 35
                                    ? field.value.slice(0, 35)
                                    : field.value.slice(0, 42)}
                                  {field.value.length >= 40 && "..."}
                                </span>
                              ) : null}
                            </div>

                            {field.value.length > 35 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => copyToClipboard(field.value)}
                                disabled={!field.value}
                                title="Copy image URL"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          {field.value ? (
                            <div className="mt-1 h-28 w-full overflow-hidden rounded-md bg-muted">
                              <img
                                src={field.value}
                                alt="preview"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : null}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={editForm.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://... or /path"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter className="gap-2 sm:gap-r">
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit" disabled={updateMut.isPending}>
                      {updateMut.isPending ? "Saving..." : "Save changes"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            ) : (
              <div className="text-sm text-muted-foreground">
                No item selected.
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog (single, controlled) */}
        <AlertDialog open={deleteOpen} onOpenChange={handleDeleteDialogChange}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete item?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. It will permanently delete{" "}
                <span className="font-medium">
                  {toDelete?.title || "this carousel item"}
                </span>
                .
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              >
                {isDeleting ? "Deleting..." : "Yes, delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardNavigation>
  );
};

export default ManageCarouselPage;
