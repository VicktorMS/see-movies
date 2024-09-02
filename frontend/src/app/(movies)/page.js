'use client'
import React, { Suspense, useState } from "react";
import Link from "next/link";
import Title from "@/app/ui/title";
import MoviesSection from "@/app/ui/movies/movies-section";
import SearchBar from "@/app/ui/search-bar"; // Componente da barra de pesquisa

export default function HomeLayout() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <FavoritesLink />
      <SearchBar onSearch={handleSearch} />
      <Title>{searchQuery ? `Resultados da busca para: ${searchQuery}` : "Principais Filmes"}</Title>
      <Suspense fallback={<div>Loading...</div>}>
        <MoviesSection searchQuery={searchQuery} />
      </Suspense>
    </>
  );
}

function FavoritesLink() {
  return (
    <Link href={"/favorites"} className="btn btn-primary btn-md text-lg">
      Listas de Favoritos
    </Link>
  );
}
