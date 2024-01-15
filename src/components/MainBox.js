import { useEffect, useState } from "react";
import Score from "./Score";
import Turns from "./Turns";
import userPlayedSound from '../sounds/userPlayed.wav';
import computerPlayedSound from '../sounds/computerPlayed.wav';
import restartSound from '../sounds/restart.wav';
import gameOverSound from '../sounds/gameOver.wav';

const MainBox = () => {
    const [players, setPlayers] = useState({user: null, computer: null})
    const [gameStarted, setGameStarted] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [moves, setMoves] = useState(9);
    const [winningCells, setWinningCells] = useState({row: null, col: null, digonal: null});
    const [gameEnded, setGameEnded] = useState(false);
    const [score, setScore] = useState({computer: 0, draw: 0, user: 0})
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
            setWinningCells({row: i, col: null, diagonal: null});
            if(newTable[i][0] === players.user) return -10 - c;
            return 10 + c;
          } else if(newTable[0][i] != '' && newTable[0][i] === newTable[1][i] && newTable[1][i] === newTable[2][i]){
            setWinningCells({row: null, col: i, diagonal: null});
            if(newTable[0][i] === players.user) return -10 - c;
            return 10 + c;
          } 
        }
    
        if(newTable[1][1] != ''){
          if(newTable[0][0] === newTable[1][1] && newTable[1][1] === newTable[2][2]){
            setWinningCells({row: null, col: null, diagonal: 'main'});
            if(newTable[1][1] === players.user) return -10 - c;
            return 10 + c;
          } else if(newTable[0][2] === newTable[1][1] && newTable[1][1] === newTable[2][0]){
            setWinningCells({row: null, col: null, diagonal: 'counter'});
            if(newTable[1][1] === players.user) return -10 - c;
            return 10 + c;
          }
        }
        
        setWinningCells({row: null, col: null, diagonal: null});
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
        if(currentPlayer === players.computer && moves != 0 && evaluation(table) === 0){
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
                new Audio(computerPlayedSound).play();
                setTable(newTable);
                setMoves((prev) => prev - 1);
                setCurrentPlayer(players.user);
            }, moves * 100);
        } else if (evaluation(table) !== 0 || moves === 0) {
            new Audio(gameOverSound).play();
            setGameEnded(true);
            let outcome = evaluation(table);
            if (outcome === 0) {
                setScore((prev) => ({ ...prev, draw: prev.draw + 1 }));
            } else if (outcome > 0) {
                setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
            } else {
                setScore((prev) => ({ ...prev, user: prev.user + 1 }));
            }
        }
    }, [table, gameStarted]);

    const handleClick = (i, j) => {
        if(moves != 0 && table[i][j] === '' && currentPlayer === players.user && evaluation(table) === 0){
            const newTable = table.map(row => [...row]);
            newTable[i][j] = players.user;
            new Audio(userPlayedSound).play();
            setTable(newTable);
            setCurrentPlayer(players.computer);
            setMoves((prev) => prev - 1);
        }
    };

    const reset = () => {
        new Audio(restartSound).play();
        setTable([
            ['','',''],
            ['','',''],
            ['','',''],
        ]);
        setPlayers({user: null, computer: null});
        setGameStarted(false);
        setCurrentPlayer('X');
        setMoves(9);
        setGameEnded(false);
    }

    return (  
        <div className="grid row-auto gap-5 p-4 shadow-lg max-sm:scale-90 xl:scale-110 bg-zinc-400">
            <Score score={score}/>
            <table>
                {table.map((row, i) => (
                    <tr key={i} className={`${gameEnded && winningCells.row === i? 'bg-zinc-500 text-zinc-400' : ''} border-b-2 border-zinc-700 last:border-b-0`}>
                        {row.map((cell, j) => (
                            <td 
                                key={j} 
                                className={`${gameEnded && winningCells.col === j ? 'bg-zinc-500 text-zinc-400' : ''} ${gameEnded && winningCells.diagonal === 'main' && i === j ? 'bg-zinc-500 text-zinc-400' : ''} ${gameEnded && winningCells.diagonal === 'counter' && i + j === 2 ? 'bg-zinc-500 text-zinc-400' : ''} active:bg-zinc-500 active:text-zinc-400 h-[100px] w-[100px] text-center text-3xl border-r-2 last:border-r-0 border-zinc-700 cursor-pointer duration-300`}
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