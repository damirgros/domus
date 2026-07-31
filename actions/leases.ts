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
  propertyName: z.string().trim().min(2),
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
      include: { property: true },
    });
  } catch (error) {
    console.error(`Failed to fetch lease ${id}`, error);
    throw new Error("Unable to load lease.");
  }
}

export async function createLease(formData: FormData) {
  try {
    const data = parseFormData(formData, leaseSchema);

    const property = await prisma.property.findFirst({
      where: { name: data.propertyName },
    });

    if (!property) {
      throw new Error("No property found to create a new lease.");
    }

    await prisma.lease.create({
      data: {
        rentAmount: data.rentAmount,
        status: data.status,
        tenantId: data.tenantId,
        propertyId: property.id,
        startDate: new Date(data.startDate),
        endDate: data.endDate,
      },
    });
  } catch (error) {
    console.error("Failed to create lease", error);
    throw new Error("Unable to create lease.");
  }

  revalidatePath("/leases");
  redirect("/leases", RedirectType.replace);
}

export async function updateLease(id: string, formData: FormData) {
  try {
    const data = parseFormData(formData, leaseSchema);

    const property = await prisma.property.findFirst({
      where: { name: data.propertyName },
    });

    if (!property) {
      throw new Error("No property found to update the lease.");
    }

    await prisma.lease.update({
      where: { id },
      data: {
        rentAmount: data.rentAmount,
        status: data.status,
        tenantId: data.tenantId,
        propertyId: property.id,
        startDate: new Date(data.startDate),
        endDate: data.endDate,
      },
    });
  } catch (error) {
    console.error(`Failed to update lease ${id}`, error);
    throw new Error("Unable to update lease.");
  }

  revalidatePath("/leases");
  redirect("/leases", RedirectType.replace);
}

export async function deleteLease(id: string) {
  try {
    await prisma.lease.delete({ where: { id } });
  } catch (error) {
    console.error(`Failed to delete lease ${id}`, error);
    throw new Error("Unable to delete lease.");
  }

  revalidatePath("/leases");
  redirect("/leases", RedirectType.replace);
}
