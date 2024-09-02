"use client"
import { useState } from 'react';
import { fetchFavoriteLists } from '@/app/lib/data';

function AddMovieToFavorite({ movie_id }) {
  const [favoriteLists, setFavoriteLists] = useState([]);
  const [message, setMessage] = useState("");

  const handleOpenModal = () => {
    document.getElementById('my_modal_5').showModal();

    fetchFavoriteLists(setFavoriteLists, setMessage);
  };

  return (
    <>
      <button className="absolute right-2 top-2 btn btn-success btn-xs z-30" onClick={handleOpenModal}>
        FAVORITAR
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Adicionar Filme aos Favoritos</h3>
          <p className="py-4">Selecione uma lista de favoritos para adicionar o filme:</p>
          <div className="max-h-60 overflow-y-auto">
            {message ? (
              <p className="text-sm text-red-600">{message}</p>
            ) : (
              favoriteLists.map((favoriteList) => (
                <FavoriteListItem key={favoriteList.id} favoriteList={favoriteList} />
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

function FavoriteListItem({ favoriteList, movie_id }) {
  // Esse componente deve ter um botão que deve fazer uma chamada para a API para adicionar o filme a uma lista de favoritos
  return (
    <div className="p-2 border-b">
      <h4 className="font-bold">{favoriteList.name}</h4>
      <p className="text-sm text-gray-600">{favoriteList.description}</p>
    </div>
  );
}

export default AddMovieToFavorite;
