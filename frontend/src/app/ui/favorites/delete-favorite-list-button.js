"use client";
import { useState } from "react";
import { deleteFavoriteList } from "@/app/lib/data";

function DeleteFavoriteListButton({ listId, onUpdate, Icon }) {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Tem certeza que deseja excluir esta lista de favoritos?")) {
            return;
        }

        setLoading(true);
        const isDeleted = await deleteFavoriteList(listId, setMessage);
        setLoading(false);

        if (isDeleted && onUpdate) {
            onUpdate(); // Chama a função para recarregar as listas de favoritos
        }
    };

    return (
        <button onClick={handleDelete} className="w-full">
            <Icon/>
            {loading ? "Excluindo..." : "Excluir Lista"}
        </button>
    );
}

export default DeleteFavoriteListButton;
