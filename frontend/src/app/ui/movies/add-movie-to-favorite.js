'use client';
import { useState, useEffect } from 'react';
import { fetchFavoriteLists } from '@/app/lib/data';
import FavoriteListAdder from '@/app/ui/movies/favorite-list-adder';

export default function AddMovieToFavorite({ movie_id }) {
  const [favoriteLists, setFavoriteLists] = useState([]);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      fetchFavoriteLists(setFavoriteLists, setMessage);
    }
  }, [isModalOpen]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.getElementById(movie_id).showModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.getElementById(movie_id).close();
  };

  return (
    <>
      <button className="absolute right-2 top-2 btn btn-success btn-xs z-30" onClick={handleOpenModal}>
        FAVORITAR
      </button>
      <FavoriteListModal 
        movie_id={movie_id} 
        favoriteLists={favoriteLists} 
        message={message} 
        onClose={handleCloseModal} 
      />
    </>
  );
}

// Modal component for displaying favorite lists
function FavoriteListModal({ movie_id, favoriteLists, message, onClose }) {
  return (
    <dialog id={movie_id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Adicionar Filme aos Favoritos</h3>
        <p className="py-4">Selecione uma lista de favoritos para adicionar o filme:</p>
        <FavoriteListsContent 
          favoriteLists={favoriteLists} 
          message={message} 
          movie_id={movie_id} 
        />
        <div className="modal-action">
          <button onClick={onClose} className="btn">Close</button>
        </div>
      </div>
    </dialog>
  );
}

// Content component for the favorite lists
function FavoriteListsContent({ favoriteLists, message, movie_id }) {
  if (message) {
    return <p className="text-sm text-red-600">{message}</p>;
  }

  return (
    <div className="max-h-60 overflow-y-auto">
      {favoriteLists.map(favoriteList => (
        <FavoriteListAdder 
          key={favoriteList.id} 
          favoriteList={favoriteList} 
          movie_id={movie_id} 
        />
      ))}
    </div>
  );
}
