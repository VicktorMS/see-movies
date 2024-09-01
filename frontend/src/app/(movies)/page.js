"use client";

import React, { useEffect, useState } from "react";
import Title from "@/app/ui/title";
import MovieList from "@/app/ui/movies/movie-list";
import SearchBar from "@/app/ui/search-bar";
import { fetchMovies } from "@/app/lib/data";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMovies(setMovies, setMessage);
  }, []); 

  return (
    <>
      <SearchBar />
      <Title>Principais Filmes</Title>
      {message && <p>{message}</p>} 
      <MovieList movies={movies} /> 
    </>
  );
}
