import { createLease } from "@/actions/leases";
import Link from "next/link";

export default function LeaseCreatePage() {
  return (
    <main className="p-4 sm:p-6 lg:p-10">
      <div className="mx-auto rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Novi najam</h1>
            <p className="text-sm text-gray-500">
              Kreirajte novi ugovor o najmu.
            </p>
          </div>
        </div>

        <form action={createLease} className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Početak
            <input
              type="date"
              name="startDate"
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Kraj
            <input
              type="date"
              name="endDate"
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Iznos najma
            <input
              type="text"
              name="rentAmount"
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Status
            <select
              name="status"
              defaultValue="ACTIVE"
              className="rounded-xl border border-gray-300 px-4 py-3"
            >
              <option value="ACTIVE">AKTIVAN</option>
              <option value="INACTIVE">INAKTIVAN</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Ime stanara
            <input
              name="tenantName"
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Naziv nekretnine
            <input
              name="propertyName"
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>

          <div className="md:col-span-2 mt-2 flex justify-stretch">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-5">
              <Link
                href="/leases"
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
