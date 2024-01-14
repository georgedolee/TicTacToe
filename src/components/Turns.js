

const Turns = () => {
    return (  
        <div className="grid grid-cols-3 justify-items-center items-center">
            <h1 className="w-[80px] h-[40px] flex items-center justify-center 
                text-xl text-zinc-400 bg-zinc-700 rounded-md shadow-md">X</h1>

            <button className="bg-zinc-700 rounded-md shadow-md text-zinc-400 text-xl px-4 py-2">RESTART</button>

            <h1 className="w-[80px] h-[40px] flex items-center justify-center 
                text-xl text-zinc-400 bg-zinc-700 rounded-md shadow-md">O</h1>
        </div>
    );
}

export default Turns;