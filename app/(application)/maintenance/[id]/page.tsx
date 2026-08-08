import { notFound } from "next/navigation";

import { getMaintenanceTicketById } from "@/actions/maintenance";
import { getProperties } from "@/actions/properties";
import MaintenanceEditForm from "@/components/ui/aplication/forms/edit/MaintenanceEditForm";

export default async function EditMaintenancePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [ticket, properties] = await Promise.all([
    getMaintenanceTicketById(id),
    getProperties(),
  ]);

  if (!ticket) {
    notFound();
  }

  return <MaintenanceEditForm ticket={ticket} properties={properties} />;
}
