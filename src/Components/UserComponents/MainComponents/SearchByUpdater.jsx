import { useState } from "react";
import ContainersFetchingTable from "./ContainersFetchingTable";


export default function SearchByUpdater(props) {

    const [idNumber, setIdNumber] = useState("");

    const [search, setSearch] = useState("");

    let index = props.index;

    const page = props.page;

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    return(
        <div className="flex justify-center">
            <div className="bg-white min-h-searchbox flex-row justify-center rounded-lg shadow-md">
                <div className="flex justify-center mt-8">
                    <input value={idNumber} onChange={(e) => {
                        setIdNumber(e.target.value);
                        handleSearch(e);
                    }} onKeyDown={(e) => handleSearch(e)} className="h-10 w-64 pl-4 border rounded-lg" placeholder="Identification number"></input>
                </div>
                <ContainersFetchingTable index={index} parameter={search} page={page} />
            </div>
        </div>
    )
}