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

function serializeLease<T extends { rentAmount: { toString(): string } }>(
  lease: T,
) {
  return {
    ...lease,
    rentAmount: lease.rentAmount.toString(),
  };
}

const leaseSchema = z.object({
  startDate: z
    .string()
    .trim()
    .min(1, { message: "Datum početka najma je obavezan." })
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Datum početka nije ispravan.",
    }),
  endDate: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? new Date(value) : null)),
  rentAmount: z
    .string()
    .trim()
    .min(1, { message: "Iznos najma je obavezan." })
    .refine((value) => !Number.isNaN(Number(value)), {
      message: "Iznos najma mora biti broj.",
    }),
  status: z
    .enum(["ACTIVE", "INACTIVE"], {
      message: "Odaberite status.",
    })
    .default("ACTIVE"),
  tenantName: z.string().trim().min(1, {
    message: "Ime stanara je obavezno.",
  }),
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

export async function getLeases() {
  const cookiesStore = await cookies();
  const sessionId = await cookiesStore.get("session")?.value;

  if (!sessionId) {
    throw new Error("No session found");
  }

  try {
    const leases = await prisma.lease.findMany({
      where: {
        property: {
          workspace: {
            sessionId,
          },
        },
      },
    });

    return leases.map(serializeLease);
  } catch (error) {
    console.error("Failed to fetch leases", error);
    throw new Error("Unable to load leases.");
  }
}

export async function getLeaseById(id: string) {
  try {
    const lease = await prisma.lease.findUnique({
      where: { id },
      include: { property: true },
    });

    return lease ? serializeLease(lease) : null;
  } catch (error) {
    console.error(`Failed to fetch lease ${id}`, error);
    throw new Error("Unable to load lease.");
  }
}

export async function createLease(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = leaseSchema.safeParse({
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    rentAmount: formData.get("rentAmount"),
    status: formData.get("status"),
    tenantName: formData.get("tenantName"),
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

    const tenant = await prisma.tenant.findFirst({
      where: { fullName: result.data.tenantName },
    });

    if (!tenant) {
      return {
        success: false,
        errors: {
          tenantName: ["Odabrani stanar nije pronađen."],
        },
      };
    }

    await prisma.lease.create({
      data: {
        rentAmount: Number(result.data.rentAmount),
        status: result.data.status,
        tenantName: result.data.tenantName,
        tenantId: tenant.id,
        propertyName: property.name,
        propertyId: property.id,
        startDate: new Date(result.data.startDate),
        endDate: result.data.endDate,
      },
    });
  } catch (error) {
    console.error("Failed to create lease", error);
    return {
      success: false,
      message: "Nije moguće kreirati najam.",
    };
  }

  revalidatePath("/leases");
  redirect("/leases", RedirectType.replace);
}

export async function updateLease(
  id: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = leaseSchema.safeParse({
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    rentAmount: formData.get("rentAmount"),
    status: formData.get("status"),
    tenantName: formData.get("tenantName"),
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

    const tenant = await prisma.tenant.findFirst({
      where: { fullName: result.data.tenantName },
    });

    if (!tenant) {
      return {
        success: false,
        errors: {
          tenantName: ["Odabrani stanar nije pronađen."],
        },
      };
    }

    await prisma.lease.update({
      where: { id },
      data: {
        rentAmount: Number(result.data.rentAmount),
        status: result.data.status,
        tenantName: result.data.tenantName,
        propertyName: property.name,
        tenantId: tenant.id,
        propertyId: property.id,
        startDate: new Date(result.data.startDate),
        endDate: result.data.endDate,
      },
    });
  } catch (error) {
    console.error(`Failed to update lease ${id}`, error);
    return {
      success: false,
      message: "Nije moguće urediti najam.",
    };
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
