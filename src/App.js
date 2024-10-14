import React from 'react';
import { useState, useEffect } from 'react';
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ShowGames from "./Components/ShowGames";
import DetailsGame from "./Components/DetailsGame";
import AddGame from "./Components/AddGame";


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<ShowGames />} />
          <Route path="/game/:id" element={<DetailsGame />} />
          <Route path="/game/addGame" element={<AddGame />} />
        </Routes>
    </BrowserRouter>
    )
};

export default App;
