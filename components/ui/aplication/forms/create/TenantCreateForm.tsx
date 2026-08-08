"use client";

import { createTenant } from "@/actions/tenants";
import type { Property } from "@/types/property";
import Link from "next/link";
import { useActionState, useState, type ChangeEvent } from "react";

export default function TenantCreatePage({
  properties,
}: {
  properties: Property[];
}) {
  const [state, formAction] = useActionState(createTenant, {
    success: false,
    errors: {},
  });
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    status: "ACTIVE",
    propertyName: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="p-4 sm:p-6 lg:p-10">
      <div className="mx-auto rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Novi stanar</h1>
            <p className="text-sm text-gray-500">
              Unesite podatke za novog stanara.
            </p>
          </div>
        </div>

        <form action={formAction} className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Ime i prezime
            <input
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          {state.errors?.fullName && (
            <p className="text-red-500 text-sm">{state.errors.fullName[0]}</p>
          )}
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Email
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          {state.errors?.email && (
            <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
          )}
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Telefon
            <input
              name="phone"
              value={values.phone}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
          {state.errors?.phone && (
            <p className="text-red-500 text-sm">{state.errors.phone[0]}</p>
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
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Status
            <select
              name="status"
              value={values.status}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-3"
            >
              <option value="ACTIVE">AKTIVAN</option>
              <option value="INACTIVE">INAKTIVAN</option>
            </select>
          </label>
          {state.errors?.status && (
            <p className="text-red-500 text-sm">{state.errors.status[0]}</p>
          )}
          <div className="md:col-span-2 mt-2 flex justify-stretch">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-5">
              <Link
                href="/tenants"
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
