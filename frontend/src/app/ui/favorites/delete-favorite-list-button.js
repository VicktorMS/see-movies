"use client";
import { useState } from "react";
import { deleteFavoriteList } from "@/app/lib/data";
import { useToast } from '@/app/ui/toast-context';

function DeleteFavoriteListButton({ listId, onUpdate, Icon }) {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { showToast } = useToast();

    const handleDelete = async () => {
        setLoading(true);
        const isDeleted = await deleteFavoriteList(listId, setMessage);
        setLoading(false);

        if (isDeleted && onUpdate) {
            onUpdate(); 
            showToast({
                message: 'Lista excluída com sucesso!',
                style: 'alert-success',
                isVisible: true,
            });
        } else if (!isDeleted) {
            showToast({
                message: 'Erro ao excluir a lista.',
                style: 'alert-error',
                isVisible: true,
            });
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
