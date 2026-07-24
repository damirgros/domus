import { notFound } from "next/navigation";

import {
  deleteMaintenanceTicket,
  getMaintenanceTicketById,
  updateMaintenanceTicket,
} from "@/actions/maintenance";

export default async function MaintenanceEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ticket = await getMaintenanceTicketById(id);

  if (!ticket) {
    notFound();
  }

  return (
    <main className="p-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Uredi zahtev</h1>
            <p className="text-sm text-gray-500">
              Ažurirajte postojeći zahtev za održavanje.
            </p>
          </div>
          <a
            href="/maintanance"
            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Nazad
          </a>
        </div>

        <form
          action={updateMaintenanceTicket.bind(null, id)}
          className="grid gap-4 md:grid-cols-2"
        >
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Naslov
            <input
              name="title"
              defaultValue={ticket.title}
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Opis
            <textarea
              name="description"
              defaultValue={ticket.description}
              required
              className="min-h-32 rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Status
            <select
              name="status"
              defaultValue={ticket.status}
              className="rounded-xl border border-gray-300 px-4 py-3"
            >
              <option value="OPEN">OPEN</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Prioritet
            <select
              name="priority"
              defaultValue={ticket.priority}
              className="rounded-xl border border-gray-300 px-4 py-3"
            >
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Naziv nekretnine
            <input
              name="propertyName"
              defaultValue={ticket.propertyName}
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Property ID
            <input
              name="propertyId"
              defaultValue={ticket.propertyId}
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
          action={deleteMaintenanceTicket.bind(null, id)}
          className="mt-4 flex justify-end"
        >
          <button className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white">
            Obriši
          </button>
        </form>
      </div>
    </main>
  );
}
