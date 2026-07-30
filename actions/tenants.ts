"use server";

import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { parseFormData } from "@/utils/form-validators";

const tenantSchema = z.object({
  fullName: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().min(5),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
  propertyName: z.string().trim().min(2),
});

export async function getTenants() {
  const cookieStore = await cookies();
  const sessionId = await cookieStore.get("session")?.value;

  if (!sessionId) {
    throw new Error("No session found");
  }

  try {
    return await prisma.tenant.findMany({
      where: {
        property: {
          workspace: {
            sessionId,
          },
        },
      },
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

    const property = await prisma.property.findFirst({
      where: { name: data.propertyName },
    });

    if (property) {
      await prisma.tenant.create({
        data: {
          ...data,
          propertyId: property.id,
        },
      });
    } else {
      throw new Error("No property found to create a new tenant.");
    }
  } catch (error) {
    console.error("Failed to create tenant", error);
    throw new Error("Unable to create tenant.");
  }
  revalidatePath("/tenants");
  redirect("/tenants", RedirectType.replace);
}

export async function updateTenant(id: string, formData: FormData) {
  try {
    const data = parseFormData(formData, tenantSchema);

    await prisma.tenant.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error(`Failed to update tenant ${id}`, error);
    throw new Error("Unable to update tenant.");
  }
  revalidatePath("/tenants");
  redirect("/tenants", RedirectType.replace);
}

export async function deleteTenant(id: string) {
  try {
    await prisma.tenant.delete({ where: { id } });
  } catch (error) {
    console.error(`Failed to delete tenant ${id}`, error);
    throw new Error("Unable to delete tenant.");
  }
  revalidatePath("/tenants");
  redirect("/tenants", RedirectType.replace);
}
