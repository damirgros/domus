import { notFound } from "next/navigation";

import { getPropertyById } from "@/actions/properties";

import PropertyEditForm from "@/components/ui/aplication/forms/PropertyEditForm";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return <PropertyEditForm property={property} />;
}
