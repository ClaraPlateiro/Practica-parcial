import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddGame.css";

const AddGame = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [players, setPlayers] = useState("");
    const [categories, setCategories] = useState("");
    const navigate = useNavigate();

    const handleAddGame = async () => {
        if (!title || !description || !players || !categories) {
            return;
        }
        const response = await fetch("http://localhost:3000/api/games", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, players, categories }),
        });

        if (response.ok) {
            navigate("/");
        }
    }

    return (
        <div>
            <h1>Nuevo juego</h1>
            <div>
                <label>
                    Título:
                    <br />
                    <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    Descripción:
                    <br />
                    <input type="text" name="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <label>
                    Jugadores:
                    <br />
                    <input type="number" name="Jugadores" value={players} onChange={(e) => setPlayers(e.target.value)} required />
                </label>
                <label>
                    Categoria:
                    <br />
                    <input type="text" name="Categoria" value={categories} onChange={(e) => setCategories(e.target.value)} required />
                </label>
            </div>
            <button className="add-button" onClick={handleAddGame}> Agregar Juego </button>
        </div>
    )
};

export default AddGame;
