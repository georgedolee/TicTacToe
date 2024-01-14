

const Score = () => {
    return (  
        <div className="grid grid-cols-3 gap-1">
            <div className="flex flex-col  items-center bg-zinc-700 rounded-md text-zinc-400 text-md py-2 shadow-md">
                <h1>Computer</h1>
                <p>0</p>
            </div>
            <div className="flex flex-col items-center bg-zinc-700 rounded-md text-zinc-400 text-md py-2 shadow-md">
                <h1>Draw</h1>
                <p>0</p>
            </div>
            <div className="flex flex-col items-center bg-zinc-700 rounded-md text-zinc-400 text-md py-2 shadow-md">
                <h1>You</h1>
                <p>0</p>
            </div>
        </div>
    );
}
 
export default Score;