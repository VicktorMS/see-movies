import MovieCard from './movie-card';
import MovieCardSkeleton from '@/app/ui/movies/movies-skeleton';

function MovieList({ movies, lastMovieElementRef, in_favorite_list = false, loading, listId, onMovieRemoved }) {
  return (
    <div className="movie-list grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie, index) => {
        if (movies.length === index + 1) {
          return (
            <MovieCard
              ref={lastMovieElementRef}
              key={movie.id}
              movie={{
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                posterPath: movie.poster_path,
                vote_average: movie.vote_average,
              }}
              in_favorite_list={in_favorite_list}
              listId={listId}
              onMovieRemoved={onMovieRemoved}
            />
          );
        } else {
          return (
            <MovieCard
              key={movie.id}
              movie={{
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                posterPath: movie.poster_path,
                vote_average: movie.vote_average,
              }}
              in_favorite_list={in_favorite_list}
              listId={listId}
              onMovieRemoved={onMovieRemoved}
            />
          );
        }
      })}

      {/* Renderiza skeletons se estiver carregando */}
      {loading && Array.from({ length: 20 }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default MovieList;
