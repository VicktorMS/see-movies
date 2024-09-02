import React from "react";
import MovieCard from '@/app/ui/movies/movie-card';
import MovieCardSkeleton from '@/app/ui/movies/movies-skeleton';

export default function MovieList({ movies, lastMovieElementRef, in_favorite_list = false, loading, listId, onMovieRemoved }) {
  return (
    <div className="movie-list grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie, index) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          index={index}
          lastMovieElementRef={lastMovieElementRef}
          moviesLength={movies.length}
          in_favorite_list={in_favorite_list}
          listId={listId}
          onMovieRemoved={onMovieRemoved}
        />
      ))}
      {loading && <LoadingSkeletons />}
    </div>
  );
}

// Subcomponent for rendering a movie item with conditional ref assignment
function MovieItem({ movie, index, lastMovieElementRef, moviesLength, in_favorite_list, listId, onMovieRemoved }) {
  const movieCardProps = {
    ref: moviesLength === index + 1 ? lastMovieElementRef : null,
    movie: {
      id: movie.id,
      title: movie.title,
      external_id: movie.external_id,
      overview: movie.overview,
      posterPath: movie.poster_path,
      vote_average: movie.vote_average,
    },
    in_favorite_list,
    listId,
    onMovieRemoved,
  };

  return <MovieCard {...movieCardProps} />;
}

// Subcomponent for rendering the loading skeletons
function LoadingSkeletons() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </>
  );
}
