import React, { Suspense } from "react";
import Title from "@/app/ui/title";
import FavoriteListSection from "@/app/ui/favorites/favoritelist-section"; 
import SearchBar from "../ui/search-bar";
import Link from "next/link";

export default function FavoriteListsPage() {
  return (
    <>
      <SearchBar />
      <Link href="/" className="btn btn-primary btn-md text-lg">Descobrir filmes</Link>
      <Title>Seus Filmes Favoritos</Title>
      <Suspense fallback={<div>Loading...</div>}>
        <FavoriteListSection />
      </Suspense>
    </>
  );
}
