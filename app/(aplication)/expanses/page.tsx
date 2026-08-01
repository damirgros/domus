"use client";

import Header from "@/components/ui/aplication/header/Header";
import SearchBar from "@/components/ui/aplication/searchbar/SearchBar";
import Table from "@/components/ui/aplication/table/Table";
import Pagination from "@/components/ui/aplication/pagination/Pagination";

import { getExpenses } from "@/actions/expenses";

import type { Expense } from "@/types/expense";
import type { Column } from "@/types/column";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function Expanses() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const result = await getExpenses();
        setExpenses(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    void loadExpenses();
  }, []);

  const PAGE_SIZE = 5;
  const start = (page - 1) * PAGE_SIZE;
  const normalizedSearch = search.toLowerCase().trim();

  const filteredExpenses = expenses.filter((expense) => {
    const searchableText = [
      expense.title,
      expense.propertyName,
      expense.category,
    ]
      .join(" ")
      .toLowerCase();

    return (
      searchableText.includes(normalizedSearch) &&
      (!selectedProperty || expense.propertyName === selectedProperty)
    );
  });

  const filteredPaginatedExpenses = filteredExpenses.slice(
    start,
    start + PAGE_SIZE,
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredExpenses.length / PAGE_SIZE),
  );

  const columns: Column<Expense>[] = [
    { key: "title", title: "Naslov" },
    { key: "description", title: "Opis" },
    { key: "amount", title: "Iznos(€)" },
    { key: "category", title: "Kategorija" },
    { key: "propertyName", title: "Nekretnina" },
  ];

  const propertyNames = useMemo(
    () => Array.from(new Set(expenses.map((expense) => expense.propertyName))),
    [expenses],
  );

  return (
    <section>
      <Header
        title="Troškovi"
        description="Upravljajte svim troškovima i rashodima"
        buttonText="Dodaj Trošak"
        buttonHref="/expanses/new"
      />
      <div className="border-4 border-gray-200 rounded-xl mx-10">
        <SearchBar
          value={search}
          handleChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          placeholder="Pretraži troškove..."
          selectedProperty={selectedProperty}
          handleSelectedProperty={setSelectedProperty}
          properties={propertyNames}
          handlePageChange={setPage}
        />
        <Table
          data={filteredPaginatedExpenses}
          columns={columns}
          onRowClick={(row) => router.push(`/expanses/${row.id}`)}
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
