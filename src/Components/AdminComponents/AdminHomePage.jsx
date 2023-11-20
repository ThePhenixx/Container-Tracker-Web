import Header from "./Header";
import { useState } from "react";
import UsersFetchingTable from "./UsersFetchingTable";
import Footer from "./Footer";



export default function AdminHomePage(){

    const[parameter, setParameter] = useState("");
    
    const handleSearch = (searchTerm) => {
        setParameter(searchTerm);
    };

    return(
        <div className="bg-background min-h-screen flex flex-col justify-between">   
            <div>
                <Header onChange={handleSearch} page="home"/>
                <main>
                    <div className="flex justify-center">
                        <div className="bg-white w-screen min-h-usersybox flex justify-center shadow-md mx-6 my-6">
                                <UsersFetchingTable parameter={parameter}/>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    )
}