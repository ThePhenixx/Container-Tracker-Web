import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loupeIcon from '../../static/loupe-arrondie.png';



export default function Header (props){

    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const onSearch = props.onChange;

    const page = props.page;

    const logoutClick = () => {
        fetch("http://localhost:8080/api/v1/auth/logout", {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("authenticationToken"),
                "Content-Type": "application/json"
            }
        })
        .catch((err) => {
            console.error("Error fetching data: ", err);
        })

        localStorage.removeItem("authenticationToken");
        localStorage.removeItem("registrationNumber");
        localStorage.removeItem("user-role");
        navigate("/login");
    };

    const searchBarChange = (e) => {
            onSearch(e.target.value);
    };


    const redirectHome = () => {
        navigate("/admin-home-page");
    };

    const redirectCreateUser = () => {
        navigate("/create-user");
    };

    const redirectArchive = () => {
        navigate("/archived-users");
    };

    return(
        <div className="flex justify-between items-center h-16 bg-white">
            <div>
                <h1 className="text-logoBlue font-Lalezar text-4xl ml-10 mt-2 cursor-pointer" onClick={redirectHome}>ContainerTracker</h1>
            </div>
            { (page==="home" || page==="archive") && <div className="ml-52">
                <div className="relative flex items-center">
                    <input 
                        value={searchTerm} 
                        className="h-10 w-64 pl-4 border rounded-lg" 
                        placeholder="Search User" 
                        onChange={(e)=>{
                            setSearchTerm(e.target.value);
                            searchBarChange(e);
                        }}
                    />
                    <img alt="loupe" src={loupeIcon} className="h-5 absolute left-56 top-3" />
                </div>
            </div>}
            {page==="home" && 
            <div className="flex ml-36 items-center font-medium">
                <button className="text-logoBlue border-b-2 border-logoBlue hover:text-blue-500" to="/create-user" onClick={redirectHome}>Active Users</button>
                <button className="ml-10 hover:text-blue-500" to="/create-user" onClick={redirectArchive}>Archive</button>
                <button className="ml-10 hover:text-blue-500" to="/create-user" onClick={redirectCreateUser}>Create User</button>
                <button className="ml-10 mr-10 hover:text-blue-500" onClick={logoutClick}>Logout</button>
            </div>}
            {page==="archive" && 
            <div className="flex ml-36 items-center font-medium">
                <button className="hover:text-blue-500" to="/create-user" onClick={redirectHome}>Active Users</button>
                <button className="ml-10 text-logoBlue border-b-2 border-logoBlue hover:text-blue-500" to="/create-user" onClick={redirectArchive}>Archive</button>
                <button className="ml-10 hover:text-blue-500" to="/create-user" onClick={redirectCreateUser}>Create User</button>
                <button className="ml-10 mr-10 hover:text-blue-500" onClick={logoutClick}>Logout</button>
            </div>}
            {page==="create user" && 
            <div className="flex ml-36 items-center font-medium">
                <button className="hover:text-blue-500" to="/create-user" onClick={redirectHome}>Active Users</button>
                <button className="ml-10 hover:text-blue-500" to="/create-user" onClick={redirectArchive}>Archive</button>
                <button className="ml-10 text-logoBlue border-b-2 border-logoBlue hover:text-blue-500" to="/create-user" onClick={redirectCreateUser}>Create User</button>
                <button className="ml-10 mr-10 hover:text-blue-500" onClick={logoutClick}>Logout</button>
            </div>}
            {!page && 
            <div className="flex ml-36 items-center font-medium">
                <button className="hover:text-blue-500" to="/create-user" onClick={redirectHome}>Active Users</button>
                <button className="ml-10 hover:text-blue-500" to="/create-user" onClick={redirectArchive}>Archive</button>
                <button className="ml-10 hover:text-blue-500" to="/create-user" onClick={redirectCreateUser}>Create User</button>
                <button className="ml-10 mr-10 hover:text-blue-500" onClick={logoutClick}>Logout</button>
            </div>}
        </div>
    )
}