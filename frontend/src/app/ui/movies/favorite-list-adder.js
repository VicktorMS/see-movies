import { useState } from 'react';
import { addMovieToFavoriteList } from '@/app/lib/data';
import { Plus } from '@phosphor-icons/react/dist/ssr';

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
    <div className="p-2 border-b border-base-300 px-4 py-2">
      <div className='flex justify-between items-center '>
        <h4 className="font-bold">{favoriteList.name}</h4>
        <button 
          className="btn btn-success btn-xs mt-2 "
          onClick={handleAddMovie}
        >
          <Plus weight='bold'/>
          Adicionar
        </button>
      </div>
      {message && (
        <p className={`text-sm mt-2 ${isSuccess ? 'text-green-600' : ''}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default FavoriteListAdder;
