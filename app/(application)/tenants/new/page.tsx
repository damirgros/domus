import TenantCreateForm from "@/components/ui/aplication/forms/create/TenantCreateForm";
import { getProperties } from "@/actions/properties";

export default async function TenantCreatePage() {
  const properties = await getProperties();

  return <TenantCreateForm properties={properties} />;
}
