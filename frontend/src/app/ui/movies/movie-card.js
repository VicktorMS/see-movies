import Image from "next/image";
import Link from 'next/link';

function MovieCard({ movie, in_favorite_list = false }) {
  const { id, title, overview, posterPath, vote_average } = movie;

  return (
    <div className="relative overflow-hidden">
      <button className={in_favorite_list ? 'absolute right-2 top-2 btn btn-error btn-xs z-30' : 'hidden'}>
        REMOVER
      </button>
      <button className={!in_favorite_list ? 'absolute right-2 top-2 btn btn-success btn-xs z-30' : 'hidden'}>
        FAVORITAR
      </button>
      <Link href={`/${id}/details`}>
        <div>
          <img
            src={posterPath ? posterPath : '/default-poster.png'}
            alt={`${title} Poster`}
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
}

export default MovieCard;
