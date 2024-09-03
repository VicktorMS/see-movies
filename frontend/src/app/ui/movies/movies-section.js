'use client'
import React, { useEffect, useState, useRef, useCallback, lazy } from "react";
import { fetchMovies, searchMovies } from "@/app/lib/data";
import MovieListSkeleton from "@/app/ui/movies/movie-list-skeleton";

const MovieList = lazy(() => import('@/app/ui/movies/movie-list'));

export default function MoviesSection({ searchQuery }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true); 
  const initialRender = useRef(true);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const data = searchQuery
        ? await searchMovies(searchQuery, setMessage)
        : await fetchMovies(1, setMessage); 
      setMovies(searchQuery ? data.results : data.results);
      setHasMore(!searchQuery && data.hasMore);
      setLoading(false); 
    };

    if (initialRender.current) {
      initialRender.current = false;
      loadMovies();
    } else {
      loadMovies();
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!searchQuery && page > 1) {
      const loadMoreMovies = async () => {
        const data = await fetchMovies(page, setMessage);
        setMovies(prevMovies => [...prevMovies, ...data.results]);
        setHasMore(data.hasMore);
        setLoading(false);
      };
      loadMoreMovies();
    }
  }, [page]);

  const observer = useRef();

  const lastMovieElementRef = useCallback((node) => {
    if (loading || !hasMore || searchQuery) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, searchQuery]);

  return (
    <>
      {loading && page === 1 ? (
        <MovieListSkeleton />
      ) : (
        <MovieList 
          movies={movies} 
          lastMovieElementRef={searchQuery ? null : lastMovieElementRef} 
          loading={loading} 
        />
      )}
      {message && <p className="text-center mt-4">{message}</p>}
    </>
  );
}
