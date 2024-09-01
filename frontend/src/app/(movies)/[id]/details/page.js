import Title from "@/app/ui/title";
import { fetchMovieDetailsById } from "@/app/lib/data";

export default async function Page({ params }) {
  const { id } = params;

  try {
    const movie_details = await fetchMovieDetailsById(id);

    return (
      <div className="p-4 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-full md:w-1/2">
            <img
              src={`https://image.tmdb.org/t/p/original${movie_details.poster_path}`}
              alt={`${movie_details.title} Poster`}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="w-full md:w-2/3">
            <Title>{movie_details?.title}</Title>
            <p className="text-gray-600 text-sm md:text-base mb-4">{movie_details.tagline}</p>
            <p className="text-gray-600 text-sm md:text-base mb-4">{movie_details.release_date}</p>
            <p className="text-gray-800 text-sm md:text-base mb-4">{movie_details.overview}</p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {movie_details.genres.map((genre) => (
                <span key={genre.id} className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="mt-4">
              <span className="inline-block bg-yellow-400 text-gray-800 text-sm font-semibold px-4 py-2 rounded-lg">
                Nota: {movie_details.vote_average.toFixed(1)}
              </span>
            </div>

            <div className="mt-4">
              <p className="text-gray-600 text-sm md:text-base">
                <strong>Duração:</strong> {movie_details.runtime} minutos
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                <strong>Orçamento:</strong> ${movie_details.budget.toLocaleString()}
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                <strong>Receita:</strong> ${movie_details.revenue.toLocaleString()}
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                <strong>Idiomas Falados:</strong>{" "}
                {movie_details.spoken_languages.map((lang) => lang.english_name).join(", ")}
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                <strong>Países de Produção:</strong>{" "}
                {movie_details.production_countries.map((country) => country.name).join(", ")}
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                <strong>Produtoras:</strong>{" "}
                {movie_details.production_companies.map((company) => company.name).join(", ")}
              </p>
            </div>

            <div className="mt-4">
              <a
                href={movie_details.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Página Oficial
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4 max-w-5xl mx-auto">
        <Title>Erro ao carregar o filme</Title>
        <p>{error.message}</p>
      </div>
    );
  }
}
