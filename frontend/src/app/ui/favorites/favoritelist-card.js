import Image from "next/image";
import Link from 'next/link';

function FavoriteListCard({ favoriteList }) {
  const { name, id, description, movies } = favoriteList;

  const movies_posters = [
    '/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
    '/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
    '/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',

  ]

  // for (let i = 0; i < movies.length; i++) {
  //   movies[i].favoriteListId = id;
  // }
  return (
    <div className="bg-base-100 rounded-md shadow-md grid grid-cols-3 sm:grid-cols-2 relative">
      <ImageMosaic images={movies_posters} />
      <div className="card-body col-span-2 sm:col-span-1">
        <h2 className="card-title truncate">
          {name}
        </h2>
        <p className="text-sm md:text-base truncate">{description}</p>
        <div className="card-actions flex-row">
          <div class="dropdown dropdown-end absolute top-0 right-0">
            <div tabindex="0" role="button" class="btn m-1">...</div>
            <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[99] w-52 p-2 shadow">
              <li><a>Compartilhar Lista</a></li>
              <li><a>Editar</a></li>
              <li><a>Excluir</a></li>
            </ul>
          </div>
          <div className="btn btn-primary btn-sm md:btn-md">Ver Filmes</div>
        </div>
      </div>
    </div>
  );
}


function ImageMosaic({ images }) {
  return (
    <div className={`stack `}>
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
