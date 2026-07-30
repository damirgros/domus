import { notFound } from "next/navigation";

import {
  deleteProperty,
  getPropertyById,
  updateProperty,
} from "@/actions/properties";

export default async function PropertyEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <main className="p-10">
      <div className="mx-auto rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Uredi nekretninu
            </h1>
            <p className="text-sm text-gray-500">
              Ažurirajte podatke o nekretnini.
            </p>
          </div>
          <a
            href="/overview"
            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Nazad
          </a>
        </div>

        <form
          action={updateProperty.bind(null, id)}
          className="grid gap-4 md:grid-cols-2"
        >
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Naziv
            <input
              name="name"
              defaultValue={property.name}
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Adresa
            <input
              name="address"
              defaultValue={property.address}
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Grad
            <input
              name="city"
              defaultValue={property.city}
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Poštanski broj
            <input
              name="postalCode"
              defaultValue={property.postalCode ?? ""}
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Veličina
            <input
              type="number"
              step="0.1"
              name="size"
              defaultValue={property.size ?? ""}
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Sobe
            <input
              type="number"
              name="rooms"
              defaultValue={property.rooms ?? ""}
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Vlasnik
            <input
              name="owner"
              defaultValue={property.owner}
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>

          <div className="md:col-span-2 mt-2 flex justify-end">
            <button className="rounded-xl bg-[#138d63] px-5 py-3 text-sm font-bold text-white">
              Sačuvaj izmene
            </button>
          </div>
        </form>

        <form
          action={deleteProperty.bind(null, id)}
          className="mt-4 flex justify-start"
        >
          <button className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white">
            Obriši
          </button>
        </form>
      </div>
    </main>
  );
}
