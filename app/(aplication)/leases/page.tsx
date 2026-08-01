"use client";

import Header from "@/components/ui/aplication/header/Header";
import SearchBar from "@/components/ui/aplication/searchbar/SearchBar";
import Table from "@/components/ui/aplication/table/Table";
import Pagination from "@/components/ui/aplication/pagination/Pagination";

import { getLeases } from "@/actions/leases";

import type { Lease } from "@/types/lease";
import type { Column } from "@/types/column";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import formatDate from "@/utils/format-date";

export default function Leases() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [leases, setLeases] = useState<Lease[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLeases() {
      try {
        const result = await getLeases();
        setLeases(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    void loadLeases();
  }, []);

  const PAGE_SIZE = 5;
  const start = (page - 1) * PAGE_SIZE;
  const normalizedSearch = search.toLowerCase().trim();

  const filteredLeases = leases.filter((lease) => {
    const searchableText = [lease.tenantName, lease.propertyName, lease.status]
      .join(" ")
      .toLowerCase();

    return (
      searchableText.includes(normalizedSearch) &&
      (!selectedProperty || lease.propertyId === selectedProperty)
    );
  });

  const filteredPaginatedLeases = filteredLeases.slice(
    start,
    start + PAGE_SIZE,
  );
  const totalPages = Math.max(1, Math.ceil(filteredLeases.length / PAGE_SIZE));

  const columns: Column<Lease>[] = [
    {
      key: "startDate",
      title: "Početak",
      render: (value) => formatDate(value),
    },
    { key: "endDate", title: "Kraj", render: (value) => formatDate(value) },
    { key: "rentAmount", title: "Iznos najma(€)" },
    { key: "tenantName", title: "Stanar" },
    { key: "propertyName", title: "Nekretnina" },
    {
      key: "status",
      title: "Status",
      render: (value) => (value === "ACTIVE" ? "🟢 Aktivan" : "🔴 Neaktivan"),
    },
  ];

  const propertyIds = useMemo(
    () => Array.from(new Set(leases.map((lease) => lease.propertyId))),
    [leases],
  );

  return (
    <section>
      <Header
        title="Najmovi"
        description="Upravljajte najmom i ugovorima"
        buttonText="Dodaj Najam"
        buttonHref="/leases/new"
      />
      <div className="border-4 border-gray-200 rounded-xl mx-10">
        <SearchBar
          value={search}
          handleChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          placeholder="Pretraži najmove..."
          selectedProperty={selectedProperty}
          handleSelectedProperty={setSelectedProperty}
          properties={propertyIds}
          handlePageChange={setPage}
        />
        <Table
          data={filteredPaginatedLeases}
          columns={columns}
          onRowClick={(row) => router.push(`/leases/${row.id}`)}
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
