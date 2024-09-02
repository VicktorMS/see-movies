import { useState } from 'react';
import { addMovieToFavoriteList } from '@/app/lib/data';

function FavoriteListAdder({ favoriteList, movie_id }) {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddMovie = () => {
    addMovieToFavoriteList(favoriteList.id, movie_id, setMessage, setIsSuccess);

    // Clear the message after 2 seconds
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div className="p-2 border-b">
      <h4 className="font-bold">{favoriteList.name}</h4>
      <p className="text-sm text-gray-600">{favoriteList.description}</p>
      <button 
        className="btn btn-success btn-xs mt-2"
        onClick={handleAddMovie}
      >
        Adicionar
      </button>
      {message && (
        <p className={`text-sm mt-2 ${isSuccess ? 'text-green-600' : ''}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default FavoriteListAdder;
