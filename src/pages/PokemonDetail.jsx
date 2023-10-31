import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bgByType, borderByType, textByType } from "../constants/pokemon";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null);

  const { pokemonId } = useParams();

  const getPercentStat = (statValue) => {
    const MAX_STAT_VALUE = 255;
    const percentStat = ((statValue * 100) / MAX_STAT_VALUE).toFixed(1);
    return `${percentStat}%`;
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

 


  return (
    <main className="pt-2 pb-10  px-2 text-center capitalize bg-slate-200 " >
      <div className="flex justify-items-center justify-center pb-24  ">
          <img  src="/images/headerpokemon.png" alt="" />
        </div>
      <article className="max-w-[800px] mx-auto shadow-md rounded-b-md  ">
      
        <header className="p-[0.5px]">
          <div
            className={`${
              bgByType[pokemon?.types[0].type.name]
            } w-full h-16 border rounded-t-md bottom-0`}
          >
            <div className="top-0 w-full -translate-y-2/3 ">
              <img
                className="max-w-[180px] mx-auto block "
                src={pokemon?.sprites.other["official-artwork"].front_default}
                alt=""
              />
            </div>
          </div>
        </header>
        <h3 className="font-semibold text-2xl text-slate-500 ">
          #{pokemon?.id}
        </h3>
        <h2
          className={`${
            textByType[pokemon?.types[0].type.name]
          } font-extrabold text-3xl`}
        >
          {" "}
          {pokemon?.name}{" "}
        </h2>

        <div className="flex justify-center gap-4 p-3 ">
          <div className="flex flex-col  ">
            <h3 className="text-xs">weight</h3>{" "}
            <h4 className=" font-bold  ">{pokemon?.weight}</h4>
          </div>

          <div className="flex flex-col ">
            <h3 className="text-xs">Height</h3>{" "}
            <h4 className="font-bold ">{pokemon?.height}</h4>
          </div>
        </div>

        <div className="grid grid-cols-2 justify-center py-5">
          <div>
          
            <h3 className="p-2 font-medium">Type</h3>
            <div className="flex flex-wrap gap-1 justify-center  ">
              {" "}
              <h4 className={`px-4 ${bgByType[pokemon?.types[0].type.name]} rounded-md`}>
                {pokemon?.types[0].type.name}
              </h4>{" "}
              <h4 className={`${bgByType[pokemon?.types[1]?.type.name]} px-4 rounded-md`}>
                {pokemon?.types[1]?.type.name}
              </h4>
            </div>
          </div>

          <div >
            <h3 className="p-2 font-medium ">Skills</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <h4 className={`${bgByType[pokemon?.types[0].type.name]} px-4 rounded-md`}> {pokemon?.abilities[0].ability.name}</h4>{" "}
              <h4 className={`${bgByType[pokemon?.types[1]?.type.name]} px-4 rounded-md `}> {pokemon?.abilities[1]?.ability.name}</h4>
            </div>
          </div>
        </div>

        {/* stats */}
        <section className="p-2">
          <h3 className="text-start">Stats</h3>
          <ul className="grid gap-4 ">
            {pokemon?.stats.map((stat) => (
              <li className="capitalize " key={stat.stat.name}>
                <div className="flex justify-between items-center  ">
                  <h5>{stat.stat.name}</h5>
                  <span>{stat.base_stat}/255</span>
                </div>
                {/* Total Bar */}
                <div className={`border shadow-sm ${borderByType[pokemon?.types[0].type.name]} rounded-md h-6 overflow-hidden`}>
                  {/* Bar Progress */}
                  <div
                    style={{ width: getPercentStat(stat.base_stat) }}
                    className={`${
                      bgByType[pokemon?.types[0].type.name]
                    }  h-full`}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
};
export default PokemonDetail;
