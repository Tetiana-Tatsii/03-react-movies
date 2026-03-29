// src/services/movieService.ts
import axios from "axios";
import type { TMDBResponse } from "../types/movie";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    Accept: "application/json",
  },
});

export const fetchMovies = async (query: string): Promise<TMDBResponse> => {
  const response = await apiClient.get<TMDBResponse>("/search/movie", {
    params: {
      query: query,
      include_adult: false,
      language: "en-US",
    },
  });

  return response.data;
};
