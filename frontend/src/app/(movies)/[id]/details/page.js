import Title from "@/app/ui/title";
import { fetchMovieDetailsById } from "@/app/lib/data";

export default async function Page({ params }) {
  const { id } = params;

  try {
    const movie_details = await fetchMovieDetailsById(id);

    return (
      <main>
        <Title>{movie_details?.title}</Title>
        {/* Render movie details here */}
      </main>
    );
  } catch (error) {
    return (
      <main>
        <Title>Erro ao carregar o filme</Title>
        <p>{error.message}</p>
      </main>
    );
  }
}
