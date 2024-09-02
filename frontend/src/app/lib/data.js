function sleep(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

export async function deleteFavoriteList(listId, setMessage) {
  try {
    setMessage("Excluindo...");
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/favorites/${listId}`, {
      method: 'DELETE',
      headers: {
        'Accept': '*/*',
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir a lista de favoritos");
    }

    setMessage("Lista de favoritos excluída com sucesso.");
    return true;
  } catch (error) {
    setMessage(error.message);
    return false;
  }
}


export async function searchMovies(movieTitle, setMessage) {
  try {
    setMessage("Buscando...");
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/search?movie_title=${encodeURIComponent(movieTitle)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar filmes");
    }

    const data = await response.json();
    setMessage("");
    return {
      results: data, // Retornando os resultados como uma propriedade do objeto
    };
  } catch (error) {
    setMessage(error.message);
    return { results: [] }; // Retorna um objeto vazio em caso de erro
  }
}

export async function fetchMovies(page = 0, setMessage) {
  try {
      setMessage("Carregando...");
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies?page=${page}`);
      if (!response.ok) {
          throw new Error("Erro ao buscar filmes");
      }
      const data = await response.json();
      setMessage("");
      return {
          results: data.results,
          hasMore: data.results.length > 0, // Se houver filmes retornados, então há mais páginas
      };
  } catch (error) {
      setMessage(error.message);
      return { results: [], hasMore: false }; // Retorna um objeto vazio em caso de erro
  }
}

export async function fetchFavoriteLists(setFavoriteLists, setMessage) {
    try {
        setMessage("Carregando...");
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/favorites`);
        if (!response.ok) {
            throw new Error("Erro ao buscar lista de favoritos");
        }
        const data = await response.json();
        setFavoriteLists(data);
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

export async function removeMovieFromFavoriteList(listId, movieId, setMessage) {
  try {
    setMessage("Removendo...");
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/favorites/${listId}/remove_movie/?movie_id=${movieId}`, {
      method: 'DELETE',
      headers: {
        'Accept': '*/*',
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao remover o filme da lista de favoritos");
    }

    setMessage("Filme removido com sucesso.");
    return true;
  } catch (error) {
    setMessage(error.message);
    return false;
  }
}


export async function createFavoriteList(name, description){
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/favorites`; 
    const requestBody = {
      name: name,
      description: description,
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao criar a lista de favoritos');
      }
  
      const data = await response.json();
      console.log('Lista de favoritos criada com sucesso:', data);
      return data;
    } catch (error) {
      console.error('Erro na requisição:', error);
      return null;
    }
  };
  
export async function fetchFavoriteListDetailsById(id) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/favorites/${id}`);
  if (!response.ok) {
      throw new Error("Erro ao buscar os detalhes do filme");
  }
  return response.json();
};


export async function addMovieToFavoriteList(favoriteListId, externalMovieId, setMessage, setIsSuccess) {
  try {
    setMessage("Adding movie to favorite list...");
    setIsSuccess(false);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/favorites/${favoriteListId}/add_movie/?external_id=${externalMovieId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Failed to add movie to favorite list");
    }

    const data = await response.json();
    setMessage("Movie successfully added to the favorite list!");
    setIsSuccess(true);

    return data;
  } catch (error) {
    setMessage(error.message);
    setIsSuccess(false);
  }
}

