import Header from "./Header";
import { useState } from "react";
import SearchByIdNumber from "./MainComponents/SearchByIdNumber";
import SearchByUpdater from "./MainComponents/SearchByUpdater";
import SearchByDateInterval from "./MainComponents/SearchByDateInterval";


export default function ArchivedContainers(){

    const [index, setIndex] = useState(1);

    return(
        <div className="bg-background min-h-screen">   
            <Header page="2"/>
            <main >
            { index === 1 && <div>
                <div className="flex justify-center mt-8">
                    <div className="flex justify-between">
                        <h1 className="w-40 mt-2">Search By:</h1>
                        <button className="w-48 h-12 rounded-t-lg bg-white mr-2" onClick={() => setIndex(1)}>Identification number</button>
                        <button className="w-48 h-12 rounded-t-lg bg-headersGrey mr-2" onClick={() => setIndex(3)}>Updater</button>
                        <button className="w-48 h-12 rounded-t-lg bg-headersGrey mr-2" onClick={() => setIndex(4)}>Date interval</button>
                    </div>
                </div>
                <div>
                    <SearchByIdNumber index={index} page="archived-containers"/>
                </div>
            </div>}
            { index === 3 && <div>
                <div className="flex justify-center mt-8">
                    <div className="flex justify-between">
                        <h1 className="w-40 mt-2">Search By:</h1>
                        <button className="w-48 h-12 rounded-t-lg bg-headersGrey mr-2" onClick={() => setIndex(1)}>Identification number</button>
                        <button className="w-48 h-12 rounded-t-lg bg-white mr-2" onClick={() => setIndex(3)}>Updater</button>
                        <button className="w-48 h-12 rounded-t-lg bg-headersGrey mr-2" onClick={() => setIndex(4)}>Date interval</button>
                    </div>
                </div>
                <div>
                    <SearchByUpdater index={index} page="archived-containers"/>
                </div>
            </div>}
            { index === 4 && <div>
                <div className="flex justify-center mt-8">
                    <div className="flex justify-between">
                        <h1 className="w-40 mt-2">Search By:</h1>
                        <button className="w-48 h-12 rounded-t-lg bg-headersGrey mr-2" onClick={() => setIndex(1)}>Identification number</button>
                        <button className="w-48 h-12 rounded-t-lg bg-headersGrey mr-2" onClick={() => setIndex(3)}>Updater</button>
                        <button className="w-48 h-12 rounded-t-lg bg-white mr-2" onClick={() => setIndex(4)}>Date interval</button>
                    </div>
                </div>
                <div>
                    <SearchByDateInterval index={index} page="archived-containers"/>
                </div>
            </div>}
            </main>
        </div>
    )
}