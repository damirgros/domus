"use server";

import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { parseFormData } from "@/utils/form-validators";

import { cookies } from "next/headers";

const expenseSchema = z.object({
  title: z.string().trim().min(2),
  description: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? value : null)),
  amount: z.string().trim().min(1),
  propertyName: z.string().trim().min(2),
  category: z.enum(["REPAIR", "UTILITIES", "TAX", "INSURANCE", "OTHER"]),
});

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

    return expenses;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to load expenses.");
  }
}

export async function getExpenseById(id: string) {
  try {
    return await prisma.expense.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Failed to fetch expense ${id}`, error);
    throw new Error("Unable to load expense.");
  }
}

export async function createExpense(formData: FormData) {
  try {
    const data = parseFormData(formData, expenseSchema);

    const property = await prisma.property.findFirst({
      where: { name: data.propertyName },
    });

    if (!property) {
      throw new Error("No property found to create a new expense.");
    }

    await prisma.expense.create({
      data: {
        ...data,
        propertyId: property.id,
      },
    });
  } catch (error) {
    console.error("Failed to create expense", error);
    throw new Error("Unable to create expense.");
  }

  revalidatePath("/expanses");
  redirect("/expanses", RedirectType.replace);
}

export async function updateExpense(id: string, formData: FormData) {
  try {
    const data = parseFormData(formData, expenseSchema);

    const property = await prisma.property.findFirst({
      where: { name: data.propertyName },
    });

    if (!property) {
      throw new Error("No property found to update the expense.");
    }

    await prisma.expense.update({
      where: { id },
      data: {
        ...data,
        propertyId: property.id,
      },
    });
  } catch (error) {
    console.error(`Failed to update expense ${id}`, error);
    throw new Error("Unable to update expense.");
  }

  revalidatePath("/expanses");
  redirect("/expanses", RedirectType.replace);
}

export async function deleteExpense(id: string) {
  try {
    await prisma.expense.delete({ where: { id } });
  } catch (error) {
    console.error(`Failed to delete expense ${id}`, error);
    throw new Error("Unable to delete expense.");
  }

  revalidatePath("/expanses");
  redirect("/expanses", RedirectType.replace);
}
