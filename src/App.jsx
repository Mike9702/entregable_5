import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import PokemonDetail from "./pages/PokemonDetail";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:pokemonId" element={<PokemonDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
