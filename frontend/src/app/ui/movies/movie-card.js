import React from "react";
import Image from "next/image";
import Link from "next/link";
import AddMovieToFavorite from "@/app/ui/movies/add-movie-to-favorite";
import RemoveMovieFromFavorite from "@/app/ui/favorites/remove-movie-from-favorite";
import { Star } from "@phosphor-icons/react";

const MovieCard = React.forwardRef(({ movie, in_favorite_list = false, listId, onMovieRemoved }, ref) => {
  const { id, title, external_id, posterPath, vote_average } = movie;

  return (
    <div ref={ref} className="relative overflow-hidden lg:hover:scale-110 lg:hover:-translate-y-4 transition-all">
      <FavoriteAction 
        inFavoriteList={in_favorite_list} 
        movieId={id} 
        listId={listId} 
        onMovieRemoved={onMovieRemoved} 
      />
      <MovieLink id={in_favorite_list ? external_id : id} title={title} posterPath={posterPath} voteAverage={vote_average} />
    </div>
  );
});

// Definindo o displayName
MovieCard.displayName = 'MovieCard';

// Component for displaying the favorite action (add or remove)
function FavoriteAction({ inFavoriteList, movieId, listId, onMovieRemoved }) {
  return inFavoriteList ? (
    <RemoveMovieFromFavorite 
      listId={listId} 
      movieId={movieId} 
      onMovieRemoved={onMovieRemoved} 
    />
  ) : (
    <AddMovieToFavorite movie_id={movieId} />
  );
}

// Component for displaying the movie link with image and rating
function MovieLink({ id, title, posterPath, voteAverage }) {
  const imageUrl = posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : '/default-poster.png';
  const imageAlt = posterPath ? `${title} Poster` : `${title} Poster - Padrão`;

  return (
    <Link href={`/${id}/details`}>
      <div>
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={200}
          height={300}
          className="w-full rounded-lg"
        />
        <MovieCardContent title={title} voteAverage={voteAverage} />
      </div>
    </Link>
  );
}

// Component for displaying the movie title and rating
function MovieCardContent({ title, voteAverage }) {
  return (
    <>
      <div className="pt-4">
        <h3 className="text-lg text-center font-bold mb-2 truncate">{title}</h3>
      </div>
      <p className="font-bold text-primary-content absolute bg-primary rounded-b-lg top-0 left-2 p-2 flex flex-col items-center">
        <Star weight="fill" />  
        {voteAverage.toFixed(1)}
      </p>
    </>
  );
}

export default MovieCard;
