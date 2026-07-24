import { createLease } from "@/actions/leases";

export default function LeaseCreatePage() {
  return (
    <main className="p-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Novi najam</h1>
            <p className="text-sm text-gray-500">
              Kreirajte novi ugovor o najmu.
            </p>
          </div>
          <a
            href="/leases"
            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Nazad
          </a>
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
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Tenant ID
            <input
              name="tenantId"
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Property ID
            <input
              name="propertyId"
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>

          <div className="md:col-span-2 mt-2 flex justify-end">
            <button className="rounded-xl bg-[#138d63] px-5 py-3 text-sm font-bold text-white">
              Sačuvaj najam
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
