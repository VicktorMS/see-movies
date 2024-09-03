'use client'
import React, { useState } from "react";
import { MagnifyingGlass, XCircle } from "@phosphor-icons/react";

export default function SearchBar({ onSearch, onClear }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    onClear(); 
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
      {query && (
        <button type="button" onClick={handleClear} className="btn btn-secondary ml-2">
          <XCircle />
        </button>
      )}
      <button type="submit" className="btn btn-primary ml-2">
        <MagnifyingGlass />
      </button>
    </form>
  );
}
