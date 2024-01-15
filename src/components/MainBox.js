import { useEffect, useState } from "react";
import Score from "./Score";
import Turns from "./Turns";

const MainBox = () => {
    const [players, setPlayers] = useState({user: null, computer: null})
    const [gameStarted, setGameStarted] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [moves, setMoves] = useState(9);
    const [table, setTable] = useState([
        ['','',''],
        ['','',''],
        ['','',''],
    ])

    function evaluation(newTable){
        let c = 0;
        for(let i = 0; i < table.length; i++){
            for(let j = 0; j < table.length; j++){
                if(newTable[i][j] === ''){
                    c++;
                }
            }
        }
    
        for(let i = 0; i < table.length; i++){
            if(newTable[i][0] != '' && newTable[i][0] === newTable[i][1] && newTable[i][1] === newTable[i][2]){
                if(newTable[i][0] === players.user) return -10 - c;
                return 10 + c;
            } else if(newTable[0][i] != '' && newTable[0][i] === newTable[1][i] && newTable[1][i] === newTable[2][i]){
                if(newTable[0][i] === players.user) return -10 - c;
                return 10 + c;
            } 
        }
    
        if(newTable[1][1] != ''){
            if(newTable[0][0] === newTable[1][1] && newTable[1][1] === newTable[2][2]){
                if(newTable[1][1] === players.user) return -10 - c;
                return 10 + c;
            } else if(newTable[0][2] === newTable[1][1] && newTable[1][1] === newTable[2][0]){
                if(newTable[1][1] === players.user) return -10 - c;
                return 10 + c;
            }
        }
    
        return 0;
    }

    function minimax(newTable, moves, alfa, beta, maximizingPlayer){
        let e = evaluation(newTable);
        if(moves === 0 || e != 0){
            return e;
        } 
        
        let resEval = (maximizingPlayer)? -100: 100;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(newTable[i][j] === ''){
                    newTable[i][j] = (maximizingPlayer)? players.computer: players.user; 
                    let point = (maximizingPlayer)? minimax(newTable, moves - 1, alfa, beta, false): minimax(newTable, moves - 1, alfa, beta, true);
                    resEval = (maximizingPlayer)? Math.max(resEval, point): Math.min(resEval, point);
                    newTable[i][j] = '';
                    (maximizingPlayer)? alfa = Math.max(alfa, point): beta = Math.min(beta, point);
                    if(beta <= alfa){
                        break;
                    }
                }
            }
        }
        
        return resEval;
    }

    useEffect(() => {
        if(currentPlayer === players.computer && moves != 0){
            const newTable = table.map(row => [...row]);
            const currentMoves = moves;
            let maxMove = -100;
            let c1, c2;
            for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    if(newTable[i][j] === ''){
                        newTable[i][j] = players.computer;
                        let mm = minimax(newTable, currentMoves - 1, -100, 100, false);
                        if(mm > maxMove){
                            maxMove = mm;
                            c1 = i;
                            c2 = j;
                        }
                        newTable[i][j] = '';
                    }
                }
            }
            newTable[c1][c2] = players.computer;
            setTimeout(() => {
                setTable(newTable);
                setMoves((prev) => prev - 1);
                setCurrentPlayer(players.user);
            }, 1000);
            
        }
    }, [currentPlayer, gameStarted]);

    const handleClick = (i, j) => {
        if(moves != 0 && table[i][j] === ''){
            const newTable = table.map(row => [...row]);
            newTable[i][j] = players.user;
            setTable(newTable);
            setCurrentPlayer(players.computer);
            setMoves((prev) => prev - 1);
        }
    };

    const reset = () => {
        setTable([
            ['','',''],
            ['','',''],
            ['','',''],
        ]);
        setPlayers({user: null, computer: null});
        setGameStarted(false);
        setCurrentPlayer('X');
        setMoves(9);
    }

    return (  
        <div className="grid row-auto gap-5 p-4 shadow-lg bg-zinc-400">
            <Score />
            <table>
                {table.map((row, i) => (
                    <tr key={i} className="border-b-2 border-zinc-700 last:border-b-0">
                        {row.map((cell, j) => (
                            <td 
                                key={j} 
                                className="h-[100px] w-[100px] text-center text-3xl border-r-2 last:border-r-0 border-zinc-700 cursor-pointer hover:bg-zinc-500 duration-300"
                                onClick={() => handleClick(i, j)}
                            >{cell}</td>
                        ))}
                    </tr>
                ))}
            </table>
            <Turns reset={reset} setPlayers={setPlayers} gameStarted={gameStarted} setGameStarted={setGameStarted} currentPlayer={currentPlayer} />
        </div>
    );
}
 
export default MainBox;