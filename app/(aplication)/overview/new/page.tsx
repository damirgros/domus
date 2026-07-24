import { createProperty } from "@/actions/properties";

export default function PropertyCreatePage() {
  return (
    <main className="p-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Nova nekretnina
            </h1>
            <p className="text-sm text-gray-500">
              Dodajte novu nekretninu u sistem.
            </p>
          </div>
          <a
            href="/overview"
            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Nazad
          </a>
        </div>

        <form action={createProperty} className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Naziv
            <input
              name="name"
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Adresa
            <input
              name="address"
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Grad
            <input
              name="city"
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Poštanski broj
            <input
              name="postalCode"
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Veličina
            <input
              type="number"
              step="0.1"
              name="size"
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Sobe
            <input
              type="number"
              name="rooms"
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Vlasnik
            <input
              name="owner"
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Workspace ID
            <input
              name="workspaceId"
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>

          <div className="md:col-span-2 mt-2 flex justify-end">
            <button className="rounded-xl bg-[#138d63] px-5 py-3 text-sm font-bold text-white">
              Sačuvaj nekretninu
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
