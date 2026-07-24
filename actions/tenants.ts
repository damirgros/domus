"use server";

import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { parseFormData } from "@/lib/form-validators";

const tenantSchema = z.object({
  fullName: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().min(5),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
  propertyName: z.string().trim().min(2),
  propertyId: z.string().trim().min(1),
});

export async function getTenants() {
  try {
    return await prisma.tenant.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch tenants", error);
    throw new Error("Unable to load tenants.");
  }
}

export async function getTenantById(id: string) {
  try {
    return await prisma.tenant.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Failed to fetch tenant ${id}`, error);
    throw new Error("Unable to load tenant.");
  }
}

export async function createTenant(formData: FormData) {
  try {
    const data = parseFormData(formData, tenantSchema);

    await prisma.tenant.create({
      data,
    });

    revalidatePath("/tenants");
    redirect("/tenants", RedirectType.replace);
  } catch (error) {
    console.error("Failed to create tenant", error);
    throw new Error("Unable to create tenant.");
  }
}

export async function updateTenant(id: string, formData: FormData) {
  try {
    const data = parseFormData(formData, tenantSchema);

    await prisma.tenant.update({
      where: { id },
      data,
    });

    revalidatePath("/tenants");
    redirect("/tenants", RedirectType.replace);
  } catch (error) {
    console.error(`Failed to update tenant ${id}`, error);
    throw new Error("Unable to update tenant.");
  }
}

export async function deleteTenant(id: string) {
  try {
    await prisma.tenant.delete({ where: { id } });
    revalidatePath("/tenants");
    redirect("/tenants", RedirectType.replace);
  } catch (error) {
    console.error(`Failed to delete tenant ${id}`, error);
    throw new Error("Unable to delete tenant.");
  }
}
