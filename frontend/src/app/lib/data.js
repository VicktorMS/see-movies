
export async function fetchMovies(setMovies, setMessage) {
    try {
        setMessage("Carregando...");
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies`);
        if (!response.ok) {
            throw new Error("Erro ao buscar filmes");
        }
        const data = await response.json();
        setMovies(data.results);
        setMessage("")
    } catch (error) {
        setMessage(error.message);
    }
}

export async function fetchMovieDetailsById(id) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/${id}`);
    if (!response.ok) {
        throw new Error("Erro ao buscar os detalhes do filme");
    }
    return response.json();
};
