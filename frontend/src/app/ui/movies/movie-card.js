import Image from "next/image";
import Link from 'next/link';

function MovieCard({ movie }) {
  const { id, title, overview, posterPath, vote_average } = movie;

  return (
    <Link
      href={`/${id}/details`}
    >
      <div className="overflow-hidden relative">
        <img
          src={posterPath}
          alt={`${title} Poster`}
          className="shadow-md rounded-lg"
        />
        <div className="pt-4">
          <h3 className="text-lg text-center font-bold mb-2">{title}</h3>
        </div>
        <p className="font-bold text-primary-content absolute bg-primary rounded-b-md top-0 left-2 p-2">{vote_average.toFixed(1)}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
