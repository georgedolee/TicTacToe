import { useState } from "react";
import Score from "./Score";
import Turns from "./Turns";


const MainBox = () => {
    const [table, setTable] = useState([
        ['','',''],
        ['','',''],
        ['','',''],
    ])

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
                            >{cell}</td>
                        ))}
                    </tr>
                ))}
            </table>
            <Turns />
        </div>
    );
}
 
export default MainBox;