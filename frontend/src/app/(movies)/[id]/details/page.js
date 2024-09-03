import Title from "@/app/ui/title";
import { fetchMovieDetailsById } from "@/app/lib/data";
import Link from "next/link";
import PageBackButton from "@/app/ui/pageback-button";
import Image from "next/image";


export default async function MovieDetailsPage({ params }) {
  
  const { id } = params;
  const movieDetails = await fetchMovieDetails(id);

  if (!movieDetails) {
    return <ErrorState message="Movie not found" />;
  }

  return (
    <div className="flex flex-col h-max grow md:flex-row items-center md:items-start gap-8 m">
      <MoviePoster movie={movieDetails} />
      <div className="w-full md:w-2/3">
        <MovieInfo movie={movieDetails} />
        <MovieGenres movie={movieDetails} />
        <MovieStats movie={movieDetails} />
      </div>
    </div>
  );
}

// Function to fetch movie details with error handling
async function fetchMovieDetails(id) {
  try {
    return await fetchMovieDetailsById(id);
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    return null;
  }
}

// Component for rendering error states
function ErrorState({ message }) {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Title>{message}</Title>
      <Link />
    </div>
  );
}

// Component for rendering the movie poster
function MoviePoster({ movie }) {
  return (
    <div className="w-full md:w-1/3">
      <Image
        height={600}
        width={400}
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={`${movie.title} Poster`}
        className="rounded-lg shadow-lg w-full h-auto"
      />
    </div>
  );
}

// Component for rendering basic movie information
function MovieInfo({ movie }) {
  return (
    <div className="w-full md:w-2/3">
      <PageBackButton/>
      <Title>{movie.title}</Title>
      <p className="text-sm md:text-base mb-4">{movie.tagline}</p>
      <p className="text-sm md:text-base mb-4">{movie.release_date}</p>
      <p className="text-sm md:text-base mb-4">{movie.overview}</p>
    </div>
  );
}

// Component for rendering movie genres
function MovieGenres({ movie }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {movie.genres.map((genre) => (
        <span key={genre.id} className="badge badge-lg badge-primary font-bold ">
          {genre.name}
        </span>
      ))}
    </div>
  );
}

// Component for rendering movie statistics
function MovieStats({ movie }) {
  return (
    <div className="mt-4">
      <span className="badge badge-neutral badge-lg text-lg py-4 font-semibold">
        Nota: {movie.vote_average.toFixed(1)}
      </span>
      <div className="mt-4">
        <p className="text-sm md:text-base">
          <strong>Duração:</strong> {movie.runtime} minutos
        </p>
        <p className="text-sm md:text-base">
          <strong>Orçamento:</strong> ${movie.budget.toLocaleString()}
        </p>
        <p className="text-sm md:text-base">
          <strong>Receita:</strong> ${movie.revenue.toLocaleString()}
        </p>
        <p className="text-sm md:text-base">
          <strong>Idiomas Falados:</strong> {movie.spoken_languages.map((lang) => lang.english_name).join(", ")}
        </p>
        <p className="text-sm md:text-base">
          <strong>Países de Produção:</strong> {movie.production_countries.map((country) => country.name).join(", ")}
        </p>
        <p className="text-sm md:text-base">
          <strong>Produtoras:</strong> {movie.production_companies.map((company) => company.name).join(", ")}
        </p>
      </div>
      {movie.homepage && (
        <div className="mt-4">
          <a
            href={movie.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="link link-primary font-bold"
          >
            Página Oficial
          </a>
        </div>
      )}
    </div>
  );
}
