import React from "react";
import "../App.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const DetailsGame = () => {
    const { id } = useParams(); // Extrae el parámetro `id` de la URL
    const [game, setGame] = useState(null);
    const navigate = useNavigate();

    const fetchGame = async () => {
        const response = await fetch(`http://localhost:3000/api/games/${id}`);
        const data = await response.json();
        console.log("Datos recibidos:", data);
        setGame(data[0]);
    };

    useEffect(() => {
        fetchGame();
    }, [id]);

    if (!game) {
        return <div>Cargando los detalles del juego...</div>;
    }


    return (
        <div>
            <button className="button-atras" onClick={() => navigate("/")}>Atrás</button>
            <p>Nombre: {game.title}</p>
            <p>Descripción: {game.description}</p>
            <p>Jugadores: {game.players}</p>
            <p>Categoria: {game.categories}</p>
        </div>
    );
}

export default DetailsGame;