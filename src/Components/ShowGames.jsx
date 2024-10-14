import React, { useState, useEffect } from "react";
import Card from "./Card";
import "../App.css";
import { useNavigate } from "react-router-dom";
import NewGameModal from "./Modal";

const getGames = async () => {
    const gamesFetch = await fetch("http://localhost:3000/api/games");
    const games = await gamesFetch.json();
    return games;
  };

const ShowGames = () => {
    const [games, setGames] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [players, setPlayers] = useState("");
    const [categories, setCategories] = useState("");
    const [editingGame, setEditingGame] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const refreshGames = async () => {
        const updatedGames = await getGames();
        setGames(updatedGames);
      };
    
      useEffect(() => {
        refreshGames();
      }, []);

    const handleDelete = async (id) => {
        await fetch(`http://localhost:3000/api/games/${id}`, { method: 'DELETE' });
        setGames(games.filter((game) => game.id !== id));
    };

    const handleClick = (id) => {
        navigate(`/game/${id}`);
    };
    
    const handleClickAdd = () => {
        navigate(`/game/addGame`);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingGame(null);
        setTitle("");
        setDescription("");
        setPlayers("");
        setCategories("");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "title") {
            setTitle(value);
        } else if (name === "description") {
            setDescription(value);
        } else if (name === "players") {
            setPlayers(value);
        } else if (name === "categories") {
            setCategories(value);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    /*const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log({ title, description, players, categories }); 
            const response = await fetch("http://localhost:3000/api/games", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description, players, categories }),
            });

            if (!response.ok) {
                throw new Error("Error al crear el juego");
            }

            const createdGame = await response.json();
            setGames([...games, createdGame]);
            handleCloseModal();
        } catch (error) {
            console.error("Error al crear el juego:", error);
        }
    };*/

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingGame ? "PUT" : "POST";
        const url = editingGame ? `http://localhost:3000/api/games/${editingGame.id}` : "http://localhost:3000/api/games";
        const gameData = { title, description, players, categories };

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(gameData),
            });

            if (!response.ok) {
                throw new Error("Error al crear o editar el juego");
            }

            const updatedGame = await response.json();
            setGames((prevGames) => {
                if (editingGame) {
                     // Si estamos editando un juego existente
                    return prevGames.map((game) => (game.id === updatedGame.id ? updatedGame : game));
                } else {
                    // Si estamos creando un nuevo juego
                    return [...prevGames, updatedGame];
                }
            });
            handleCloseModal();
        } catch (error) {
            console.error("Error al crear o editar el juego:", error);
        }
    };

    const handleEdit = (game) => {
        setEditingGame(game);
        setTitle(game.title);
        setDescription(game.description);
        setPlayers(game.players);
        setCategories(game.categories);
        setIsModalOpen(true);
    };

    const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1 className="tittle">Juegos Olímpicos de París 2024</h1>
            <div className="search-container">
                <input className="search-input" type="text" placeholder="Buscar juegos..." value={searchTerm} onChange={handleSearchChange}/>
            </div>
            <div className="button-container">
            <button className="button-nuevo" onClick={handleOpenModal}>Nuevo Juego</button>
            <button className="button-nuevo" onClick={() => handleClickAdd()}>Nuevo Juego URL</button>
            </div>
            <div className="card-container">
                {filteredGames.map((game) => {
                    return (
                        /*sin filtro games.map((game) =>*/
                        <div className="card-item" key={game.id}>
                            <Card className="titulo-card" title={game.title} refreshGames={refreshGames}/>
                            <div><button className="delete-button" onClick={() => handleClick(game.id)}>Detalle</button></div>
                            <div><button className="delete-button" onClick={() => handleDelete(game.id)}>Borrar</button></div>
                            <div><button className="delete-button" onClick={() => handleEdit(game)}>Editar</button></div>
                        </div>
                    );
                })}
            </div>
            <NewGameModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                newGame={{ title, description, players, categories }}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                ariaHideApp={false}
            />
        </div>
    );
};

export default ShowGames;