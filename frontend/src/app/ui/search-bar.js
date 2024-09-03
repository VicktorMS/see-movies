'use client'
import React, { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center grow h-full">
      <input
        type="text"
        className="input input-bordered w-full max-w-md"
        placeholder="Busque por um filme..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="btn btn-primary ml-2">
        <MagnifyingGlass/>
      </button>
    </form>
  );
}
