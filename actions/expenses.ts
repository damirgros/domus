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

function serializeExpense<T extends { amount: { toString(): string } }>(
  expense: T,
) {
  return {
    ...expense,
    amount: expense.amount.toString(),
  };
}

const expenseSchema = z.object({
  title: z.string().trim().min(2, {
    message: "Naslov mora imati barem 2 znaka.",
  }),
  description: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? value : null)),
  amount: z
    .string()
    .trim()
    .min(1, { message: "Iznos je obavezan." })
    .refine((value) => !Number.isNaN(Number(value)), {
      message: "Iznos mora biti broj.",
    }),
  propertyName: z.string().trim().min(2, {
    message: "Naziv nekretnine je obavezan.",
  }),
  category: z.enum(["REPAIR", "UTILITIES", "TAX", "INSURANCE", "OTHER"], {
    message: "Odaberite kategoriju.",
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

export async function getExpenses() {
  const cookieStore = await cookies();
  const sessionId = await cookieStore.get("session")?.value;

  if (!sessionId) {
    throw new Error("No session found");
  }

  try {
    const expenses = await prisma.expense.findMany({
      where: {
        property: {
          workspace: {
            sessionId,
          },
        },
      },
    });

    return expenses.map(serializeExpense);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to load expenses.");
  }
}

export async function getExpenseById(id: string) {
  try {
    const expense = await prisma.expense.findUnique({
      where: { id },
    });
    return expense ? serializeExpense(expense) : null;
  } catch (error) {
    console.error(`Failed to fetch expense ${id}`, error);
    throw new Error("Unable to load expense.");
  }
}

export async function createExpense(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = expenseSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    amount: formData.get("amount"),
    propertyName: formData.get("propertyName"),
    category: formData.get("category"),
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

    await prisma.expense.create({
      data: {
        ...result.data,
        amount: Number(result.data.amount),
        propertyId: property.id,
      },
    });
  } catch (error) {
    console.error("Failed to create expense", error);
    return {
      success: false,
      message: "Nije moguće kreirati trošak.",
    };
  }

  revalidatePath("/expenses");
  redirect("/expenses", RedirectType.replace);
}

export async function updateExpense(
  id: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = expenseSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    amount: formData.get("amount"),
    propertyName: formData.get("propertyName"),
    category: formData.get("category"),
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

    await prisma.expense.update({
      where: { id },
      data: {
        ...result.data,
        amount: Number(result.data.amount),
        propertyId: property.id,
      },
    });
  } catch (error) {
    console.error(`Failed to update expense ${id}`, error);
    return {
      success: false,
      message: "Nije moguće urediti trošak.",
    };
  }

  revalidatePath("/expenses");
  redirect("/expenses", RedirectType.replace);
}

export async function deleteExpense(id: string) {
  try {
    await prisma.expense.delete({ where: { id } });
  } catch (error) {
    console.error(`Failed to delete expense ${id}`, error);
    throw new Error("Unable to delete expense.");
  }

  revalidatePath("/expenses");
  redirect("/expenses", RedirectType.replace);
}
