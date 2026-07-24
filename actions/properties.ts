"use server";

import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { parseFormData } from "@/lib/form-validators";

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
  workspaceId: z.string().trim().min(1),
});

export async function getProperties() {
  try {
    return await prisma.property.findMany({
      orderBy: { createdAt: "desc" },
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
  try {
    const data = parseFormData(formData, propertySchema);

    await prisma.property.create({
      data,
    });

    revalidatePath("/overview");
    redirect("/overview", RedirectType.replace);
  } catch (error) {
    console.error("Failed to create property", error);
    throw new Error("Unable to create property.");
  }
}

export async function updateProperty(id: string, formData: FormData) {
  try {
    const data = parseFormData(formData, propertySchema);

    await prisma.property.update({
      where: { id },
      data,
    });

    revalidatePath("/overview");
    redirect("/overview", RedirectType.replace);
  } catch (error) {
    console.error(`Failed to update property ${id}`, error);
    throw new Error("Unable to update property.");
  }
}

export async function deleteProperty(id: string) {
  try {
    await prisma.property.delete({ where: { id } });
    revalidatePath("/overview");
    redirect("/overview", RedirectType.replace);
  } catch (error) {
    console.error(`Failed to delete property ${id}`, error);
    throw new Error("Unable to delete property.");
  }
}
