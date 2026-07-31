"use server";

import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { parseFormData } from "@/utils/form-validators";

const maintenanceTicketSchema = z.object({
  title: z.string().trim().min(2),
  description: z.string().trim().min(2),
  status: z.enum(["OPEN", "IN_PROGRESS", "COMPLETED"]).default("OPEN"),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]).default("LOW"),
  propertyName: z.string().trim().min(2),
});

export async function getMaintenanceTickets() {
  const cookieStore = await cookies();
  const sessionId = await cookieStore.get("session")?.value;

  if (!sessionId) {
    throw new Error("No session found");
  }

  try {
    return await prisma.maintenanceTicket.findMany({
      where: {
        property: {
          workspace: {
            sessionId,
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch maintenance tickets", error);
    throw new Error("Unable to load maintenance tickets.");
  }
}

export async function getMaintenanceTicketById(id: string) {
  try {
    return await prisma.maintenanceTicket.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Failed to fetch maintenance ticket ${id}`, error);
    throw new Error("Unable to load maintenance ticket.");
  }
}

export async function createMaintenanceTicket(formData: FormData) {
  try {
    const data = parseFormData(formData, maintenanceTicketSchema);

    const property = await prisma.property.findFirst({
      where: { name: data.propertyName },
    });

    if (!property) {
      throw new Error("No property found to create a new maintenance ticket.");
    }

    await prisma.maintenanceTicket.create({
      data: {
        ...data,
        propertyId: property.id,
      },
    });
  } catch (error) {
    console.error("Failed to create maintenance ticket", error);
    throw new Error("Unable to create maintenance ticket.");
  }

  revalidatePath("/maintanance");
  redirect("/maintanance", RedirectType.replace);
}

export async function updateMaintenanceTicket(id: string, formData: FormData) {
  try {
    const data = parseFormData(formData, maintenanceTicketSchema);

    const property = await prisma.property.findFirst({
      where: { name: data.propertyName },
    });

    if (!property) {
      throw new Error("No property found to update the maintenance ticket.");
    }

    await prisma.maintenanceTicket.update({
      where: { id },
      data: {
        ...data,
        propertyId: property.id,
      },
    });
  } catch (error) {
    console.error(`Failed to update maintenance ticket ${id}`, error);
    throw new Error("Unable to update maintenance ticket.");
  }

  revalidatePath("/maintanance");
  redirect("/maintanance", RedirectType.replace);
}

export async function deleteMaintenanceTicket(id: string) {
  try {
    await prisma.maintenanceTicket.delete({ where: { id } });
  } catch (error) {
    console.error(`Failed to delete maintenance ticket ${id}`, error);
    throw new Error("Unable to delete maintenance ticket.");
  }

  revalidatePath("/maintanance");
  redirect("/maintanance", RedirectType.replace);
}
