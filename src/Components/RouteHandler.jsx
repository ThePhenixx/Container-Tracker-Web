import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHomePage from "./AdminComponents/AdminHomePage";
import Login from "./Authentication/Login";
import UserHomePage from "./UserComponents/UserHomePage";



export default function RouteHandler(){

    const navigate = useNavigate();

    const [component, setComponent] = useState();

    useEffect(() => {
    
        if (localStorage.getItem("user-role") === "ADMIN") {
            setComponent(<AdminHomePage/>);
        }
        else if(localStorage.getItem("user-role") === "USER"){
            setComponent(<UserHomePage/>);
        }
        else{
            setComponent(<Login/>);
        }
    },[localStorage.getItem("authenticationToken")]);

    return(<div>
        {component}
    </div>)
}