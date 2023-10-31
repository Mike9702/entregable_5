import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bgByType, borderByType, textByType } from "../../constants/pokemon";


const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Link
      to={`/pokedex/${pokemon?.id}`}
      className={`capitalize border-8 rounded-lg img  text-center  ${
        borderByType[pokemon?.types[0].type.name]
      } `}
    >
      
      <header
        className={`${bgByType[pokemon?.types[0].type.name]} h-[140px]`}
      ></header>
      <div className="relative pt-14">
        <div className="absolute top-0 w-full -translate-y-2/3 ">
          <img
            className="max-w-[180px] mx-auto block "
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </div>
        <div >
          <h3
            className={`${
              textByType[pokemon?.types[0].type.name]
            } text-lg font-semibold`}
          >
            {pokemon?.name}
          </h3>
          <span className="text-sm font-semibold">
            {pokemon?.types.map((type) => type.type.name).join(" / ")}
          </span>
          <h5 className="flex flex-col gap-2 font-semibold text-slate-600 text-xs">
            type <hr/>
          </h5>

          <ul className="grid grid-cols-2 text-sm gap-4 p-2 text-slate-600">
            {pokemon?.stats.slice(0, 4).map((stat) => (
              <li className="grid gap-1" key={stat.stat.name}>
                <h6 className="font-semibold">{stat.stat.name}</h6>
                <span
                  className={`${
                    textByType[pokemon?.types[0].type.name]
                  } font-bold`}
                >
                  {stat.base_stat}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
};
export default PokemonCard;
