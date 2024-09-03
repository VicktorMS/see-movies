"use client";

import { useEffect, useState } from "react";
import Title from "@/app/ui/title";
import { fetchMovieDetailsById } from "@/app/lib/data";
import Link from "next/link";
import PageBackButton from "@/app/ui/pageback-button";
import Image from "next/image";

// Main component for rendering movie details page
export default function MovieDetailsPage({ params }) {
  const { id } = params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);

  // Fetch movie details when component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchMovieDetailsById(id);
        setMovieDetails(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setError("Movie not found");
      }
    }
    fetchData();
  }, [id]);

  // Render error state if fetching fails
  if (error) {
    return <ErrorState message={error} />;
  }

  // Show loading state while data is being fetched
  if (!movieDetails) {
    return <LoadingState />;
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

// Function to handle error state
function ErrorState({ message }) {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Title>{message}</Title>
      <Link href="/">Back to Home</Link>
    </div>
  );
}

// Function to render loading state
function LoadingState() {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Title>Loading...</Title>
    </div>
  );
}

// Component to render the movie poster
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

// Component to render basic movie information
function MovieInfo({ movie }) {
  return (
    <div className="w-full md:w-2/3">
      <PageBackButton />
      <Title>{movie.title}</Title>
      <p className="text-sm md:text-base mb-4">{movie.tagline}</p>
      <p className="text-sm md:text-base mb-4">{movie.release_date}</p>
      <p className="text-sm md:text-base mb-4">{movie.overview}</p>
    </div>
  );
}

// Component to render movie genres
function MovieGenres({ movie }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {movie.genres.map((genre) => (
        <span key={genre.id} className="badge badge-lg badge-primary font-bold">
          {genre.name}
        </span>
      ))}
    </div>
  );
}

// Component to render movie statistics
function MovieStats({ movie }) {
  return (
    <div className="mt-4">
      <span className="badge badge-neutral badge-lg text-lg py-4 font-semibold">
        Rating: {movie.vote_average.toFixed(1)}
      </span>
      <div className="mt-4">
        <p className="text-sm md:text-base">
          <strong>Runtime:</strong> {movie.runtime} minutes
        </p>
        <p className="text-sm md:text-base">
          <strong>Budget:</strong> ${movie.budget.toLocaleString()}
        </p>
        <p className="text-sm md:text-base">
          <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
        </p>
        <p className="text-sm md:text-base">
          <strong>Spoken Languages:</strong>{" "}
          {movie.spoken_languages.map((lang) => lang.english_name).join(", ")}
        </p>
        <p className="text-sm md:text-base">
          <strong>Production Countries:</strong>{" "}
          {movie.production_countries.map((country) => country.name).join(", ")}
        </p>
        <p className="text-sm md:text-base">
          <strong>Production Companies:</strong>{" "}
          {movie.production_companies.map((company) => company.name).join(", ")}
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
            Official Page
          </a>
        </div>
      )}
    </div>
  );
}
