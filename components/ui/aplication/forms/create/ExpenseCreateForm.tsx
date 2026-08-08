"use client";

import { createExpense } from "@/actions/expenses";
import Link from "next/link";
import { useActionState, useState, type ChangeEvent } from "react";
import type { Property } from "@/types/property";

export default function ExpenseCreateForm({
  properties,
}: {
  properties: Property[];
}) {
  const [state, formAction] = useActionState(createExpense, {
    success: false,
    errors: {},
  });
  const [values, setValues] = useState({
    title: "",
    description: "",
    amount: "",
    category: "OTHER",
    propertyName: "",
  });

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="p-4 sm:p-6 lg:p-10">
      <div className="mx-auto rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Novi trošak</h1>
            <p className="text-sm text-gray-500">
              Dodajte novi trošak u evidenciju.
            </p>
          </div>
        </div>

        <form action={formAction} className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Naslov
            <input
              name="title"
              value={values.title}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          {state.errors?.title && (
            <p className="text-red-500 text-sm">{state.errors.title[0]}</p>
          )}
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Opis
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              className="min-h-32 rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          {state.errors?.description && (
            <p className="text-red-500 text-sm">
              {state.errors.description[0]}
            </p>
          )}
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Iznos
            <input
              type="text"
              name="amount"
              value={values.amount}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          {state.errors?.amount && (
            <p className="text-red-500 text-sm">{state.errors.amount[0]}</p>
          )}
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Kategorija
            <select
              name="category"
              value={values.category}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-3"
            >
              <option value="REPAIR">POPRAVAK</option>
              <option value="UTILITIES">REŽIJE</option>
              <option value="TAX">POREZ</option>
              <option value="INSURANCE">OSIGURANJE</option>
              <option value="OTHER">DRUGO</option>
            </select>
          </label>
          {state.errors?.category && (
            <p className="text-red-500 text-sm">{state.errors.category[0]}</p>
          )}
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Naziv nekretnine
            <select
              name="propertyName"
              value={values.propertyName}
              onChange={handleChange}
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
          {state.errors?.propertyName && (
            <p className="text-red-500 text-sm">
              {state.errors.propertyName[0]}
            </p>
          )}
          <div className="md:col-span-2 mt-2 flex justify-stretch">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-5">
              <Link
                href="/expenses"
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
