import { createMaintenanceTicket } from "@/actions/maintenance";
import Link from "next/link";

export default function MaintenanceCreatePage() {
  return (
    <main className="p-10">
      <div className="mx-auto rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Novi zahtev za održavanje
            </h1>
            <p className="text-sm text-gray-500">
              Zabeležite novi zahtev za održavanje.
            </p>
          </div>
        </div>

        <form
          action={createMaintenanceTicket}
          className="grid gap-4 md:grid-cols-2"
        >
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Naslov
            <input
              name="title"
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Opis
            <textarea
              name="description"
              required
              className="min-h-32 rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Status
            <select
              name="status"
              defaultValue="OPEN"
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
              defaultValue="LOW"
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
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <div className="md:col-span-2 mt-2 flex justify-end">
            <div className="flex flex-row gap-5">
              <Link
                href="/maintanance"
                className="inline-flex items-center justify-center border border-gray-200 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 active:bg-gray-400"
              >
                Odustani
              </Link>
              <button className="rounded-xl bg-[#138d63] px-5 py-3 text-sm font-bold text-white active:bg-gray-400">
                Spremi
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
