import { z } from "zod";

export function parseFormData<TSchema extends z.ZodTypeAny>(
  formData: FormData,
  schema: TSchema,
) {
  const result = schema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    console.error("Form validation failed", result.error.flatten());
    throw new Error("Invalid form data.");
  }

  return result.data;
}
