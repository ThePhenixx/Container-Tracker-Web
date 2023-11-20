import { useState } from "react";
import { useEffect } from "react";

import rowUp from '../../static/angle-de-la-fleche-droite-up.png';
import rowleft from '../../static/angle-de-la-fleche-droite.png';


export default function LogsTable(props){

    let registrationNumber = props.registrationNumber;

    const [logs, setLogs] = useState(null);
    const [displayedLogs, setDisplayedLogs] = useState([]);

    const [search, setSearch] = useState("");

    const [isOpen, setIsOpen] = useState(
        {
            isOpen: false,
            line: 0
        }
    )

    const [currentLine, setCurrentLine] = useState(0);

    useEffect (() => {
        fetch("http://localhost:8080/api/v1/logs/logs-by-user/"+registrationNumber,
            {
                method: 'GET',
                headers: {
                    // "Authorization": "Bearer " + localStorage.getItem("authenticationToken"),
                    "Content-Type": "application/json"
                }
            })
            .then((res) => {
                if (!res.ok){
                    throw new Error("network response was not ok.");
                }
                return res.json();
            })
            .then((data) => {
                setLogs(data);
                setDisplayedLogs(data);
            })
            .catch((err) => {
                console.error("Error fetching data: ", err);
            }
        )}, []
    )

    const onSearch = (e) => {
        setSearch(e.target.value);
        const filteredLogs1 = logs.filter(log => log.type.includes(e.target.value));
        const filteredLogs2= logs.filter(log => log.date.includes(e.target.value));
        const filteredLogs3= logs.filter(log => log.text.includes(e.target.value));
        const filteredLogs = filteredLogs1.concat(filteredLogs2.concat(filteredLogs3));
        setDisplayedLogs(filteredLogs);
    };

    const onClick = (key) => {
        if(isOpen.isOpen===false){
            setIsOpen({
                isOpen: true,
                line: key
            });
        }
        else if(isOpen.isOpen===true && isOpen.line!==key){
            setIsOpen({
                isOpen: true,
                line: key
            });
        }
        else if(isOpen.isOpen===true && isOpen.line===key){
            setIsOpen({
                isOpen: false,
                line: 0
            });
        }
    };


    return(

        <div>
            <div className="h-logbox w-logbox overflow-y-scroll mt-6 border-2  border-black text-sm">
                {logs && search==="" && <table>
                    <thead className="bg-gray-200">
                        <th className="w-60 border border-white">
                            Action
                        </th>
                        <th className="w-700 border border-white">    
                            Description
                        </th>
                        <th className="w-64 border border-white">
                            time
                        </th>
                    </thead>
                    <tbody>
                        {logs.map((log, index) => (
                            <tr key={index} onClick={() => onClick(index)}>
                                <td className="border border-slate-200 pl-2">
                                    {log.type}
                                </td>
                                {(isOpen.isOpen===false || isOpen.line!==index )&& <td style={{ whiteSpace: 'pre-line' }} className="border border-slate-200 pl-2">
                                    {log.text.split("\n")[0]}
                                </td>}
                                {isOpen.isOpen===true && isOpen.line===index && <td style={{ whiteSpace: 'pre-line' }} className="border border-slate-200 pl-2 bg-slate-300">
                                    {log.text}
                                </td>}
                                <td className="border border-slate-200 text-center">
                                    {log.date}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
                {logs && search!=="" && <table>
                    <thead className="bg-gray-300">
                        <th className="w-60 border border-white">
                            Action
                        </th>
                        <th className="w-300 border border-white">    
                            Description
                        </th>
                        <th className="w-64 border border-white">
                            time
                        </th>
                    </thead>
                    <tbody>
                        {displayedLogs.map((log, index) => (
                            <tr key={index} onClick={() => onClick(index)}>
                                <td className="border border-slate-200 pl-2">
                                    {log.type}
                                </td>
                                {(isOpen.isOpen===false || isOpen.line!==index )&& <td style={{ whiteSpace: 'pre-line' }} className="border border-slate-200 pl-2">
                                    {log.text.split("\n")[0]}
                                </td>}
                                {isOpen.isOpen===true && isOpen.line===index && <td style={{ whiteSpace: 'pre-line' }} className="border border-slate-200 pl-2 bg-slate-300">
                                    {log.text}
                                </td>}
                                <td className="border border-slate-200 text-center">
                                    {log.date}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
            {logs && <div className="mt-4 flex justify-end mr-4">
                <input value={search} placeholder="Logs search" className="h-8 border pl-6 w-96 rounded-sm" onChange={(e) => onSearch(e)}></input>
            </div>}
        </div>



        // <div className="h-logbox w-logbox overflow-y-scroll mt-6 border border-black rounded-lg text-sm">
        //     {logs && <ul>
        //             {(isOpen.isOpen===false) && logs.map((log, index) =>(
        //                 <div onClick={() => extend(index)}>
        //                     {index%2===1 && <div className="flex p-1">
        //                         <img src={rowleft} alt="icon" className="h-2 mt-2 mx-1"></img>
        //                         <li key={index} > 
        //                             {log.slice(0, 130) + "..."}
        //                         </li>
        //                     </div>
        //                     }
        //                     {index%2===0 && <div  className="flex p-1 bg-slate-400">
        //                         <img src={rowleft} alt="icon" className="h-2 mt-2 mx-1"></img>
        //                         <li key={index} > 
        //                             {log.slice(0, 1) + "..."}
        //                         </li>
        //                     </div>
        //                     }
        //                 </div>
        //                 )
        //             )}

        //             {(isOpen.isOpen===true) && logs.map((log, index) =>(
        //                     <li key={index} onClick={() => extend(index)}> 

        //                         {index%2===1 && index!==isOpen.line && <div className="flex p-1">
        //                             <img src={rowUp} alt="icon" className="h-2 mt-2 mx-1"></img>
        //                             <li key={index} > 
        //                                 {log.slice(0, 80) + "..."}
        //                             </li>
        //                         </div>
        //                         }

        //                         {index%2===0 && index!==isOpen.line && <div  className="flex p-1 bg-slate-400">
        //                             <img src={rowUp} alt="icon" className="h-2 mt-2 mx-1"></img>
        //                             <li key={index} > 
        //                                 {log.slice(0, 80) + "..."}
        //                             </li>
        //                         </div>
        //                         }

        //                         {index%2!==0 && index===isOpen.line && <div  className="flex p-1">
        //                             <img src={rowUp} alt="icon" className="h-2 mt-2 mx-1"></img>
        //                             <li key={index} > 
        //                                 {log}
        //                             </li>
        //                         </div>
        //                         }

        //                         {index%2===0 && index===isOpen.line && <div  className="flex p-1 bg-slate-400">
        //                             <img src={rowUp} alt="icon" className="h-2 mt-2 mx-1"></img>
        //                             <li key={index} > 
        //                                 {log}
        //                             </li>
        //                         </div>
        //                         }

        //                     </li>
        //                 )
        //                )}
        //         </ul>}
        // </div>
    )
}