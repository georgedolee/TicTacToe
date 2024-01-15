

const Turns = () => {
    return (  
        <div className="grid items-center grid-cols-3 justify-items-center">
            <h1 className="w-[80px] h-[40px] flex items-center justify-center 
                text-xl text-zinc-400 bg-zinc-700 rounded-md shadow-md">X</h1>

            <button className="px-4 py-2 text-xl duration-300 rounded-md shadow-md bg-zinc-700 text-zinc-400 hover:bg-zinc-600 active:scale-95">RESTART</button>

            <h1 className="h-[40px] flex items-center 
                text-xl  bg-zinc-700 w-[80px]  text-zinc-400 rounded-md shadow-md justify-center ">O</h1>
        </div>
    );
}

export default Turns;