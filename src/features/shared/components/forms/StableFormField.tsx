import { useState } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";

type BaseProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  label: string;
  name: TName;
  control: Control<TFieldValues>;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
  formItemClassName?: string;
  description?: string;
  accept?: string;
  isFileInput?: boolean;
  isPhone?: boolean;
  isNinOrBvn?: boolean;
  autoComplete?: string;
};

export function StableFormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  label,
  name,
  control,
  placeholder = "",
  type = "text",
  required = true,
  className = "",
  formItemClassName = "",
  description,
  accept,
  isFileInput = false,
  isPhone = false,
  isNinOrBvn = false,
  autoComplete,
}: BaseProps<TFieldValues, TName>) {
  const [dragOver, setDragOver] = useState(false);
  const inputId = `file-${String(name)}`;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...fieldProps } }) => {
        // Simple runtime guard for file-like values (works without DOM File type)
        const fileLike = value as unknown as { name?: string; size?: number };
        const hasFile =
          fileLike &&
          typeof fileLike.name === "string" &&
          typeof fileLike.size === "number";
        const prettySize = hasFile
          ? `${((fileLike.size as number) / (1024 * 1024)).toFixed(2)} MB`
          : "";

        return (
          <FormItem className={`min-h-[80px] ${formItemClassName}`}>
            {isFileInput ? (
              <FormLabel htmlFor={inputId} className="text-sm sm:text-base">
                {label}{" "}
                {required && <span className="text-destructive">*</span>}
              </FormLabel>
            ) : (
              <FormLabel className="text-sm sm:text-base">
                {label}{" "}
                {required && <span className="text-destructive">*</span>}
              </FormLabel>
            )}

            {description && (
              <p className="text-sm text-muted-foreground mb-2">
                {description}
              </p>
            )}

            <FormControl>
              {isFileInput ? (
               
                <div className="mt-2">
                  <input
                    id={inputId}
                    type="file"
                    accept={accept}
                    autoComplete={autoComplete}
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      onChange(file);
                    }}
                    {...fieldProps}
                    className="hidden"
                  />

                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={`Upload ${label}`}
                    onClick={() => document.getElementById(inputId)?.click()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        document.getElementById(inputId)?.click();
                      }
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) onChange(file);
                    }}
                    className={[
                      "flex w-full flex-col items-center justify-center",
                      "rounded-xl border-2 border-dashed transition",
                      dragOver
                        ? "border-brand-primary bg-brand-primary/5"
                        : "border-gray-300 bg-gray-50 hover:bg-white",
                      "px-3 py-6 sm:px-4 sm:py-6 cursor-pointer",
                      "min-h-[92px]",
                    ].join(" ")}
                  >
                    <Upload
                      className={`mb-2 ${dragOver ? "text-brand-primary" : "text-gray-500"} h-6 w-6 sm:h-5 sm:w-5`}
                    />
                    <p className="text-sm sm:text-base text-gray-700 text-center">
                      <span className="font-medium sm:hidden">Tap to upload</span>
                      <span className="hidden sm:inline font-medium">Click to upload</span>
                      <span className="hidden sm:inline"> or drag and drop</span>
                    </p>
                    {accept && (
                      <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 text-center">
                        Allowed: {accept.replaceAll(".", "").toUpperCase()} • Max 5MB
                      </p>
                    )}
                  </div>

                  {hasFile && (
                    <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 rounded-md border bg-white px-3 py-2">
                      <div className="min-w-0 max-w-full sm:max-w-[60%]">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {fileLike.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{prettySize}</p>
                      </div>
                      <div className="flex-1" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onChange(null);
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm text-gray-700 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition"
                        aria-label="Remove file"
                        title="Remove file"
                      >
                        <X className="mr-1 h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  )}
                </div>


              ) : isPhone ? (
                <Input
                  placeholder={placeholder}
                  type={type}
                  autoComplete={autoComplete}
                  className={`h-11 rounded-md border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition ${className}`}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, "");
                    if (v.startsWith("0")) v = v.slice(1);
                    onChange(v);
                  }}
                  value={typeof value === "string" ? value : ""}
                  {...fieldProps}
                />
              ) : isNinOrBvn ? (
                <Input
                  placeholder={placeholder}
                  type={type}
                  autoComplete={autoComplete}
                  className={`h-11 rounded-md border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition ${className}`}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "");
                    onChange(v);
                  }}
                  value={typeof value === "string" ? value : ""}
                  {...fieldProps}
                />
              ) : (
                <Input
                  placeholder={placeholder}
                  type={type}
                  autoComplete={autoComplete}
                  className={`h-11 rounded-md border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition ${className}`}
                  onChange={onChange}
                  value={typeof value === "string" ? value : ""}
                  {...fieldProps}
                />
              )}
            </FormControl>

            <div className="min-h-[6px]">
              <FormMessage className="text-xs sm:text-sm" />
            </div>
          </FormItem>
        );
      }}
    />
  );
}
