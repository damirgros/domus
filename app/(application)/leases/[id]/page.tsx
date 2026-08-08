import { notFound } from "next/navigation";

import { getLeaseById } from "@/actions/leases";
import { getProperties } from "@/actions/properties";
import { getTenants } from "@/actions/tenants";
import LeaseEditForm from "@/components/ui/aplication/forms/edit/LeaseEditForm";

export default async function EditLeasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [lease, properties, tenants] = await Promise.all([
    getLeaseById(id),
    getProperties(),
    getTenants(),
  ]);

  if (!lease) {
    notFound();
  }

  return (
    <LeaseEditForm lease={lease} properties={properties} tenants={tenants} />
  );
}
