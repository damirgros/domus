"use client";

import Header from "@/components/ui/aplication/header/Header";
import SearchBar from "@/components/ui/aplication/searchbar/SearchBar";
import Table from "@/components/ui/aplication/table/Table";
import Pagination from "@/components/ui/aplication/pagination/Pagination";

import type { Tenant } from "@/types/tenant";
import type { Column } from "@/types/column";

import { useState } from "react";

export default function Tenants() {
  const [search, setSearch] = useState("");

  const tenants: Tenant[] = getTenants();
  const filteredTenants = tenants.filter((tenant) =>
    tenant.fullName.toLowerCase().includes(search.toLowerCase()),
  );

  const columns: Column<Tenant>[] = [
    {
      key: "fullName",
      title: "Ime i prezime",
    },
    {
      key: "email",
      title: "Email",
    },
    {
      key: "phone",
      title: "Broj telefona",
    },
    {
      key: "propertyName",
      title: "Nekretnina",
    },
    {
      key: "status",
      title: "Status",
      render: (value: string) =>
        value === "ACTIVE" ? "🟢 Aktivan" : "🔴 Inaktivan",
    },
  ];

  return (
    <section>
      <Header
        title="Stanari"
        description="Upravljajte informacijama o svojim stanarima"
        buttonText="Dodaj Stanara"
      />
      <SearchBar
        value={search}
        handleChange={setSearch}
        placeholder="Pretraži stanare..."
      />
      <Table data={filteredTenants} columns={columns} />
      <Pagination />
    </section>
  );
}
