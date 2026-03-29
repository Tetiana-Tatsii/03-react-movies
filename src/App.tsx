import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import MovieGrid from "./components/MovieGrid/MovieGrid";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import MovieModal from "./components/MovieModal/MovieModal"; // Імпортуємо модалку
import { fetchMovies } from "./services/movieService";
import { type Movie } from "./types/movie";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // НОВИЙ СТАН: зберігаємо тут фільм, на який клікнули (або null, якщо модалка закрита)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setError(false);
      setIsLoading(true);

      const data = await fetchMovies(query);

      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(data.results);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Функція для відкриття модалки
  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  // Функція для закриття модалки
  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {error && <ErrorMessage />}

      {movies.length > 0 && <MovieGrid movies={movies} onSelect={openModal} />}

      {/* Якщо є вибраний фільм - малюємо модалку! */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}

      <Toaster position="top-right" />
    </div>
  );
};

export default App;
