import React from "react";
import Image from "next/image";
import Link from 'next/link';
import AddMovieToFavorite from "@/app/ui/movies/add-movie-to-favorite";
import RemoveMovieFromFavorite from "@/app/ui/favorites/remove-movie-from-favorite"; // Importando o novo componente

const MovieCard = React.forwardRef(({ movie, in_favorite_list = false, listId, onMovieRemoved }, ref) => {
  const { id, title, overview, posterPath, vote_average } = movie;

  const imageUrl = posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : '/default-poster.png';
  const imageAlt = posterPath ? `${title} Poster` : `${title} Poster - Padrão`;

  return (
    <div ref={ref} className="relative overflow-hidden">
      {in_favorite_list ? (
        <RemoveMovieFromFavorite 
          listId={listId} 
          movieId={id} 
          onMovieRemoved={onMovieRemoved} 
        />
      ) : (
        <AddMovieToFavorite movie_id={id} />
      )}
      <Link href={`/${id}/details`}>
        <div>
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={200}
            height={300}
            className="w-full rounded-lg"
          />
          <div className="pt-4">
            <h3 className="text-lg text-center font-bold mb-2 truncate">{title}</h3>
          </div>
          <p className="font-bold text-primary-content absolute bg-primary rounded-b-md top-0 left-2 p-2">
            {vote_average.toFixed(1)}
          </p>
        </div>
      </Link>
    </div>
  );
});

export default MovieCard;
