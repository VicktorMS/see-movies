import Title from "@/app/ui/title";
import { fetchMovieDetailsById } from "@/app/lib/data";
import { MovieGenres, MoviePoster, MovieStats, MovieInfo } from "@/app/ui/movies/details/movie-details";
import BackToHome from "@/app/ui/back-to-home";

export default async function Page({ params }) {
  const { id } = params;

  try {
    const movie_details = await fetchMovieDetailsById(id);

    const {
      title,
      tagline,
      release_date,
      overview,
      genres,
      vote_average,
      runtime,
      budget,
      revenue,
      spoken_languages,
      production_countries,
      production_companies,
      poster_path,
      homepage
    } = movie_details

    if (!movie_details) {
      return (
        <div className="p-4 max-w-5xl mx-auto">
          <Title>Movie not found</Title>
        </div>
      );
    }

    return (
      <>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 m">
          <MoviePoster posterPath={poster_path} title={title} />
          <div className="w-full md:w-2/3">
            <MovieInfo 
              title={title} 
              tagline={tagline} 
              releaseDate={release_date} 
              overview={overview} 
            />
            <MovieGenres genres={genres} />
            <MovieStats
              voteAverage={vote_average}
              runtime={runtime}
              budget={budget}
              revenue={revenue}
              spokenLanguages={spoken_languages}
              productionCountries={production_countries}
              productionCompanies={production_companies}
              homepage={homepage}
            />
          </div>
        </div>
      </>
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
