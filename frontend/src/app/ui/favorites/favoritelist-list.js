import FavoriteListCard from './favoritelist-card';

function FavoriteListList({ favoriteLists }) {
  return (
    <div className="movie-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favoriteLists.map((favoriteList) => (
        <FavoriteListCard 
          key={favoriteList.id}
          favoriteList={{
            id: favoriteList.id,
            name: favoriteList.name,
            description: favoriteList.description,
            movies: favoriteList.movies,
          }}
        />
      ))}
    </div>
  );
}

export default FavoriteListList;
