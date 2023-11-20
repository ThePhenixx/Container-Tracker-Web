

import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import ContainerImage from '../../static/ContainerImage.png';
import updateIcon from '../../static/update.png';
import cancelIcon from '../../static/annuler-la-fleche.png';
import cocheIcon from '../../static/coche.png';
import Popup from "reactjs-popup";
import Footer from "./Footer";



export default function UserUpdatePage(){

    const {id} = useParams();

    const[nonUpdatedUser, setNonUpdatedUser] = useState(null);

    const[user, setUser] = useState(null);

    const[showPopup, setShowPopup] = useState(false);

    const[message, setMessage] = useState(null);

    const[updateMessage, setUpdateMessage] = useState(null);

    const[fetching, setFetching] = useState(false);

    const navigate = useNavigate();

    useEffect( () => {
        fetch("http://localhost:8080/api/v1/users-controller/user/" + id, {
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
            setUser(data);
            setNonUpdatedUser(data);
        })
        .catch((err) => {
            console.error("Error fetching data: ", err);
         }
        )
    }, [])

    function isValidEmail(email) {
        if((/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))){
            return true;
        }
        return false;
    }

    const validateAllFields = () => {
        if(isValidEmail(user.email) === false){
            setMessage("Invalid Email.");  
            return false;
        }
        else if(user.phonenumber.length <= 9){
            setMessage("Fill phone number correctly.")
            return false;
        }   
        else{
            return true;
        }
    }

    const submit = () => {
        if(user.accountNonExpired==="false" || user.accountNonLocked==="false" || user.credentialsNonExpired==="false"){
            user.enabled = "false";
        }

        setFetching(true);
        let request = ({
            registrationNumber: user.registrationNumber,
            email: user.email,
            phonenumber: user.phonenumber,
            accountNonExpired: user.accountNonExpired,
            accountNonLocked: user.accountNonLocked,
            credentialsNonExpired: user.credentialsNonExpired,
            enabled: user.enabled,
            role: user.role
        });

        fetch("http://localhost:8080/api/v1/users-controller/update-user", {
            method: 'PUT',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("authenticationToken"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        })
        .then((res) => {
            if (!res.ok){
                throw new Error("network response was not ok.");
            }
            return res.json();
        })
        .then((data) => {
            setUser(data);
            setNonUpdatedUser(data);
        })
        .catch((err) => {
            console.error("Error fetching data: ", err);
         }
        );

        setTimeout(() => {
            setUpdateMessage(true);
            setFetching(false);
            setTimeout(() => {
                setShowPopup(false);
                navigate("/user-page/" + id);
            }, 1300);
        }, 1300);
    };


    function updateHandler() {
        if(user===nonUpdatedUser){
            setMessage("No changes made.");
        }
        else if (validateAllFields()) {
            setMessage(null);
            setShowPopup(true);
        }
    }

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleCancel = () => {
        navigate("/user-page/" + id);
    };
    
    return(
        <div className="bg-background h-screen flex flex-col justify-between">
            <div>
                <Header />
                { user && 
                    <div className="my-12 mx-60 bg-white rounded-lg shadow-md">
                        <div>
                            <div className="flex flex-col">
                                <div className="mt-6">
                                    <div className="grid grid-cols-10 mt-6">
                                        <div className="grid grid-cols-3 col-span-5">
                                            <div className="col-span-1 ml-6">
                                                <div className="h-14 pt-2 ">
                                                    <label>Registration number: </label>
                                                </div>
                                                <div className="h-14 pt-2 ">
                                                    <label>Full name: </label>
                                                </div>
                                                <div className="h-14 pt-2 ">
                                                    <label>CIN: </label>
                                                </div>
                                                <div className="h-14 pt-2 ">
                                                    <label>Email: </label>
                                                </div>
                                                <div className="h-14 pt-2 ">
                                                    <label>Phone number: </label>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <div className="h-14">
                                                    <input readOnly className="text-16 border rounded-md w-80 h-40 pl-4" placeholder={user.registrationNumber}></input>
                                                </div>
                                                <div className="h-14">
                                                    <input readOnly className="text-16 border rounded-md w-80 h-40 pl-4 mr-4" placeholder={user.firstname + " " + user.lastname}></input>
                                                </div>
                                                <div className="h-14">
                                                    <input readOnly className="text-16 border rounded-md w-80 h-40 pl-4 mr-4" placeholder={user.cin}></input>
                                                </div>
                                                <div className="h-14">
                                                    <input  className="text-16 border rounded-md w-80 h-40 pl-4 mr-4" placeholder="Email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} ></input>
                                                </div>
                                                <div className="h-14">
                                                    <input type="number" className="text-16 border rounded-md w-80 h-40 pl-4 mr-4 remove-arrow" placeholder="Phone number" value={user.phonenumber} onChange={(e)=>setUser({...user, phonenumber: e.target.value})}></input>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-center">
                                            <div className="bg-gray-200 w-line mb-4"></div>
                                        </div>

                                        <div className="grid grid-cols-2 col-span-4">
                                            <div className="col-span-1">
                                                <div className="h-14 pt-2 mr-2">
                                                    <label>Accont non expired: </label>
                                                </div>
                                                <div className="h-14 pt-2 mr-2">
                                                    <label>Account non locked: </label>
                                                </div>
                                                <div className="h-14 pt-2 mr-2">
                                                    <label>Credentials non expired: </label>
                                                </div>
                                                <div className="h-14 pt-2 mr-2">
                                                    <label>Enabled: </label>
                                                </div>
                                                <div className="h-14 pt-2 mr-2">
                                                    <label>Role: </label>
                                                </div>
                                            </div>

                                            <div className="col-span-1">
                                                <div className="h-14">
                                                    <select className="text-16 border rounded-md w-32 h-40 pl-4 mr-4" value={user.accountNonExpired} onChange={(e)=>setUser({...user, accountNonExpired: e.target.value})}>
                                                        <option>true</option>
                                                        <option>false</option>
                                                    </select>
                                                </div>
                                                <div className="h-14">
                                                    <select className="text-16 border rounded-md w-32 h-40 pl-4 mr-4"  value={user.accountNonLocked} onChange={(e)=>setUser({...user, accountNonLocked: e.target.value})}>
                                                        <option>true</option>
                                                        <option>false</option>
                                                    </select>
                                                </div>
                                                <div className="h-14">
                                                    <select className="text-16 border rounded-md w-32 h-40 pl-4 mr-4" value={user.credentialsNonExpired} onChange={(e)=>setUser({...user, credentialsNonExpired: e.target.value})}>
                                                        <option>true</option>
                                                        <option>false</option>
                                                    </select>
                                                </div>
                                                <div className="h-14">
                                                    <select className="text-16 border rounded-md w-32 h-40 pl-4 mr-4" value={user.enabled} onChange={(e)=>setUser({...user, enabled: e.target.value})}>
                                                        <option>true</option>
                                                        <option>false</option>
                                                    </select>
                                                </div>
                                                <div className="h-14">
                                                    <select className="text-16 border rounded-md w-32 h-40 pl-4 mr-4" value={user.role} onChange={(e)=>setUser({...user, role: e.target.value})}>
                                                        <option>USER</option>
                                                        <option>ADMIN</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <hr className="mt-4"></hr>
                                <div className="mt-4">
                                    {message && <div className="flex justify-center">
                                        <h1 className="text-red-400">{message}</h1>
                                    </div>}
                                    <div className="flex justify-center mt-2 mb-4">
                                        <button className="bg-gray-400 rounded-lg py-2 px-4 flex items-center text-white" onClick={handleCancel}>
                                            <img className="w-4 mr-1" src={cancelIcon} alt="delete icon"></img>
                                            Cancel
                                        </button>
                                        <button className="bg-blue-400 rounded-lg py-2 px-4 ml-4 flex items-center" onClick={updateHandler}>
                                            <img className="w-5 mr-1" src={updateIcon} alt="update icon"></img>
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>}
                {showPopup && 
                <div className="flex justify-center items-center bg-slate-300 opacity-60 absolute h-screen w-screen top-0 left-0">
                    <Popup open={showPopup} onClose={closePopup}>
                        { !fetching && !updateMessage && <div className="bg-white rounded-md p-4 shadow-lg border-t-2 border-gray-100">
                            <div className="mb-4"><label>Are you sure to update this user ?</label></div>
                            <div className="flex justify-center">
                                <button className="bg-gray-400 rounded-lg py-1 px-4 ml-4 flex items-center text-white" onClick={closePopup}>Cancel</button>
                                <button className="bg-blue-400 rounded-lg py-1 px-4 ml-4 flex items-center" onClick={submit}>Submit</button>
                            </div>
                        </div>}
                        { fetching && <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>}
                        {updateMessage && !fetching && <div className="bg-white rounded-md p-4 shadow-lg border-t-2 border-gray-100">
                            <h1 className="text-green-400">
                                <img src={cocheIcon} alt="done!" className="w-8 mr-1 inline"/>
                                Updated Successfully.
                            </h1>
                        </div>}
                    </Popup>    
                </div>}
            </div>
            <Footer />
        </div>
    )
}