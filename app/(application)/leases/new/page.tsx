import LeaseCreateForm from "@/components/ui/aplication/forms/create/LeaseCreateForm";
import { getProperties } from "@/actions/properties";
import { getTenants } from "@/actions/tenants";

export default async function LeaseCreatePage() {
  const [properties, tenants] = await Promise.all([
    getProperties(),
    getTenants(),
  ]);

  return <LeaseCreateForm properties={properties} tenants={tenants} />;
}
