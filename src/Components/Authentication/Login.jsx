import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import Popup from "reactjs-popup";
import Footer from "../AdminComponents/Footer";


export default function Login(){

    const [request, setRequest] = useState({registrationNumber: "", password: ""});

    const [wrongCredentials, setWrongCredentials] = useState(false)

    const [showPopup, setShowPopup] = useState(false);

    const navigate = useNavigate();

    const loginClick = () => {
            if ( request.registrationNumber !== "" && request.password !== "" ){
                setShowPopup(true);
                setTimeout(() => {
                    fetch("http://localhost:8080/api/v1/auth/authenticate", {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(request)
                })
                .then( (res) => {
                    if (res.status === 403){
                        setWrongCredentials(true);
                        setShowPopup(false);
                    }
                    if(res.ok){
                        return res.json();       // throws the error that is received in the .catch bellow !!!
                    }
                })
                .then( (data) => {
                    localStorage.setItem("authenticationToken", data.activeToken);
                    localStorage.setItem("registrationNumber", data.registrationNumber);
                    localStorage.setItem("user-role", data.role);
                    if(data.role === "USER"){
                        navigate("/user-home-page");
                    }
                    else if(data.role === "ADMIN"){
                        navigate("/admin-home-page");
                    }
                })
                .catch( (err) => {
                    console.log(err);
                });
                },1000);
            }
    }

    const closePopup = () => {
        setShowPopup(false);
    }

    // SUBMIT BY ENTER ISNT WORKING

    // const handleEnter= (e) => {
    //     const keyCode = e.keyCode;
        // if(keyCode === 13){
        //     loginClick();
        //     console.log(keyCode);
        // }
    //     console.log(k)
    // }

    return (
            <div>
                <div className=" xl:grid grid-cols-2 h-screen bg-general">
                    <div className="flex flex-col pt-14 items-center xl:mt-200">
                        <div>
                            <h1 className="font-Lalezar text-logoBlue text-logoSize">ContainerTracker</h1>
                            <h1 className="font-Archivo font-extrabold text-sublogoSize pl-1">The real time tracking tool.</h1>
                        </div>
                    </div>
                    {showPopup && <div className="fflex justify-center items-center bg-slate-300 opacity-60 absolute h-screen w-screen top-0 left-0">
                        <Popup open={showPopup} onClose={closePopup}>
                                    <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>   
                        </Popup>
                    </div>}
                    <div className="flex flex-col items-center mt-10 xl:mt-200">
                        <div className="w-520 bg-white rounded-lg overflow-hidden shadow-lg">
                            <input value={request.registrationNumber} onChange={(e)=>setRequest({...request, registrationNumber: e.target.value})} placeholder="Registration number" className="login-component mt-50 p-4"></input>
                            <br></br>
                            <input value={request.password} onChange={(e)=>setRequest({...request, password: e.target.value})} onkeydown={(e)=>handleEnter(e)} placeholder="Password" type="password" className="login-component mt-25 p-4"></input>
                            <button className="block login-component mt-25 mb-20 bg-logoBlue font-bold text-white" onClick={loginClick}>Login</button>
                            <hr></hr>
                            <div className="flex justify-center mt-3 mb-3">
                                <div>
                                    { wrongCredentials && <h1 className="mb-2 text-red-400">Wrong credentials.</h1>}
                                    <Link className="text-lightGrey border-b" to="/password-recovery" >Forgot password.</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
    )
}