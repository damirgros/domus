import { notFound } from "next/navigation";

import { getProperties } from "@/actions/properties";
import { getTenantById } from "@/actions/tenants";
import TenantEditForm from "@/components/ui/aplication/forms/TenantEditForm";

export default async function EditTenantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [tenant, properties] = await Promise.all([
    getTenantById(id),
    getProperties(),
  ]);

  if (!tenant) {
    notFound();
  }

  return <TenantEditForm tenant={tenant} properties={properties} />;
}
