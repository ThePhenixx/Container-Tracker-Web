import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function UsersFetchingTable(props){

    let parameter = props.parameter;

    const [users, setUsers] = useState(null);

    const navigate = useNavigate();

    useEffect( () => {
        if(parameter !== ""){
            fetch("http://localhost:8080/api/v1/users-controller/retrieved-users/" + parameter, {
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
                setUsers(data);
            })
            .catch((err) => {
                console.error("Error fetching data: ", err);
        })}
        else{
            fetch("http://localhost:8080/api/v1/users-controller/all-retrieved-users", {
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
                setUsers(data);
            })
            .catch((err) => {
                console.error("Error fetching data: ", err);
        })}
    }, [parameter])

    const Redirect = (rgNumber) => {
        navigate("/user-page/" + rgNumber);
    }
    

    return (
        <div>
            <div className="py-6 text-sm font-semibold">
                    <div>
                        <div>
                            <div  className="flex bg-columnGrey">
                                <h1 className="w-44 h-8 border pt-2 border-black text-center">Registration number</h1>
                                <h1 className="w-80 h-8 border pt-2 border-black text-center">Full name</h1>
                                <h1 className="w-52 h-8 border pt-2 border-black text-center">Phone number</h1>
                                <h1 className="w-96 h-8 border pt-2 border-black text-center">Email</h1>
                                <h1 className="w-20 h-8 border pt-2 border-black text-center">Role</h1>
                                <h1 className="w-24 h-8 border pt-2 border-black text-center">Enabled</h1>
                            </div>
                        </div>
                        {users && <div>
                            {users.map((user) => (
                                <div  className="flex bg-white" key={user.uid} onClick={() => {Redirect(user.registrationNumber)}}>
                                    <h1 className="w-44 h-8 border pt-2 border-black pl-5">{user.registrationNumber}</h1>
                                    <h1 className="w-80 h-8 border pt-2 border-black pl-5">{user.firstname + " " + user.lastname}</h1>
                                    <h1 className="w-52 h-8 border pt-2 border-black pl-5">{user.phonenumber}</h1>
                                    <h1 className="w-96 h-8 border pt-2 border-black pl-5">{user.email}</h1>
                                    <h1 className="w-20 h-8 border pt-2 border-black pl-4">{user.role}</h1>
                                    <h1 className="w-24 h-8 border pt-2 border-black pl-6">{(user.enabled).toString()}</h1>
                                </div>
                            ))}
                        </div>}
                    </div> 
                </div>
        </div>
    )
}