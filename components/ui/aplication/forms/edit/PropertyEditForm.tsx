"use client";
import { useActionState, useState } from "react";
import Link from "next/link";
import { deleteProperty, updateProperty } from "@/actions/properties";
import type { Property } from "@/types/property";

export default function PropertyEditForm({ property }: { property: Property }) {
  const [state, action] = useActionState(
    updateProperty.bind(null, property.id),
    {
      success: false,
      errors: {},
    },
  );
  const [values, setValues] = useState({
    name: property.name,
    address: property.address,
    city: property.city,
    postalCode: property.postalCode ?? "",
    size: property.size?.toString() ?? "",
    rooms: property.rooms?.toString() ?? "",
    owner: property.owner,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <main className="p-4 sm:p-6 lg:p-10">
      <div className="mx-auto rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Uredi nekretninu
            </h1>
            <p className="text-sm text-gray-500">
              Ažurirajte podatke o nekretnini.
            </p>
          </div>
          <form
            action={deleteProperty.bind(null, property.id)}
            className="mt-4 flex justify-start"
          >
            <button className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white active:text-black">
              Obriši
            </button>
          </form>
        </div>

        <form action={action} className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Naziv
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          {state.errors?.name && (
            <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
          )}
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Adresa
            <input
              name="address"
              value={values.address}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          {state.errors?.address && (
            <p className="text-red-500 text-sm">{state.errors.address[0]}</p>
          )}
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Grad
            <input
              name="city"
              value={values.city}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          {state.errors?.city && (
            <p className="text-red-500 text-sm">{state.errors.city[0]}</p>
          )}
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Poštanski broj
            <input
              name="postalCode"
              value={values.postalCode}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          {state.errors?.postalCode && (
            <p className="text-red-500 text-sm">{state.errors.postalCode[0]}</p>
          )}
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Veličina
            <input
              type="number"
              step="0.1"
              name="size"
              value={values.size}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          {state.errors?.size && (
            <p className="text-red-500 text-sm">{state.errors.size[0]}</p>
          )}
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Sobe
            <input
              type="number"
              name="rooms"
              value={values.rooms}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          {state.errors?.rooms && (
            <p className="text-red-500 text-sm">{state.errors.rooms[0]}</p>
          )}
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Vlasnik
            <input
              name="owner"
              value={values.owner}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          {state.errors?.owner && (
            <p className="text-red-500 text-sm">{state.errors.owner[0]}</p>
          )}
          <div className="md:col-span-2 mt-2 flex justify-stretch">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-5">
              <Link
                href="/properties"
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
