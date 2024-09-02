import React, { Suspense } from "react";
import Link from "next/link";
import Title from "@/app/ui/title";
import MoviesSection from "@/app/ui/movies/movies-section"; // Componente que vamos criar

export default function HomeLayout() {
  return (
    <>
      <FavoritesLink />
      <Title>Principais Filmes</Title>
      <Suspense fallback={<div>Loading...</div>}>
        <MoviesSection />
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
