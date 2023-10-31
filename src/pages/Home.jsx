import { useDispatch } from "react-redux";
import { setTrainerName } from "../store/slices/trainerName.slice";
import { useNavigate } from "react-router-dom";



const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerName(e.target.trainerName.value));
    navigate("/pokedex");
  };

  return (
    <main id="background" className=" background min-h-screen grid gap-4 items-center py-12  justify-items-center " >
      
      <section className="grid text-center border-[6px] border-black/70   items-center bg-slate-400 bg-opacity-80 w-[305px] h-[460px] rounded-3xl md:w-[720px] md:transition-all md:duration-[.3s] " >
        <div className="grid relative justify-items-center  " >
        <div className="flex absolute  -bottom-28 right-1 md:right-0 ">
            <img className="h-32 " src="/images/pokeballhome.png" alt="" />
          </div>
          <div className="flex  absolute -top-56 md:-top-[250px] p-2 ">
            <img className="h-40 md:h-52 md:w-86  " src="/images/headerpokemon.png" alt="" />
          </div>
          
          
          <h3 className="font-semibold text-2xl">Hello Trainer!</h3>
        
          <form className="grid gap-4 p-6 " onSubmit={handleSubmit}>
            
            <input className=" shadow-md w-[250px] md:w-[500px] md:transition-all md:duration-[.3s] rounded-xl px-2 py-2 border-[2px] placeholder-black  border-blue-800/70 outline-none bg-transparent text-center " name="trainerName" type="text" placeholder="Give me your name to start..."  required autoComplete="off"/>
          
           
            <div className="grid items-center justify-center justify-items-center"> <button className="bg-red-600 rounded-md w-40 h-10 font-semibold  shadow-md shadow-slate-700 hover:bg-red-500  hover:text-white hover:transition-colors hover:duration-300 ">Go!</button></div>
           
          </form>
        </div>
      </section>
      <footer></footer>
    </main>
  );
};
export default Home;
