import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Header (props){

    const navigate = useNavigate();

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


    const redirectHome = () => {
        navigate("/user-home-page");
    };

    const redirectArchived = () => {
        navigate("/archived-container-page");
    };

    const newContainer = () => {
        const now = new Date();
        const isoString = now.toISOString();

        const randomNumber = Math.floor(Math.random() * 1000);
        const newContainer = {
            "containerRequest": {
              "identificationNumber": "C"+randomNumber,
              "sizeAndTypeCode": "sizeAndTypeCode",
              "maximumGrossWeight_Kg": 0,
              "maximumGrossWeight_Lbs": 0,
              "tareWeight_Kg": 0,
              "tareWeight_Lbs": 0,
              "maximumPayload_Kg": 0,
              "maximumPayload_Lbs": 0,
              "capacity_CUM": 0,
              "capacity_CUFT": 0
            },
            "localisationRequest": {
              "latitude": 0,
              "longitude": 0,
              "date": isoString,
              "updaterFirstame": "Mohamed Achraf",
              "updaterLastname": "EL MANSOURI",
              "updaterId": "HH74426"
            }
        };
    
        fetch("http://localhost:8080/api/v1/container/create",{
            method: "POST",
            body: JSON.stringify(newContainer),
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("authenticationToken"),
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
        })
        .catch((err) => {
            console.error("Error fetching data: ", err);
        });
    
    };

    return(
        <div className="flex justify-between items-center h-16 bg-white text-base">
            <div>
                <h1 className="text-logoBlue font-Lalezar text-4xl ml-10 mt-2 cursor-pointer" onClick={redirectHome}>ContainerTracker</h1>
            </div>
            { page === "1" && <div className="flex ml-36 items-center font-medium">
                <button className="hover:text-blue-500" onClick={newContainer}>new</button>
                <button className="ml-10 border-b-2 border-logoBlue text-logoBlue hover:text-blue-500" onClick={redirectHome}>Home</button>
                <button className="ml-10 hover:text-blue-500" onClick={redirectArchived}>Archive</button>
                <button className="ml-10 mr-10 hover:text-blue-500" onClick={logoutClick}>Logout</button>
            </div>}
            { page === "2" && <div className="flex ml-36 items-center font-medium">
                <button className="hover:text-blue-500" onClick={newContainer}>new</button>
                <button className="ml-10 hover:text-blue-500" onClick={redirectHome}>Home</button>
                <button className="ml-10 border-b-2 border-logoBlue text-logoBlue hover:text-blue-500" onClick={redirectArchived}>Archive</button>
                <button className="ml-10 mr-10  hover:text-blue-500" onClick={logoutClick}>Logout</button>
            </div>}
        </div>
    )
}