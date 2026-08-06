"use server";

import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

const tenantSchema = z.object({
  fullName: z.string().trim().min(2, {
    message: "Ime i prezime mora imati barem 2 znaka.",
  }),
  email: z.string().trim().email({
    message: "Unesite ispravnu e-mail adresu.",
  }),
  phone: z.string().trim().min(5, {
    message: "Telefon mora imati barem 5 znakova.",
  }),
  status: z
    .enum(["ACTIVE", "INACTIVE"], {
      message: "Odaberite status.",
    })
    .default("ACTIVE"),
  propertyName: z.string().trim().min(2, {
    message: "Naziv nekretnine je obavezan.",
  }),
});

async function getWorkspaceId() {
  const sessionId = (await cookies()).get("session")?.value;

  if (!sessionId) {
    throw new Error("Unauthorized");
  }

  const workspace = await prisma.workspace.findUnique({
    where: { sessionId },
  });

  if (!workspace) {
    throw new Error("Workspace not found");
  }

  return workspace.id;
}

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

export async function createTenant(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = tenantSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    status: formData.get("status"),
    propertyName: formData.get("propertyName"),
  });

  if (!result.success) {
    return {
      success: false,
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  try {
    const workspaceId = await getWorkspaceId();
    const property = await prisma.property.findFirst({
      where: {
        name: result.data.propertyName,
        workspaceId,
      },
    });

    if (!property) {
      return {
        success: false,
        errors: {
          propertyName: ["Odabrana nekretnina nije pronađena."],
        },
      };
    }

    await prisma.tenant.create({
      data: {
        ...result.data,
        propertyId: property.id,
      },
    });
  } catch (error) {
    console.error("Failed to create tenant", error);
    return {
      success: false,
      message: "Nije moguće kreirati stanara.",
    };
  }

  revalidatePath("/tenants");
  redirect("/tenants", RedirectType.replace);
}

export async function updateTenant(
  id: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = tenantSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    status: formData.get("status"),
    propertyName: formData.get("propertyName"),
  });

  if (!result.success) {
    return {
      success: false,
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  try {
    const workspaceId = await getWorkspaceId();
    const property = await prisma.property.findFirst({
      where: {
        name: result.data.propertyName,
        workspaceId,
      },
    });

    if (!property) {
      return {
        success: false,
        errors: {
          propertyName: ["Odabrana nekretnina nije pronađena."],
        },
      };
    }

    await prisma.tenant.update({
      where: { id },
      data: {
        ...result.data,
        propertyId: property.id,
      },
    });
  } catch (error) {
    console.error(`Failed to update tenant ${id}`, error);
    return {
      success: false,
      message: "Nije moguće urediti stanara.",
    };
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
