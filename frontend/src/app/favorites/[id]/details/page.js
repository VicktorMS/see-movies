'use client'
import { useEffect, useState } from 'react';
import { fetchFavoriteListDetailsById } from '@/app/lib/data';
import { useRouter } from 'next/navigation';
import MovieList from '@/app/ui/movies/movie-list';
import PageBackButton from '@/app/ui/pageback-button';

export default function FavoriteListPage({ params }) {
  const router = useRouter()
  const { id } = params;
  const [favoriteListDetails, setFavoriteListDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadFavoriteListDetails() {
      try {
        const data = await fetchFavoriteListDetailsById(id);
        setFavoriteListDetails(data);
      } catch (error) {
        setError('Error loading favorite list');
      } finally {
        setLoading(false);
      }
    }

    loadFavoriteListDetails();
  }, [id]);

  const handleMovieRemoved = (movieId) => {
    setFavoriteListDetails((prevDetails) => ({
      ...prevDetails,
      movies: prevDetails.movies.filter(movie => movie.id !== movieId),
    }));
  };

  const renderLoading = () => (
    <>
      <div className="skeleton h-10 w-full mb-2 rounded-lg"></div>
      <div className="skeleton h-6 w-28 rounded-lg"></div>
      <div className="w-full mt-36 flex justify-center items-center grow">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </>
  );

  const renderError = () => (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">{error}</h1>
    </div>
  );

  const renderEmptyState = () => (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Favorite list not found</h1>
    </div>
  );

  const renderFavoriteList = () => {
    const { name, description, movies } = favoriteListDetails;

    return (
      <>
        <div className="flex flex-col gap-6 mb-6">
          <PageBackButton />
          <div>
            <h1 className="text-4xl font-bold mb-4">{name}</h1>
            <p className="text-lg text-base-content">{description}</p>
          </div>
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
  };

  if (loading) return renderLoading();
  if (error) return renderError();
  if (!favoriteListDetails) return renderEmptyState();

  return renderFavoriteList();
}
