"use client";

import Header from "@/components/ui/aplication/header/Header";
import SearchBar from "@/components/ui/aplication/searchbar/SearchBar";
import Table from "@/components/ui/aplication/table/Table";
import Pagination from "@/components/ui/aplication/pagination/Pagination";

import { getProperties } from "@/actions/properties";

import type { Property } from "@/types/property";
import type { Column } from "@/types/column";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function Overview() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      try {
        const result = await getProperties();
        setProperties(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    void loadProperties();
  }, []);

  const PAGE_SIZE = 5;
  const start = (page - 1) * PAGE_SIZE;
  const normalizedSearch = search.toLowerCase().trim();

  const filteredProperties = properties.filter((property) => {
    const searchableText = [property.name, property.city, property.owner]
      .join(" ")
      .toLowerCase();

    return (
      searchableText.includes(normalizedSearch) &&
      (!selectedProperty || property.name === selectedProperty)
    );
  });

  const filteredPaginatedProperties = filteredProperties.slice(
    start,
    start + PAGE_SIZE,
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProperties.length / PAGE_SIZE),
  );

  const columns: Column<Property>[] = [
    { key: "name", title: "Naziv" },
    { key: "address", title: "Adresa" },
    { key: "city", title: "Grad" },
    { key: "postalCode", title: "Poštanski broj" },
    { key: "size", title: "Veličina (m²)" },
    { key: "rooms", title: "Sobe" },
    { key: "owner", title: "Vlasnik" },
  ];

  const propertyNames = useMemo(
    () => Array.from(new Set(properties.map((property) => property.name))),
    [properties],
  );

  return (
    <section>
      <Header
        title="Nekretnine"
        description="Upravljajte podacima o svojim nekretninama"
        buttonText="Dodaj Nekretninu"
        buttonHref="/overview/new"
      />
      <div className="border-4 border-gray-200 rounded-xl mx-10">
        <SearchBar
          value={search}
          handleChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          placeholder="Pretraži nekretnine..."
          selectedProperty={selectedProperty}
          handleSelectedProperty={setSelectedProperty}
          properties={propertyNames}
          handlePageChange={setPage}
        />
        <Table
          data={filteredPaginatedProperties}
          columns={columns}
          onRowClick={(row) => router.push(`/overview/${row.id}`)}
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
