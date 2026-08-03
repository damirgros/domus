"use client";

import Header from "@/components/ui/aplication/header/Header";
import SearchBar from "@/components/ui/aplication/searchbar/SearchBar";
import Table from "@/components/ui/aplication/table/Table";
import Pagination from "@/components/ui/aplication/pagination/Pagination";

import { getTenants } from "@/actions/tenants";

import type { Tenant } from "@/types/tenant";
import type { Column } from "@/types/column";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Tenants() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTenants() {
      try {
        const result = await getTenants();
        setTenants(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    void loadTenants();
  }, []);

  const PAGE_SIZE = 5;
  const start = (page - 1) * PAGE_SIZE;

  const normalizedSearch = search.toLowerCase().trim();

  const filteredTenants = tenants.filter((tenant) => {
    const searchableText = [tenant.fullName, tenant.propertyName]
      .join(" ")
      .toLowerCase();

    return (
      searchableText.includes(normalizedSearch) &&
      (!selectedProperty || tenant.propertyName === selectedProperty)
    );
  });
  const filteredPaginatedTenants = filteredTenants.slice(
    start,
    start + PAGE_SIZE,
  );

  const totalPages = Math.max(1, Math.ceil(filteredTenants.length / PAGE_SIZE));

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
        value === "ACTIVE" ? "🟢 Aktivan" : "🔴 Neaktivan",
    },
  ];

  const properties = useMemo(
    () => tenants.map((tenant) => tenant.propertyName),
    [tenants],
  );

  return (
    <section>
      <Header
        title="Stanari"
        description="Upravljajte informacijama o svojim stanarima"
        buttonText="Dodaj Stanara"
        buttonHref="/tenants/new"
      />
      <div className="mx-3 rounded-2xl border-4 border-gray-200 sm:mx-6 lg:mx-10">
        <SearchBar
          value={search}
          handleChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          placeholder="Pretraži stanare..."
          selectedProperty={selectedProperty}
          handleSelectedProperty={setSelectedProperty}
          properties={properties}
          handlePageChange={setPage}
        />
        <Table
          data={filteredPaginatedTenants}
          columns={columns}
          onRowClick={(row) => router.push(`/tenants/${row.id}`)}
          isLoading={isLoading}
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePageChange={setPage}
        />
      </div>
    </section>
  );
}
