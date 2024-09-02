import FavoriteListCard from './favoritelist-card';

function FavoriteListList({ favoriteLists, onUpdate }) {
  return (
    <div className="movie-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favoriteLists.map((favoriteList) => (
        <FavoriteListCard 
          key={favoriteList.id}
          favoriteList={favoriteList}
          onUpdate={onUpdate} 
        />
      ))}
    </div>
  );
}

export default FavoriteListList;
