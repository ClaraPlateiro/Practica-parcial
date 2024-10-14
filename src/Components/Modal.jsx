
import Modal from "react-modal";
import React from "react";
import "./Modal1.css";

const NewGameModal = ({ isOpen, onRequestClose, newGame, handleChange, handleSubmit}) => {

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="modal-overlay"
            className="modal-content"
            ariaHideApp={false}
        >
            <h2>{newGame.id ? "Editar Juego" : "Nuevo Juego"}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Título:
                    <br />
                    <input type="text" name="title" value={newGame.title} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Descripción:
                    <br />
                    <input type="text" name="description" value={newGame.description} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Jugadores:
                    <br />
                    <input type="text" name="players" value={newGame.players} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Categorías:
                    <br />
                    <input type="text" name="categories" value={newGame.categories} onChange={handleChange} required />
                </label>
                <button type="submit">Guardar</button>
                <button type="button" onClick={onRequestClose}>Cancelar</button>
            </form>
        </Modal>
    );
};

export default NewGameModal;