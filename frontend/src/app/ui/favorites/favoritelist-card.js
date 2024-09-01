import Image from "next/image";
import Link from 'next/link';

function FavoriteListCard({ favoriteList }) {
  const { name, id, description, movies } = favoriteList;

  // Verifica se há filmes na lista; se não, usa um backdrop padrão
  const movies_posters = movies?.length > 0
    ? movies.slice(0, 3).map(movie => movie.poster_path)
    : ['/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg']; // Substitua pelo caminho do seu backdrop padrão

  return (
    <div className="bg-base-100 rounded-md shadow-md grid grid-cols-3 sm:grid-cols-2 relative">
      <ImageStack images={movies_posters} />
      <div className="card-body col-span-2 sm:col-span-1">
        <h2 className="card-title truncate">
          {name}
        </h2>
        <p className="text-sm md:text-base truncate">{description}</p>
        <div className="card-actions justify-end">
          <div className="dropdown dropdown-end absolute top-0 right-0">
            <div tabIndex="0" role="button" className="btn m-1">...</div>
            <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box z-[99] w-52 p-2 shadow">
              <li><a>Compartilhar Lista</a></li>
              <li><a>Editar</a></li>
              <li><a>Excluir</a></li>
            </ul>
          </div>
          <Link href={`/favorites/${id}/details`} className="btn btn-primary btn-sm md:btn-md">
            Ver Filmes
          </Link>
        </div>
      </div>
    </div>
  );
}

function ImageStack({ images }) {
  return (
    <div className="stack">
      {images.map((image, index) => (
        <img
          key={index}
          width={500}
          height={300}
          src={`https://image.tmdb.org/t/p/original${image}`}
          alt={`Mosaic Image ${index + 1}`}
          className="rounded-md"
        />
      ))}
    </div>
  );
}

export default FavoriteListCard;
