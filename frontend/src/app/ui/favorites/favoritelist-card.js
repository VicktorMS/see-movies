import React from "react";
import Image from "next/image";
import Link from "next/link";
import DeleteFavoriteListButton from "./delete-favorite-list-button";

export default function FavoriteListCard({ favoriteList, onUpdate }) {
  const { name, id, description, movies } = favoriteList;
  const moviePosters = getMoviePosters(movies);

  return (
    <div className="bg-base-100 rounded-md shadow-md grid grid-cols-3 sm:grid-cols-2 relative">
      <ImageStack images={moviePosters} />
      <CardContent 
        name={name} 
        description={description} 
        listId={id} 
        onUpdate={onUpdate} 
      />
    </div>
  );
}

// Helper function to extract movie posters or fallback to default images
function getMoviePosters(movies) {
  return movies?.length > 0 
    ? movies.slice(0, 5).map(movie => movie.poster_path) 
    : Array(5).fill(null);
}

// Component for rendering the stack of images
function ImageStack({ images }) {
  return (
    <div className="stack">
      {images.map((image, index) => (
        <Image
          key={index}
          width={200}
          height={300}
          src={image ? `https://image.tmdb.org/t/p/original${image}` : '/default-poster.png'}
          alt={`Mosaic Image ${index + 1}`}
          className="rounded-md object-fill"
        />
      ))}
    </div>
  );
}

// Component for rendering the content and actions of the card
function CardContent({ name, description, listId, onUpdate }) {
  return (
    <div className="card-body col-span-2 sm:col-span-1">
      <h2 className="card-title truncate">{name}</h2>
      <p className="text-sm md:text-base truncate">{description}</p>
      <CardActions listId={listId} onUpdate={onUpdate} />
    </div>
  );
}

// Component for rendering the dropdown and action buttons
function CardActions({ listId, onUpdate }) {
  return (
    <div className="card-actions justify-end">
      <DropdownMenu listId={listId} onUpdate={onUpdate} />
      <Link href={`/favorites/${listId}/details`} className="btn btn-primary btn-sm md:btn-md">
        Ver Filmes
      </Link>
    </div>
  );
}

// Component for rendering the dropdown menu
function DropdownMenu({ listId, onUpdate }) {
  return (
    <div className="dropdown dropdown-end absolute top-0 right-0">
      <div tabIndex="0" role="button" className="btn m-1 btn-sm">...</div>
      <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box z-[99] w-52 p-2 shadow">
        <li><a>Compartilhar Lista</a></li>
        <li><a>Editar</a></li>
        <li>
          <DeleteFavoriteListButton listId={listId} onUpdate={onUpdate} />
        </li>
      </ul>
    </div>
  );
}
