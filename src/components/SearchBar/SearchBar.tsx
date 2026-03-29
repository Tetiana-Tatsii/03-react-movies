import { type FormEvent } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

// Тепер ми просто вказуємо тип пропсів ось так, без React.FC:
const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Дістаємо значення з інпуту
    const form = e.currentTarget;
    const query = (
      form.elements.namedItem("query") as HTMLInputElement
    ).value.trim();

    // Перевіряємо, чи не порожній рядок
    if (query === "") {
      toast.error("Please enter your search query.");
      return;
    }

    // Передаємо слово в головний компонент і очищаємо форму
    onSubmit(query);
    form.reset();
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
