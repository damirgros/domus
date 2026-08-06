"use server";

import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

import type { PropertyFormState } from "@/types/property";

const propertySchema = z.object({
  name: z.string().trim().min(2, {
    message: "Naziv mora imati barem 2 znaka.",
  }),
  address: z.string().trim().min(2, {
    message: "Adresa mora imati barem 2 znaka.",
  }),
  city: z.string().trim().min(2, {
    message: "Grad mora imati barem 2 znaka.",
  }),
  postalCode: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? value : null)),
  size: z
    .string()
    .optional()
    .refine((value) => !value || !Number.isNaN(Number(value)), {
      message: "Veličina mora biti broj.",
    })
    .transform((value) => (value ? Number(value) : null)),
  rooms: z
    .string()
    .optional()
    .refine((value) => !value || !Number.isNaN(Number(value)), {
      message: "Broj soba mora biti broj.",
    })
    .transform((value) => (value ? Number(value) : null)),
  owner: z.string().trim().min(2, {
    message: "Vlasnik mora imati barem 2 znaka.",
  }),
});

export async function getProperties() {
  const cookieStore = await cookies();
  const sessionId = await cookieStore.get("session")?.value;

  if (!sessionId) {
    throw new Error("No session found");
  }

  try {
    return await prisma.property.findMany({
      where: {
        workspace: {
          sessionId,
        },
      },
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

export async function createProperty(
  prevState: PropertyFormState,
  formData: FormData,
): Promise<PropertyFormState> {
  const sessionId = (await cookies()).get("session")?.value;

  if (!sessionId) {
    console.error("Missing session id");
    throw new Error("Unauthorized");
  }

  const result = propertySchema.safeParse({
    name: formData.get("name"),
    address: formData.get("address"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode"),
    size: formData.get("size"),
    rooms: formData.get("rooms"),
    owner: formData.get("owner"),
  });

  if (!result.success) {
    return {
      success: false,
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  try {
    const workspace = await prisma.workspace.findUnique({
      where: {
        sessionId,
      },
    });

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    const existingProperty = await prisma.property.findFirst({
      where: {
        name: result.data.name,
        workspaceId: workspace.id,
      },
    });

    if (existingProperty) {
      return {
        success: false,
        errors: {
          name: ["Nekretnina s tim imenom već postoji."],
        },
      };
    }

    await prisma.property.create({
      data: {
        ...result.data,
        workspaceId: workspace.id,
      },
    });
  } catch (error) {
    console.error("Failed to create property", error);

    return {
      success: false,
      message: "Unable to create property.",
    };
  }

  revalidatePath("/properties");
  redirect("/properties");
}

export async function updateProperty(
  id: string,
  prevState: PropertyFormState,
  formData: FormData,
) {
  const sessionId = (await cookies()).get("session")?.value;

  if (!sessionId) {
    console.error("Missing session id");
    throw new Error("Unauthorized");
  }

  const result = propertySchema.safeParse({
    name: formData.get("name"),
    address: formData.get("address"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode"),
    size: formData.get("size"),
    rooms: formData.get("rooms"),
    owner: formData.get("owner"),
  });

  if (!result.success) {
    return {
      success: false,
      errors: z.flattenError(result.error).fieldErrors,
    };
  }
  try {
    await prisma.property.update({
      where: { id },
      data: result.data,
    });
  } catch (error) {
    console.error("Failed to update property", error);

    return {
      success: false,
      message: "Unable to update property.",
    };
  }
  revalidatePath("/properties");
  redirect("/properties", RedirectType.replace);
}

export async function deleteProperty(id: string) {
  try {
    await prisma.property.delete({ where: { id } });
  } catch (error) {
    console.error(`Failed to delete property ${id}`, error);
    throw new Error("Unable to delete property.");
  }
  revalidatePath("/properties");
  redirect("/properties", RedirectType.replace);
}
