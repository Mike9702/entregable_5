import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemons }) => {
  
  return (
    
    <section className="  grid grid-cols-[repeat(auto-fit,_270px)] gap-4 justify-center max-w-[1000px] mx-auto pt-4 pb-2 ">
       
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url}  />
      ))}
        
    </section>
  );
};
export default PokemonList;
