

const Score = () => {
    return (  
        <div className="grid grid-cols-3 gap-1">
            <div className="flex flex-col items-center py-2 rounded-md shadow-md bg-zinc-700 text-zinc-400 text-md">
                <h1>Computer</h1>
                <p>0</p>
            </div>
            <div className="flex flex-col items-center py-2 rounded-md shadow-md bg-zinc-700 text-zinc-400 text-md">
                <h1>Draw</h1>
                <p>0</p>
            </div>
            <div className="flex flex-col items-center py-2 rounded-md shadow-md bg-zinc-700 text-zinc-400 text-md">
                <h1>You</h1>
                <p>0</p>
            </div>
        </div>
    );
}
 
export default Score;