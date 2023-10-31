import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonList from "../components/pokedex/PokemonList";
import { paginateData } from "../utils/pagination";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const trainerName = useSelector((store) => store.trainerName);

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(pokemonName)
  );

  const { pagesInCurrentBlock, lastPage, itemsInCurrentPage } = paginateData(
    pokemonsByName,
    currentPage
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value.toLowerCase().trim());
  };

  const handleChangeType = (e) => {
    setCurrentType(e.target.value);
  };

  const handlePreviusPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }
  };

  const handleNextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastPage) setCurrentPage(newCurrentPage);
  };

 


  

  //Trae todos los pokemons
  useEffect(() => {
    if (currentType === "") {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=1992")
        .then(({ data }) => setPokemons(data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  //Trae todos los types disponibles para los pokemons
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then(({ data }) => setTypes(data.results))
      .catch((err) => console.log(err));
  }, []);

  //trae todos los pokemons en base a un tipo
  useEffect(() => {
    if (currentType !== "") {
      axios
        .get(`https://pokeapi.co/api/v2/type/${currentType}/`)
        .then(({ data }) => {
          setPokemons(data.pokemon.map((pokemon) => pokemon.pokemon));
        })
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  //? Reseteo de pagina actual al cambiar de tipo
  useEffect(() => {
    setCurrentPage(1);
  }, [currentType]);

  return (
    <main className="bg-slate-200  pb-1  ">
      <section className="pb-3-2">
        
        <div className="flex justify-center ">
          <img  src="/images/headerpokemon.png" alt="" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col  gap-2 justify-center items-center "
        >
          <p className="flex flex-wrap  text-2xl items-center gap-2  text-blue-950 font-semibold">
            Welcome
            <span className=" flex justify-center justify-items-center items-center capitalize font-bold text-2xl text-yellow-400">
              {trainerName} !!
            </span>
          </p>

          <select
              onChange={handleChangeType}
              className="flex justify-center justify-items-center items-center capitalize rounded-xl bg-transparent hover:cursor-pointer outline-none  text-blue-500  font-semibold text-center"
            >
              <option className=" text-slate-500 bgSelect " value="">
                All pokemons
              </option>
              {types.map((type) => (
                <option
                  className="text-slate-500 bgSelect"
                  value={type.name}
                  key={type.url}
                >
                  {type.name}
                </option>
              ))}
            </select>

          <div className=" flex flex-wrap justify-center items-center gap-2 ">
            <input
              className="flex justify-center items-center justify-items-center   right-12 rounded-full outline-none h-[35px] px-3  "
              name="pokemonName"
              type="text"
              placeholder="Filter by pokemon name..."
              autoComplete="off"
            />
            <button className=" flex justify-center border  border-red-500  hover:transition-all text-red-500 hover:duration-[.3s] rounded-full py-1 px-2 w-28 hover:bg-blue-600/90 hover:text-white hover:border-white ">
              Search
            </button>

            
          </div>
        </form>
      </section>

      <PokemonList pokemons={itemsInCurrentPage} />

      <div className="bottom-2 flex justify-center  ">
        <ul className="flex  justify-center items-center gap-3 flex-wrap ">
          {currentPage !== 1 && (
            <li>
              <button className="text-blue-500 " onClick={handlePreviusPage}>
                {"<"}
              </button>
            </li>
          )}
          {pagesInCurrentBlock.map((page) => (
            <li key={page}>
              <button
                onClick={() => setCurrentPage(page)}
                className={`p-2 text-white font-bold rounded-md ${
                  currentPage === page ? "bg-red-600" : "bg-red-400"
                }`}
              >
                {page}
              </button>
            </li>
          ))}
          {currentPage !== lastPage && (
            <li>
              <button className="text-blue-500 " onClick={handleNextPage}>
                {">"}
              </button>
            </li>
          )}
        </ul>
        
      </div>
    </main>
  );
};
export default Pokedex;
