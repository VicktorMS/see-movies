"use client"
import { useState } from 'react';
import { fetchFavoriteLists } from '@/app/lib/data';
import FavoriteListAdder from '@/app/ui/movies/favorite-list-adder';

function AddMovieToFavorite({ movie_id }) {
  const [favoriteLists, setFavoriteLists] = useState([]);
  const [message, setMessage] = useState("");

  const handleOpenModal = () => {
    document.getElementById(movie_id).showModal();

    fetchFavoriteLists(setFavoriteLists, setMessage);
  };

  return (
    <>
      <button className="absolute right-2 top-2 btn btn-success btn-xs z-30" onClick={handleOpenModal}>
        FAVORITAR
      </button>
      <dialog id={movie_id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Adicionar Filme aos Favoritos</h3>
          <p className="py-4">Selecione uma lista de favoritos para adicionar o filme:</p>
          <div className="max-h-60 overflow-y-auto">
            {message ? (
              <p className="text-sm text-red-600">{message}</p>
            ) : (
              favoriteLists.map((favoriteList) => (
                <FavoriteListAdder key={favoriteList.id} favoriteList={favoriteList} movie_id={movie_id} />
              ))
            )}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}


export default AddMovieToFavorite;
