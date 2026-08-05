"use server";

import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

import type { PropertyFormState } from "@/types/property";

const propertySchema = z.object({
  name: z.string().trim().min(2),
  address: z.string().trim().min(2),
  city: z.string().trim().min(2),
  postalCode: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? value : null)),
  size: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : null)),
  rooms: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : null)),
  owner: z.string().trim().min(2),
});

export async function getProperties() {
  const cookieStore = await cookies();
  const sessionId = await cookieStore.get("session")?.value;

  if (!sessionId) {
    throw new Error("No session found");
  }

  try {
    return await prisma.property.findMany({
      where: {
        workspace: {
          sessionId,
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch properties", error);
    throw new Error("Unable to load properties.");
  }
}

export async function getPropertyById(id: string) {
  try {
    return await prisma.property.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Failed to fetch property ${id}`, error);
    throw new Error("Unable to load property.");
  }
}

export async function createProperty(
  prevState: PropertyFormState,
  formData: FormData,
): Promise<PropertyFormState> {
  const sessionId = (await cookies()).get("session")?.value;

  if (!sessionId) {
    console.error("Missing session id");
    throw new Error("Unauthorized");
  }

  const result = propertySchema.safeParse({
    name: formData.get("name"),
    address: formData.get("address"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode"),
    size: formData.get("size"),
    rooms: formData.get("rooms"),
  });

  if (!result.success) {
    return {
      success: false,
      errors: z.treeifyError(result.error),
    };
  }

  try {
    const workspace = await prisma.workspace.findUnique({
      where: {
        sessionId,
      },
    });

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    const existingProperty = await prisma.property.findFirst({
      where: {
        name: result.data.name,
        workspaceId: workspace.id,
      },
    });

    if (existingProperty) {
      return {
        success: false,
        errors: {
          name: ["A property with this name already exists."],
        },
      };
    }

    await prisma.property.create({
      data: {
        ...result.data,
        workspaceId: workspace.id,
      },
    });
  } catch (error) {
    console.error("Failed to create property", error);

    return {
      success: false,
      message: "Unable to create property.",
    };
  }

  revalidatePath("/properties");
  redirect("/properties");
}

export async function updateProperty(id: string, formData: FormData) {
  try {
    const data = parseFormData(formData, propertySchema);

    await prisma.property.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error(`Failed to update property ${id}`, error);
    throw new Error("Unable to update property.");
  }
  revalidatePath("/properties");
  redirect("/properties", RedirectType.replace);
}

export async function deleteProperty(id: string) {
  try {
    await prisma.property.delete({ where: { id } });
  } catch (error) {
    console.error(`Failed to delete property ${id}`, error);
    throw new Error("Unable to delete property.");
  }
  revalidatePath("/properties");
  redirect("/properties", RedirectType.replace);
}
