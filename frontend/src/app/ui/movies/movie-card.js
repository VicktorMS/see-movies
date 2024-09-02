import React from "react";
import Image from "next/image";
import Link from 'next/link';
import AddMovieToFavorite from "./add-movie-to-favorite";

const MovieCard = React.forwardRef(({ movie, in_favorite_list = false }, ref) => {
  const { id, title, overview, posterPath, vote_average } = movie;

  return (
    <div ref={ref} className="relative overflow-hidden">
      {in_favorite_list ? (
        <button className="absolute right-2 top-2 btn btn-error btn-xs z-30">
          REMOVER
        </button>
      ) : (
        <AddMovieToFavorite movie_id={id} />
      )}
      <Link href={`/${id}/details`}>
        <div>
          <Image
            src={posterPath ? posterPath : '/default-poster.png'}
            alt={`${title} Poster`}
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
