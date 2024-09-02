'use client'
import { useEffect, useState } from 'react';
import { fetchFavoriteListDetailsById } from '@/app/lib/data';
import Link from 'next/link';
import MovieList from '@/app/ui/movies/movie-list';

export default function Page({ params }) {
  const { id } = params;
  const [favoriteListDetails, setFavoriteListDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadFavoriteListDetails = async () => {
      try {
        const data = await fetchFavoriteListDetailsById(id);
        setFavoriteListDetails(data);
        setLoading(false);
      } catch (error) {
        setError('Error loading favorite list');
        setLoading(false);
      }
    };

    loadFavoriteListDetails();
  }, [id]);

  const handleMovieRemoved = (movieId) => {
    setFavoriteListDetails((prevDetails) => ({
      ...prevDetails,
      movies: prevDetails.movies.filter(movie => movie.id !== movieId),
    }));
  };

  if (loading) {
    return (
      <div className="p-4 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold">{error}</h1>
      </div>
    );
  }

  if (!favoriteListDetails) {
    return (
      <div className="p-4 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold">Favorite list not found</h1>
      </div>
    );
  }

  const { name, description, movies } = favoriteListDetails;

  return (
    <>
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">{name}</h1>
          <p className="text-lg text-gray-700">{description}</p>
        </div>
        <Link href="/favorites/" className="btn btn-primary">
          Voltar para listas de favoritos
        </Link>
      </div>
      {movies.length > 0 ? (
        <MovieList 
          movies={movies} 
          in_favorite_list={true} 
          listId={id} 
          onMovieRemoved={handleMovieRemoved} 
        />
      ) : (
        <p className="text-xl align-middle font-bold text-center">
          Não há nenhum filme nessa lista de favoritos
        </p>
      )}
    </>
  );
}
