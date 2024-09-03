'use client'
import React, { Suspense, useState } from "react";
import Link from "next/link";
import Title from "@/app/ui/title";
import MoviesSection from "@/app/ui/movies/movies-section";
import SearchBar from "@/app/ui/search-bar"; 
import BackToTopButton from "@/app/ui/back-to-top-button";
import MovieListSkeleton from "@/app/ui/movies/movie-list-skeleton";
import { ListHeart } from "@phosphor-icons/react";

export default function HomeLayout() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <div className=" w-full flex justify-between items-center gap-6 mb-3">
        <SearchBar onSearch={handleSearch} />
        <FavoritesLink />

      </div>
      
      <Title>{searchQuery ? `Resultados da busca para: ${searchQuery}` : "Principais Filmes"}</Title>
      <Suspense fallback={<MovieListSkeleton/>}>
        <MoviesSection searchQuery={searchQuery} />
      </Suspense>
      <BackToTopButton/>
    </>
  );
}

function FavoritesLink() {
  return (
    <button className="btn btn-primary btn-md text-lg hidden md:block">
      <Link href={"/favorites"} className="flex gap-2 items-center" >
        <ListHeart size={32}/>
        Favoritos
      </Link>
    </button>
  );
}
