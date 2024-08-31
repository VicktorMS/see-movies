"use client";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchMessage() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
        if (response.ok) {
          const data = await response.json();
          setMessage(data.message); // Substitua 'message' pelo campo correto da resposta da API
        } else {
          setMessage("Failed to fetch message from API");
        }
      } catch (error) {
        console.error("Error fetching message from API:", error);
        setMessage("Error fetching message from API");
      }
    }

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Movies page</h1>
      <p>{message}</p>
    </div>
  );
}
