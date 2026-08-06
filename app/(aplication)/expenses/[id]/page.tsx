import { notFound } from "next/navigation";

import { getExpenseById } from "@/actions/expenses";
import { getProperties } from "@/actions/properties";
import ExpenseEditForm from "@/components/ui/aplication/forms/ExpenseEditForm";

export default async function EditExpensePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [expense, properties] = await Promise.all([
    getExpenseById(id),
    getProperties(),
  ]);

  if (!expense) {
    notFound();
  }

  return <ExpenseEditForm expense={expense} properties={properties} />;
}
