import { useRef } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  // Створюємо ref, щоб мати доступ до форми для її очищення
  const formRef = useRef<HTMLFormElement>(null);

  // Функція тепер приймає FormData, а не FormEvent
  const handleSubmit = (formData: FormData) => {
    // Дістаємо значення інпуту за його name ("query")
    const query = formData.get("query")?.toString().trim() || "";

    // Перевіряємо на порожній рядок
    if (query === "") {
      toast.error("Please enter your search query.");
      return;
    }

    // Передаємо запит наверх і очищаємо форму через ref
    onSubmit(query);
    formRef.current?.reset();
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
        {/* Замість onSubmit використовуємо сучасний атрибут action */}
        <form ref={formRef} className={css.form} action={handleSubmit}>
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
