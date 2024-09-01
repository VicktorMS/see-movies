"use client";

import React, { useEffect, useState } from "react";
import Title from "@/app/ui/title";
import MovieList from "../ui/movies/movie-list";

export default function Home() {
  const [movies, setMovies] = useState([]); // Estado para armazenar os filmes
  const [message, setMessage] = useState(""); // Estado para mensagens (erro ou carregando)

  useEffect(() => {
    // Função para buscar os filmes da API
    const fetchMovies = async () => {
      try {
        setMessage("Carregando..."); // Exibe uma mensagem de carregando
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies`); // Usando a variável de ambiente
        if (!response.ok) {
          throw new Error("Erro ao buscar filmes");
        }
        const data = await response.json();
        setMovies(data["results"]); // Armazena os filmes no estado
        setMessage(""); // Limpa a mensagem após carregar
      } catch (error) {
        setMessage(error.message); // Define a mensagem de erro
      }
    };

    fetchMovies();
  }, []); // O array vazio [] faz com que o efeito seja executado apenas uma vez após a montagem

  return (
    <div>
      <Title>Principais Filmes</Title>
      {message && <p>{message}</p>} {/* Exibe a mensagem de erro ou carregando */}
      <MovieList movies={movies}/> {/* Passa os filmes para o componente MovieList */}
    </div>
  );
}
