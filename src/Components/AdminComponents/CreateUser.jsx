import { useState } from "react";
import Header from "./Header";
import UsersFetchingTable from "./UsersFetchingTable";
import cocheIcon from '../../static/coche.png';
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";



export default function CreateUser(){

    const[parameter, setParameter] = useState("");

    const[userAlreadyExists, setUserAlreadyExists] = useState(false);

    const[userCreated, setUserCreated] = useState(false);

    const[message, setMessage] = useState(null);

    const[emailForm, setEmailForm] = useState(true);

    const[fetching, setFetching] = useState(false);

    const navigate = useNavigate();

    const[newUser, setNewUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        registrationNumber: "",
        password: "",
        cin: "",
        phonenumber: "",
        role: "USER"
      })
    
    const handleSearch = (searchTerm) => {
        setParameter(searchTerm);
    };

    function isValidEmail(email) {
        setEmailForm(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email));
        return emailForm;
    }

    const validateAllFields = () => {
        if( newUser.firstname.length > 2 
            && newUser.lastname.length > 2
            && newUser.registrationNumber.length > 5
            && newUser.cin.length > 5
            && newUser.phonenumber.length >= 10
            && isValidEmail(newUser.email)){
                return true;
            }
            else{
                return false;
            }
    }

    const submit = () => {
        setUserAlreadyExists(null);
        setMessage(null);
        setFetching(true);
        if(validateAllFields()){
            fetch("http://localhost:8080/api/v1/auth/register", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })
            .then( (res) => {
                if (res.status === 403){
                    setTimeout(() => {
                        setFetching(false);
                        setUserAlreadyExists(true);
                        setMessage(null);
                    }, 400);
                }
                if(res.ok){
                    setFetching(false);
                    setUserCreated(true);
                    setEmailForm(true);
                    setMessage(null);
                    setUserAlreadyExists(false);
                    setNewUser({
                        firstname: "",
                        lastname: "",
                        email: "",
                        registrationNumber: "",
                        password: "",
                        cin: "",
                        phonenumber: "",
                        role: "USER"
                    });
                    setTimeout(() => {
                        navigate("/admin-home-page");
                    }, 2000);
                }
            });
        }
        else{
            if(emailForm===false){
                setFetching(false);
                setMessage("Invalid Email.");
            }
            else{
                setTimeout(() => {
                    setFetching(false);
                    setMessage("Fill all fields correctly.");
                    setUserAlreadyExists(false);
                }, 400);
            }
        }
    };

    return(
        <div className="h-screen bg-background flex flex-col justify-between">   
            <div>
                <Header onChange={handleSearch} page="create user"/>
                {parameter==="" && <main>
                    <div className="flex justify-center">
                        <div className="bg-white h-registerbox flex flex-col justify-center rounded-lg shadow-md mx-6 mt-14 mb-10">
                            <div className="mb-6">
                                <label className="ml-16 text-xl text-blue-900 ">Create User :</label>
                            </div>
                            <div className="mb-4">
                                <input className="text-16 border rounded-md ml-16 w-60 h-40 pl-4 mr-4" placeholder="Firstname" value={newUser.firstname} onChange={(e)=>setNewUser({...newUser, firstname: e.target.value})}></input>
                                <input className="text-16 border rounded-md mr-16 w-60 h-40 pl-4" placeholder="Lastname" value={newUser.lastname} onChange={(e)=>setNewUser({...newUser, lastname: e.target.value})}></input>
                            </div>
                            <div className="mb-4">
                                <input className="text-16 border rounded-md ml-16 w-96 h-40 pl-4" placeholder="Email" value={newUser.email} onChange={(e)=>setNewUser({...newUser, email: e.target.value})}></input>
                            </div>
                            <div className="mb-4">
                                <input className="text-16 border rounded-md ml-16 w-60 h-40 pl-4 mr-4" placeholder="Registration number" value={newUser.registrationNumber} onChange={(e)=>setNewUser({...newUser, registrationNumber: e.target.value})}></input>
                                <input className="text-16 border rounded-md mr-16 w-60 h-40 pl-4" placeholder="CIN" value={newUser.cin} onChange={(e)=>setNewUser({...newUser, cin: e.target.value})}></input>
                            </div>
                            <div className="mb-4 text-16 border rounded-md ml-16 w-96 h-40 pl-4">
                                <div className="pt-2 flex justify-between">
                                    <label className="text-gray-400">Role: </label>
                                    <select className="mr-4" value={newUser.role} onChange={(e)=>setNewUser({...newUser, role: e.target.value})}>
                                        <option value="USER">USER</option>
                                        <option value="ADMIN">ADMIN</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4">
                                <input type="number" className="text-16 border rounded-md ml-16 w-96 h-40 pl-4 pb-2 remove-arrow" placeholder="Phone number" value={newUser.phonenumber} onChange={(e)=>setNewUser({...newUser, phonenumber: e.target.value})}></input>
                            </div>
                            <hr></hr>
                            <div className="mt-2">
                                { userAlreadyExists && <div className="flex justify-center "><h1 className="text-red-400 ">Email or Registration number already in use.</h1></div>}
                                { message && <div className="flex justify-center "><h1 className="text-red-400 ">{message}</h1></div>}
                                { userCreated && <div className="flex justify-center "><h1 className="text-green-500 "><img src={cocheIcon} className="w-8 mr-1 inline"/>User created successfuly</h1></div>}
                                <div className="flex justify-center">
                                    <button className="text-white w-28 h-11 rounded-lg bg-logoBlue font-medium mt-2" onClick={submit}>
                                        {!fetching && <h1>Add User</h1>}
                                        {fetching && <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>}
                                    </button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </main>}
            </div>
            <Footer />
        </div>
    )
}