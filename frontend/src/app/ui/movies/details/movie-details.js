import Title from "@/app/ui/title";
import BackToHome from "../../back-to-home";


export function MoviePoster({ posterPath, title }) {
  return (
    <div className="w-full md:w-1/3">
      <img
        src={`https://image.tmdb.org/t/p/original${posterPath}`}
        alt={`${title} Poster`}
        className="rounded-lg shadow-lg w-full h-auto"
      />
    </div>
  );
}

export function MovieInfo({ title, tagline, releaseDate, overview }) {
  return (
    <div className="w-full md:w-2/3">
      <BackToHome/>
      <Title>{title}</Title>
      <p className="text-gray-600 text-sm md:text-base mb-4">{tagline}</p>
      <p className="text-gray-600 text-sm md:text-base mb-4">{releaseDate}</p>
      <p className="text-gray-800 text-sm md:text-base mb-4">{overview}</p>
    </div>
  );
}

export function MovieGenres({ genres }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {genres.map((genre) => (
        <span key={genre.id} className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg">
          {genre.name}
        </span>
      ))}
    </div>
  );
}


export function MovieStats({
  voteAverage,
  runtime,
  budget,
  revenue,
  spokenLanguages,
  productionCountries,
  productionCompanies,
  homepage
}) {
  return (
    <div className="mt-4">
      <span className="inline-block bg-yellow-400 text-gray-800 text-sm font-semibold px-4 py-2 rounded-lg">
        Nota: {voteAverage.toFixed(1)}
      </span>
      <div className="mt-4">
        <p className="text-gray-600 text-sm md:text-base">
          <strong>Duração:</strong> {runtime} minutos
        </p>
        <p className="text-gray-600 text-sm md:text-base">
          <strong>Orçamento:</strong> ${budget.toLocaleString()}
        </p>
        <p className="text-gray-600 text-sm md:text-base">
          <strong>Receita:</strong> ${revenue.toLocaleString()}
        </p>
        <p className="text-gray-600 text-sm md:text-base">
          <strong>Idiomas Falados:</strong>{" "}
          {spokenLanguages.map((lang) => lang.english_name).join(", ")}
        </p>
        <p className="text-gray-600 text-sm md:text-base">
          <strong>Países de Produção:</strong>{" "}
          {productionCountries.map((country) => country.name).join(", ")}
        </p>
        <p className="text-gray-600 text-sm md:text-base">
          <strong>Produtoras:</strong>{" "}
          {productionCompanies.map((company) => company.name).join(", ")}
        </p>
      </div>
      {homepage && (
        <div className="mt-4">
          <a
            href={homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Página Oficial
          </a>
        </div>
      )}
    </div>
  );
}
