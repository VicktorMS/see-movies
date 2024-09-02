import axios from 'axios';

// Base Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Accept': 'application/json',
  },
});

// Utility function for sleep (optional, can be removed if not needed)
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Delete a favorite list by ID
export async function deleteFavoriteList(listId, setMessage) {
  try {
    setMessage("Deleting...");
    await api.delete(`/favorites/${listId}`);
    setMessage("Favorite list deleted successfully.");
    return true;
  } catch (error) {
    setMessage(error.message);
    return false;
  }
}

// Search movies by title
export async function searchMovies(movieTitle, setMessage) {
  try {
    setMessage("Searching...");
    const response = await api.get(`/movies/search`, {
      params: { movie_title: movieTitle },
    });
    setMessage("");
    return { results: response.data };
  } catch (error) {
    setMessage(error.message);
    return { results: [] };
  }
}

// Fetch movies with pagination
export async function fetchMovies(page = 0, setMessage) {
  try {
    setMessage("Loading...");
    const response = await api.get('/movies', { params: { page } });
    setMessage("");
    return {
      results: response.data.results,
      hasMore: response.data.results.length > 0,
    };
  } catch (error) {
    setMessage(error.message);
    return { results: [], hasMore: false };
  }
}

// Fetch all favorite lists
export async function fetchFavoriteLists(setFavoriteLists, setMessage) {
  try {
    setMessage("Loading...");
    const response = await api.get('/favorites');
    setFavoriteLists(response.data);
    setMessage("");
  } catch (error) {
    setMessage(error.message);
  }
}

// Fetch movie details by ID
export async function fetchMovieDetailsById(id) {
  try {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch movie details");
  }
}

// Remove a movie from a favorite list
export async function removeMovieFromFavoriteList(listId, movieId, setMessage) {
  try {
    setMessage("Removing...");
    await api.delete(`/favorites/${listId}/remove_movie`, {
      params: { movie_id: movieId },
    });
    setMessage("Movie removed successfully.");
    return true;
  } catch (error) {
    setMessage(error.message);
    return false;
  }
}

// Create a new favorite list
export async function createFavoriteList(name, description) {
  try {
    const response = await api.post('/favorites', {
      name,
      description,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create favorite list:", error);
    return null;
  }
}

// Fetch details of a specific favorite list by ID
export async function fetchFavoriteListDetailsById(id) {
  try {
    const response = await api.get(`/favorites/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch favorite list details");
  }
}

// Add a movie to a favorite list
export async function addMovieToFavoriteList(favoriteListId, externalMovieId, setMessage, setIsSuccess) {
  try {
    setMessage("Adding movie to favorite list...");
    setIsSuccess(false);
    const response = await api.post(`/favorites/${favoriteListId}/add_movie`, null, {
      params: { external_id: externalMovieId },
    });
    setMessage("Movie successfully added to the favorite list!");
    setIsSuccess(true);
    return response.data;
  } catch (error) {
    setMessage(error.message);
    setIsSuccess(false);
  }
}
