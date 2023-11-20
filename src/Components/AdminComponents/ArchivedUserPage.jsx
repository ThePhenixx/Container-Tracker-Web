import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import updateIcon from '../../static/update.png';
import cocheIcon from '../../static/coche.png';
import Popup from "reactjs-popup";
import Footer from "./Footer";



export default function ArchivedUserPage(){

    const {id} = useParams();

    const navigate = useNavigate();

    const[response, setResponse] = useState(null);

    const[fetching, setFetching] = useState(false);

    const[showPopup, setShowPopup] = useState(false);

    const[updateMessage, setUpdateMessage] = useState(false);

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
            setResponse(data);
            console.log(data);
        })
        .catch((err) => {
            console.error("Error fetching data: ", err);
         }
        )
    }, []);

    const submit = () => {
        fetch("http://localhost:8080/api/v1/users-controller/retrieve-user/" + id,
        {
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
        .catch((err) => {
            console.error("Error fetching data: ", err);
         }
        )
        setFetching(true);
        setTimeout(() => {
            setFetching(false);
            setUpdateMessage(true);
            setTimeout(() => {
                setShowPopup(false);
                navigate("/admin-home-page");
            }, 1300);
        }, 1300);
    }

    const handleRetrieve = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setFetching(false);
        setShowPopup(false);
    };
    
    return(
        <div className="bg-background h-screen flex flex-col justify-between">
            <div>
                <Header />
                {showPopup && 
                <div className="flex justify-center items-center bg-slate-300 opacity-60 absolute h-screen w-screen top-0 left-0">
                    <Popup open={showPopup} onClose={closePopup}>
                        { !fetching && !updateMessage && <div className="bg-white rounded-md p-4 shadow-lg border-t-2 border-gray-100">
                            <div className="mb-4"><label>Are you sure to retrieve this user ?</label></div>
                            <div className="flex justify-center">
                                <button className="bg-gray-400 rounded-lg py-1 px-4 ml-4 flex items-center text-white" onClick={closePopup}>Cancel</button>
                                <button className="bg-blue-400 rounded-lg py-1 px-4 ml-4 flex items-center" onClick={submit}>Submit</button>
                            </div>
                        </div>}
                        { fetching && <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>}
                        {updateMessage && !fetching && <div className="bg-white rounded-md p-4 shadow-lg border-t-2 border-gray-100">
                            <h1 className="text-green-400">
                                <img src={cocheIcon} alt="done!" className="w-8 mr-1 inline"/>
                                Retrieved Successfully.
                            </h1>
                        </div>}
                    </Popup>    
                </div>}
                { response && 
                    <div className="my-12 mx-24 bg-white h-userbox rounded-lg shadow-md">
                        <div>
                            <div className="flex flex-col ">
                                <div className="flex justify-center mt-6">
                                    <table className="border border-black">
                                        <tr>
                                            <th className="border border-black w-80 h-10 bg-columnGrey">Registration number</th>
                                            <tr className="border border-black w-300 block h-11 pt-1 text-center">{response.registrationNumber}</tr>
                                        </tr>
                                        <tr>
                                            <th className="border border-black w-80 h-10 bg-columnGrey">Full name</th>
                                            <tr className="border border-black w-300 block h-11 pt-1 text-center">{response.firstname + " " + response.lastname}</tr>
                                        </tr>
                                        <tr>
                                            <th className="border border-black w-80 h-10 bg-columnGrey">Email</th>
                                            <tr className="border border-black w-300 block h-10 pt-1 text-center">{response.email}</tr>
                                        </tr>
                                        <tr>
                                            <th className="border border-black w-80 h-10 bg-columnGrey">CIN</th>
                                            <tr className="border border-black w-300 block h-10 pt-1 text-center">{response.cin}</tr>
                                        </tr>
                                        <tr>
                                            <th className="border border-black w-80 h-10 bg-columnGrey">Phone number</th>
                                            <tr className="border border-black w-300 block h-10 pt-1 text-center">{response.phonenumber}</tr>
                                        </tr>
                                        <tr>
                                            <th className="border border-black w-80 h-10 bg-columnGrey">Account Non Expired</th>
                                            <tr className="border border-black w-300 block h-10 pt-1 text-center">{response.accountNonExpired.toString()}</tr>
                                        </tr>
                                        <tr>
                                            <th className="border border-black w-80 h-10 bg-columnGrey">Account Non Locked</th>
                                            <tr className="border border-black w-300 block h-11 pt-1 text-center">{response.accountNonLocked.toString()}</tr>
                                        </tr>
                                        <tr>
                                            <th className="border border-black w-80 h-10 bg-columnGrey">Credential Non Expired</th>
                                            <tr className="border border-black w-300 block h-10 pt-1 text-center">{response.credentialsNonExpired.toString()}</tr>
                                        </tr>
                                        <tr>
                                            <th className="border border-black w-80 h-10 bg-columnGrey">Account Enabled</th>
                                            <tr className="border border-black w-300 block h-10 pt-1 text-center">{response.enabled.toString()}</tr>
                                        </tr>
                                        <tr>
                                            <th className="border border-black w-80 h-10 bg-columnGrey">Role</th>
                                            <tr className="border border-black w-300 block h-10 pt-1 text-center">{response.role}</tr>
                                        </tr>
                                    </table>
                                </div>
                                <div className="flex justify-end mr-40 mt-4">
                                    <button className="bg-blue-400 rounded-lg py-2 px-4 ml-4 flex items-center" onClick={handleRetrieve}>
                                        <img className="w-5 mr-1" src={updateIcon} alt="retrieve icon"></img>
                                        Retrieve
                                    </button>
                                </div>
                            </div>
                    </div>
                </div>}
            </div>
            <Footer />
        </div>
    )
}