"use server";

import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { parseFormData } from "@/utils/form-validators";

const leaseSchema = z.object({
  startDate: z
    .string()
    .min(1)
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Invalid start date.",
    }),
  endDate: z
    .string()
    .optional()
    .transform((value) => (value ? new Date(value) : null)),
  rentAmount: z.string().trim().min(1),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
  tenantId: z.string().trim().min(1),
  propertyId: z.string().trim().min(1),
});

export async function getLeases() {
  const cookiesStore = await cookies();
  const sessionId = await cookiesStore.get("session")?.value;

  if (!sessionId) {
    throw new Error("No session found");
  }

  try {
    return await prisma.lease.findMany({
      where: {
        property: {
          workspace: {
            sessionId,
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch leases", error);
    throw new Error("Unable to load leases.");
  }
}

export async function getLeaseById(id: string) {
  try {
    return await prisma.lease.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Failed to fetch lease ${id}`, error);
    throw new Error("Unable to load lease.");
  }
}

export async function createLease(formData: FormData) {
  try {
    const data = parseFormData(formData, leaseSchema);

    await prisma.lease.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.endDate,
      },
    });

    revalidatePath("/leases");
    redirect("/leases", RedirectType.replace);
  } catch (error) {
    console.error("Failed to create lease", error);
    throw new Error("Unable to create lease.");
  }
}

export async function updateLease(id: string, formData: FormData) {
  try {
    const data = parseFormData(formData, leaseSchema);

    await prisma.lease.update({
      where: { id },
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.endDate,
      },
    });

    revalidatePath("/leases");
    redirect("/leases", RedirectType.replace);
  } catch (error) {
    console.error(`Failed to update lease ${id}`, error);
    throw new Error("Unable to update lease.");
  }
}

export async function deleteLease(id: string) {
  try {
    await prisma.lease.delete({ where: { id } });
    revalidatePath("/leases");
    redirect("/leases", RedirectType.replace);
  } catch (error) {
    console.error(`Failed to delete lease ${id}`, error);
    throw new Error("Unable to delete lease.");
  }
}
