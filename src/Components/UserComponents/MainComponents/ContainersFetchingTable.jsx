import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";



export default function ContainersFetchingTable(props){

    const [containers, setContainers] = useState(null);

    const navigate = useNavigate();

    const index = props.index;
    const parameter = props.parameter;
    const page = props.page;


    useEffect( () => {
        if(parameter === "" && page==="user-home-page"){
            fetch("http://localhost:8080/api/v1/container/container-and-localisation/all-retirieved-containers", {
                        method: 'GET',
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
                        setContainers(data);
                    })
                    .catch((err) => {
                        console.error("Error fetching data: ", err);
                    })
        }
        else if (parameter !== "" && page==="user-home-page"){
            switch(index){
                case(1):
                    fetch("http://localhost:8080/api/v1/container/container-and-localisation/retirieved/" + parameter, {
                        method: 'GET',
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
                        setContainers(data);
                    })
                    .catch((err) => {
                        console.error("Error fetching data: ", err);
                    })
                    break;  
                case(3):
                    fetch("http://localhost:8080/api/v1/container/container-and-localisation/updater/retrieved/" + parameter, {
                        method: 'GET',
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
                        setContainers(data);
                    })
                    .catch((err) => {
                        console.error("Error fetching data: ", err);
                    })
                    break;
                case(4):
                    const yyyy1 = parameter.date1.getFullYear();
                    const mm1 = String(parameter.date1.getMonth() + 1).padStart(2, '0');
                    const dd1 = String(parameter.date1.getDate()).padStart(2, '0');
                    const date1 = (yyyy1+"-"+mm1+"-"+dd1);

                    const yyyy2 = parameter.date2.getFullYear();
                    const mm2 = String(parameter.date2.getMonth() + 1).padStart(2, '0');
                    const dd2 = String(parameter.date2.getDate()).padStart(2, '0');
                    const date2 = (yyyy2+"-"+mm2+"-"+dd2);

                    fetch("http://localhost:8080/api/v1/container/container-and-localisation/interval/retrieved/" + date1 + "/" + date2, {
                        method: 'GET',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("authenticationToken"),
                            "Content-Type": "application/json"
                        }
                    })
                    .then( res => {
                        if (!res.ok){
                            throw new Error("network response was not ok.");
                        }
                        return res.json();
                    })
                    .then( data => {
                        console.log(data);
                        console.log("Fetching done");
                        setContainers(data);
                    })
                    .catch((err) => {
                        console.error("Error fetching data: ", err);
                    })

                    break;
                default:
                    break;
            }
        }
        else if(parameter === "" && page==="archived-containers"){
            fetch("http://localhost:8080/api/v1/container/container-and-localisation/all-archived-containers", {
                        method: 'GET',
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
                        setContainers(data);
                    })
                    .catch((err) => {
                        console.error("Error fetching data: ", err);
                    })
        }
        else if (parameter !== "" && page==="archived-containers"){
            switch(index){
                case(1):
                    fetch("http://localhost:8080/api/v1/container/container-and-localisation/archived/" + parameter, {
                        method: 'GET',
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
                        setContainers(data);
                    })
                    .catch((err) => {
                        console.error("Error fetching data: ", err);
                    })
                    break;
                case(2):
                    const yyyy = parameter.getFullYear();
                    const mm = String(parameter.getMonth() + 1).padStart(2, '0');
                    const dd = String(parameter.getDate()).padStart(2, '0');
                    const date = (yyyy+"-"+mm+"-"+dd);

                    fetch("http://localhost:8080/api/v1/container/container-and-localisation/update-date/archived/" + date, {
                        method: 'GET',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("authenticationToken"),
                            "Content-Type": "application/json"
                        }
                    })
                    .then( res => {
                        if (!res.ok){
                            throw new Error("network response was not ok.");
                        }
                        return res.json();
                    })
                    .then( data => {
                        setContainers(data);
                    })
                    .catch((err) => {
                        console.error("Error fetching data: ", err);
                    })
                    break;
                case(3):
                    fetch("http://localhost:8080/api/v1/container/container-and-localisation/updater/archived/" + parameter, {
                        method: 'GET',
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
                        setContainers(data);
                    })
                    .catch((err) => {
                        console.error("Error fetching data: ", err);
                    })
                    break;
                case(4):
                    const yyyy1 = parameter.date1.getFullYear();
                    const mm1 = String(parameter.date1.getMonth() + 1).padStart(2, '0');
                    const dd1 = String(parameter.date1.getDate()).padStart(2, '0');
                    const date1 = (yyyy1+"-"+mm1+"-"+dd1);

                    const yyyy2 = parameter.date2.getFullYear();
                    const mm2 = String(parameter.date2.getMonth() + 1).padStart(2, '0');
                    const dd2 = String(parameter.date2.getDate()).padStart(2, '0');
                    const date2 = (yyyy2+"-"+mm2+"-"+dd2);

                    fetch("http://localhost:8080/api/v1/container/container-and-localisation/interval/archived/" + date1 + "/" + date2, {
                        method: 'GET',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("authenticationToken"),
                            "Content-Type": "application/json"
                        }
                    })
                    .then( res => {
                        if (!res.ok){
                            throw new Error("network response was not ok.");
                        }
                        return res.json();
                    })
                    .then( data => {
                        console.log("Fetch sent");
                        console.log(data);
                        setContainers(data);
                    })
                    .catch((err) => {
                        console.error("Error fetching data: ", err);
                    })

                    break;
                default:
                    break;
            }
        }
    }, [parameter, index])

    const Redirect = (idNumber) => {
        if(page === "user-home-page"){
            navigate("/container-page/" + idNumber)
        }
        else if(page === "archived-containers"){
            navigate("/archived-container-page/" + idNumber)
        }
    };

    return (
        <div>
            <div className="min-h-recoverybox px-24 py-6 text-sm">
                    <div>
                        <div>
                            <div  className="flex bg-columnGrey font-semibold">
                                <h1 className="w-52 h-8 border pt-1 border-black text-center">Registration number</h1>
                                <h1 className="w-72 h-8 border pt-1 border-black text-center">Last update</h1>
                                <h1 className="w-96 h-8 border pt-1 border-black text-center">Updated by</h1>
                            </div>
                        </div>
                        {containers && <div className="font-semibold">
                            {containers.map((container) => (
                                <button  className="flex bg-white" key={container.id} onClick={() => Redirect(container.container.identificationNumber)}>
                                    <h1 className="w-52 h-8 border pt-1 border-black ">{container.container.identificationNumber}</h1>
                                    {container.localisation && <h1 className="w-72 h-8 border pt-1 border-black ">{container.localisation.date }</h1>}
                                    {!container.localisation && <h1 className="w-72 h-8 border pt-1 border-black ">{"..."}</h1>}

                                    {container.localisation && <h1 className="w-96 h-8 border pt-1 border-black ">{container.localisation.updaterFirstname+" "+container.localisation.updaterLastname}</h1>}
                                    {!container.localisation && <h1 className="w-96 h-8 border pt-1 border-black ">{"..."}</h1>}
                                </button>
                            ))}
                        </div>}
                    </div> 
                </div>
        </div>
    )
}