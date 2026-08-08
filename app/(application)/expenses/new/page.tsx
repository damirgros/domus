import ExpenseCreateForm from "@/components/ui/aplication/forms/create/ExpenseCreateForm";
import { getProperties } from "@/actions/properties";

export default async function ExpenseCreatePage() {
  const properties = await getProperties();

  return <ExpenseCreateForm properties={properties} />;
}
