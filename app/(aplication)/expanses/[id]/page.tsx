import { notFound } from "next/navigation";
import Link from "next/link";

import {
  deleteExpense,
  getExpenseById,
  updateExpense,
} from "@/actions/expenses";

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

  return (
    <main className="p-10">
      <div className="mx-auto rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
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
              <option value="REPAIR">REPAIR</option>
              <option value="UTILITIES">UTILITIES</option>
              <option value="TAX">TAX</option>
              <option value="INSURANCE">INSURANCE</option>
              <option value="OTHER">OTHER</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Naziv nekretnine
            <input
              name="propertyName"
              defaultValue={expense.propertyName}
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          <div className="md:col-span-2 mt-2 flex justify-end">
            <div className="flex flex-row gap-5">
              <Link
                href="/expanses"
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
