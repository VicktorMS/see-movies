'use client'
import { fetchFavoriteListDetailsById } from '@/app/lib/data';
import BackToHome from '@/app/ui/back-to-home';
import MovieList from '@/app/ui/movies/movie-list';
import Link from 'next/link';

export default async function Page({ params }) {
  const { id } = params;

  try {
    const favoriteListDetails = await fetchFavoriteListDetailsById(id);

    if (!favoriteListDetails) {
      return (
        <div className="p-4 max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold">Favorite list not found</h1>
        </div>
      );
    }

    const {
      name,
      description,
      movies
    } = favoriteListDetails;

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
          <MovieList movies={movies} in_favorite_list />
        ) : (
          <p className="text-xl align-middle font-bold text-center">Não há nenhum filme nessa lista de favoritos</p>
        )}
      </>
    );
  } catch (error) {
    return (
      <div className="p-4 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold">Error loading favorite list</h1>
      </div>
    );
  }
}
