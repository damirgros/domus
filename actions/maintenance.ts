"use server";

import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { parseFormData } from "@/lib/form-validators";

const maintenanceTicketSchema = z.object({
  title: z.string().trim().min(2),
  description: z.string().trim().min(2),
  status: z.enum(["OPEN", "IN_PROGRESS", "COMPLETED"]).default("OPEN"),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]).default("LOW"),
  propertyName: z.string().trim().min(2),
  propertyId: z.string().trim().min(1),
});

export async function getMaintenanceTickets() {
  try {
    return await prisma.maintenanceTicket.findMany({
      orderBy: { createdAt: "desc" },
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

    await prisma.maintenanceTicket.create({
      data,
    });

    revalidatePath("/maintanance");
    redirect("/maintanance", RedirectType.replace);
  } catch (error) {
    console.error("Failed to create maintenance ticket", error);
    throw new Error("Unable to create maintenance ticket.");
  }
}

export async function updateMaintenanceTicket(id: string, formData: FormData) {
  try {
    const data = parseFormData(formData, maintenanceTicketSchema);

    await prisma.maintenanceTicket.update({
      where: { id },
      data,
    });

    revalidatePath("/maintanance");
    redirect("/maintanance", RedirectType.replace);
  } catch (error) {
    console.error(`Failed to update maintenance ticket ${id}`, error);
    throw new Error("Unable to update maintenance ticket.");
  }
}

export async function deleteMaintenanceTicket(id: string) {
  try {
    await prisma.maintenanceTicket.delete({ where: { id } });
    revalidatePath("/maintanance");
    redirect("/maintanance", RedirectType.replace);
  } catch (error) {
    console.error(`Failed to delete maintenance ticket ${id}`, error);
    throw new Error("Unable to delete maintenance ticket.");
  }
}
