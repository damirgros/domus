import MaintenanceCreateForm from "@/components/ui/aplication/forms/create/MaintenanceCreateForm";
import { getProperties } from "@/actions/properties";

export default async function MaintenanceCreatePage() {
  const properties = await getProperties();

  return <MaintenanceCreateForm properties={properties} />;
}
