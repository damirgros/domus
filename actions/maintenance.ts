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

const maintenanceTicketSchema = z.object({
  title: z.string().trim().min(2, {
    message: "Naslov mora imati barem 2 znaka.",
  }),
  description: z.string().trim().min(2, {
    message: "Opis mora imati barem 2 znaka.",
  }),
  status: z
    .enum(["OPEN", "IN_PROGRESS", "COMPLETED"], {
      message: "Odaberite status.",
    })
    .default("OPEN"),
  priority: z
    .enum(["HIGH", "MEDIUM", "LOW"], {
      message: "Odaberite prioritet.",
    })
    .default("LOW"),
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

export async function createMaintenanceTicket(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = maintenanceTicketSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    priority: formData.get("priority"),
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

    await prisma.maintenanceTicket.create({
      data: {
        ...result.data,
        propertyId: property.id,
      },
    });
  } catch (error) {
    console.error("Failed to create maintenance ticket", error);
    return {
      success: false,
      message: "Nije moguće kreirati zahtjev za održavanje.",
    };
  }

  revalidatePath("/maintanance");
  redirect("/maintanance", RedirectType.replace);
}

export async function updateMaintenanceTicket(
  id: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = maintenanceTicketSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    priority: formData.get("priority"),
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

    await prisma.maintenanceTicket.update({
      where: { id },
      data: {
        ...result.data,
        propertyId: property.id,
      },
    });
  } catch (error) {
    console.error(`Failed to update maintenance ticket ${id}`, error);
    return {
      success: false,
      message: "Nije moguće urediti zahtjev za održavanje.",
    };
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
