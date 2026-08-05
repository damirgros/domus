import { notFound } from "next/navigation";
import Link from "next/link";

import {
  deleteExpense,
  getExpenseById,
  updateExpense,
} from "@/actions/expenses";
import { getProperties } from "@/actions/properties";
import type { Property } from "@/types/property";

export default async function ExpenseEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const expense = await getExpenseById(id);

  if (!expense) {
    notFound();
  }

  const properties: Property[] = await getProperties();

  return (
    <main className="p-4 sm:p-6 lg:p-10">
      <div className="mx-auto rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Uredi trošak</h1>
            <p className="text-sm text-gray-500">
              Ažurirajte postojeći trošak.
            </p>
          </div>
          <form
            action={deleteExpense.bind(null, id)}
            className="mt-4 flex justify-start"
          >
            <button className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white active:text-black">
              Obriši
            </button>
          </form>
        </div>

        <form
          action={updateExpense.bind(null, id)}
          className="grid gap-4 md:grid-cols-2"
        >
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Naslov
            <input
              name="title"
              defaultValue={expense.title}
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Opis
            <textarea
              name="description"
              defaultValue={expense.description ?? ""}
              className="min-h-32 rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Iznos
            <input
              type="text"
              name="amount"
              defaultValue={String(expense.amount)}
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Kategorija
            <select
              name="category"
              defaultValue={expense.category}
              className="rounded-xl border border-gray-300 px-4 py-3"
            >
              <option value="REPAIR">POPRAVAK</option>
              <option value="UTILITIES">REŽIJE</option>
              <option value="TAX">POREZ</option>
              <option value="INSURANCE">OSIGURANJE</option>
              <option value="OTHER">DRUGO</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Naziv nekretnine
            <select
              name="propertyName"
              defaultValue={expense.propertyName}
              className="rounded-xl border border-gray-300 px-4 py-3"
            >
              {properties.map((property) => {
                return (
                  <option value={property.name} key={property.name}>
                    {property.name}
                  </option>
                );
              })}
            </select>
          </label>
          <div className="md:col-span-2 mt-2 flex justify-stretch">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-5">
              <Link
                href="/expenses"
                className="inline-flex items-center justify-center border border-gray-200 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 active:bg-gray-400"
              >
                Odustani
              </Link>
              <button className="rounded-xl bg-[#138d63] px-5 py-3 text-sm font-bold text-white active:text-black active:bg-gray-400">
                Spremi
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
