import MovieCard from './movie-card';

function MovieList({ movies }) {
  return (
    <div className="movie-list grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={{
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            posterPath: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
            vote_average: movie.vote_average,
          }}
        />
      ))}
    </div>
  );
}

export default MovieList;
