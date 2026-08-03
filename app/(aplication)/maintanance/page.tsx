"use client";

import Header from "@/components/ui/aplication/header/Header";
import SearchBar from "@/components/ui/aplication/searchbar/SearchBar";
import Table from "@/components/ui/aplication/table/Table";
import Pagination from "@/components/ui/aplication/pagination/Pagination";

import { getMaintenanceTickets } from "@/actions/maintenance";

import type { MaintenanceTicket } from "@/types/maintenance-ticket";
import type { Column } from "@/types/column";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function Maintanance() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTickets() {
      try {
        const result = await getMaintenanceTickets();
        setTickets(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    void loadTickets();
  }, []);

  const PAGE_SIZE = 5;
  const start = (page - 1) * PAGE_SIZE;
  const normalizedSearch = search.toLowerCase().trim();

  const filteredTickets = tickets.filter((ticket) => {
    const searchableText = [ticket.title, ticket.propertyName, ticket.status]
      .join(" ")
      .toLowerCase();

    return (
      searchableText.includes(normalizedSearch) &&
      (!selectedProperty || ticket.propertyName === selectedProperty)
    );
  });

  const filteredPaginatedTickets = filteredTickets.slice(
    start,
    start + PAGE_SIZE,
  );

  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / PAGE_SIZE));

  const columns: Column<MaintenanceTicket>[] = [
    { key: "title", title: "Naslov" },
    { key: "description", title: "Opis" },
    {
      key: "status",
      title: "Status",
      render: (value) =>
        value === "OPEN"
          ? "🟡 Otvoren"
          : value === "IN_PROGRESS"
            ? "🔵 U toku"
            : "🟢 Završeno",
    },
    {
      key: "priority",
      title: "Prioritet",
      render: (value) =>
        value === "HIGH"
          ? "🚨 Visok"
          : value === "MEDIUM"
            ? "⚠️ Srednji"
            : "✅ Nizak",
    },
    { key: "propertyName", title: "Nekretnina" },
  ];

  const propertyNames = useMemo(
    () => Array.from(new Set(tickets.map((ticket) => ticket.propertyName))),
    [tickets],
  );

  return (
    <section>
      <Header
        title="Održavanje"
        description="Upravljajte servisnim zahtjevima i održavanjem"
        buttonText="Dodaj Zahtjev"
        buttonHref="/maintanance/new"
      />
      <div className="mx-3 rounded-2xl border-4 border-gray-200 sm:mx-6 lg:mx-10">
        <SearchBar
          value={search}
          handleChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          placeholder="Pretraži održavanje..."
          selectedProperty={selectedProperty}
          handleSelectedProperty={setSelectedProperty}
          properties={propertyNames}
          handlePageChange={setPage}
        />
        <Table
          data={filteredPaginatedTickets}
          columns={columns}
          onRowClick={(row) => router.push(`/maintanance/${row.id}`)}
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
