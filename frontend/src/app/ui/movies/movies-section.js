'use client'
import React, { useEffect, useState, useRef, useCallback, Suspense, lazy } from "react";
import { fetchMovies } from "@/app/lib/data";
import MovieListSkeleton from "@/app/ui/movies/movies-skeleton";

const MovieList = lazy(() => import('@/app/ui/movies/movie-list'));

export default function MoviesSection() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const initialRender = useRef(true);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const data = await fetchMovies(page, setMessage);
      setMovies(prevMovies => [...prevMovies, ...data.results]);
      setHasMore(data.hasMore);
      setLoading(false);
    };

    if (initialRender.current) {
      initialRender.current = false;
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
      <Suspense fallback={<MovieListSkeleton />}>
        <MovieList movies={movies} lastMovieElementRef={lastMovieElementRef} loading={loading} />
      </Suspense>
      {message && <p className="text-center mt-4">{message}</p>}
    </>
  );
}
