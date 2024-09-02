'use client'
import React, { useEffect, useState, useRef, useCallback } from "react";
import Title from "@/app/ui/title";
import MovieList from "@/app/ui/movies/movie-list";
import SearchBar from "@/app/ui/search-bar";
import { fetchMovies } from "@/app/lib/data";
import Link from "next/link";
import MovieListSkeleton from "../ui/movies/movies-skeleton";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const initialRender = useRef(true); // Novo estado para verificar a renderização inicial

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const data = await fetchMovies(page, setMessage);
      setMovies(prevMovies => [...prevMovies, ...data.results]);
      setHasMore(data.hasMore);
      setLoading(false);
    };

    if (initialRender.current) {
      initialRender.current = false; // Impede que a lógica seja acionada na primeira renderização após a montagem
      loadMovies();
    } else if (page > 1) {
      loadMovies();
    }
  }, [page]);

  const observer = useRef();

  const lastMovieElementRef = useCallback((node) => {
    if (loading || !hasMore) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <>
      <SearchBar />
      <Link href={"/favorites"} className="btn btn-primary btn-md text-lg">Listas de Favoritos</Link>
      <Title>Principais Filmes</Title>
      <MovieList movies={movies} lastMovieElementRef={lastMovieElementRef} loading={loading} />
      {message && <p className="text-center mt-4">{message}</p>}
    </>
  );
}
