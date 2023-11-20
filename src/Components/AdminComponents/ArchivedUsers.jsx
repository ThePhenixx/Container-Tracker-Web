import Header from "./Header";
import { useState } from "react";
import ArchivedUsersFetchingTable from "./ArchivedUsersFetchingTable";
import Footer from "./Footer";



export default function ArchivedUsers(){

    const[parameter, setParameter] = useState("");
    
    const handleSearch = (searchTerm) => {
        setParameter(searchTerm);
    };

    return(
        <div className="bg-background min-h-screen flex flex-col justify-between">   
            <div>
                <Header onChange={handleSearch} page="archive"/>
                <main>
                    <div className="flex justify-center">
                        <div className="bg-white min-h-usersybox w-screen flex justify-center shadow-md mx-6 mt-6 mb-6">
                                <ArchivedUsersFetchingTable parameter={parameter}/>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    )
}