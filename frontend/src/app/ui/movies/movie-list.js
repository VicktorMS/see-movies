import MovieCard from './movie-card';

function MovieList({ movies }) {
  return (
    <div className="movie-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          overview={movie.overview}
        //   posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Exemplo de construção da URL do poster
        />
      ))}
    </div>
  );
}

export default MovieList;
