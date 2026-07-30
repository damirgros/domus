"use server";

import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { parseFormData } from "@/utils/form-validators";

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

export async function createProperty(formData: FormData) {
  const cookieStore = await cookies();
  const sessionId = await cookieStore.get("session")?.value;

  try {
    const data = parseFormData(formData, propertySchema);

    if (!sessionId) {
      throw new Error("Session id is missing.");
    }

    const property = await prisma.property.findFirst({
      where: { name: data.name },
    });

    if (property) throw new Error("Property with that name already exists.");

    const workspace = await prisma.workspace.findUnique({
      where: {
        sessionId,
      },
    });

    if (workspace) {
      await prisma.property.create({
        data: { ...data, workspaceId: workspace.id },
      });
    } else {
      throw new Error("No workspace found to create property.");
    }
  } catch (error) {
    console.error("Failed to create property", error);
    throw new Error("Unable to create property.");
  }
  revalidatePath("/overview");
  redirect("/overview", RedirectType.replace);
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
  revalidatePath("/overview");
  redirect("/overview", RedirectType.replace);
}

export async function deleteProperty(id: string) {
  try {
    await prisma.property.delete({ where: { id } });
  } catch (error) {
    console.error(`Failed to delete property ${id}`, error);
    throw new Error("Unable to delete property.");
  }
  revalidatePath("/overview");
  redirect("/overview", RedirectType.replace);
}
