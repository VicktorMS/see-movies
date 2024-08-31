function MovieCard({ title, overview, posterPath }) {
    return (
      <div className="movie-card bg-white shadow-md rounded-lg overflow-hidden">
        {/* <img src={posterPath} alt={`${title} Poster`} className="w-full h-48 object-cover" /> */}
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-sm text-gray-600">{overview}</p>
        </div>
      </div>
    );
  }

export default MovieCard;