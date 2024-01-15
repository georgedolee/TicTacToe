

const Turns = ({reset, setPlayers, gameStarted, setGameStarted, currentPlayer}) => {
    const handlePlayers = (player) => {
        if(!gameStarted){
            if(player === 'X'){
                setPlayers({user: 'X', computer: 'O'});
            } else {
                setPlayers({user: 'O', computer: 'X'});
            }
            setGameStarted(true);
        }
    }

    return (  
        <div className="w-[300px] h-[80px] grid items-center grid-cols-3 justify-items-center">
            <button 
                className={`w-[80px] h-[40px] flex items-center 
                text-xl  ${gameStarted? currentPlayer === 'X'? 'bg-zinc-700 text-zinc-400' : 'bg-zinc-400 text-zinc-700 border-2 border-zinc-700' : 'bg-zinc-400 text-zinc-700 border-2 border-zinc-700 hover:bg-zinc-700 hover:text-zinc-400 active:scale-95 '} duration-300 rounded-md shadow-md justify-center ease-in delay-75 `}
                onClick={() => handlePlayers('X')}
            >X</button>
            
            {gameStarted && 
                <button 
                    className="px-4 py-2 text-lg duration-300 ease-in delay-300 rounded-md shadow-md bg-zinc-700 text-zinc-400 hover:bg-zinc-600 active:scale75"
                    onClick={() => reset()}
                >RESTART</button>
            }

            {!gameStarted && 
                <button 
                    className="px-4 py-2 text-lg font-bold duration-300 ease-in delay-300 cursor-default bg-zinc-400 text-zinc-700"
                >Choose <br /> Player</button>
            }

            <button 
                className={`w-[80px] h-[40px] flex items-center 
                text-xl  ${gameStarted? currentPlayer === 'O'? 'bg-zinc-700 text-zinc-400' : 'bg-zinc-400 text-zinc-700 border-2 border-zinc-700' : 'bg-zinc-400 text-zinc-700 border-2 border-zinc-700 hover:bg-zinc-700 hover:text-zinc-400 active:scale-95 '} duration-300 rounded-md shadow-md justify-center ease-in delay-75 `}
                onClick={() => handlePlayers('O')}
            >O</button>
        </div>
    );
}

export default Turns;