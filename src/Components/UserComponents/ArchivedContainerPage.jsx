import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import ContainerImage from '../../static/ContainerImage.png';
import cocheIcon from '../../static/coche.png';
import archiveIcon from '../../static/archive.png';
import Popup from "reactjs-popup";



export default function ArchivedContainerPage(){

    const {id} = useParams();

    const[response, setResponse] = useState(null);

    const[showPopup, setShowPopup] = useState(false);

    const[updateMessage, setUpdateMessage] = useState(false);

    const[fetching, setFetching] = useState(false);

    const navigate = useNavigate();

    useEffect( () => {
        fetch("http://localhost:8080/api/v1/container/container-and-localisation/" + id, {
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
        })
        .catch((err) => {
            console.error("Error fetching data: ", err);
         }
        )
    }, [])

    const handleArchive = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    }

    const submit = () => {
        fetch("http://localhost:8080/api/v1/container/retrieve-container/" + id,
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
                navigate("/archived-container-page");
            }, 1300);
        }, 1300);
    }

    return(
        <div className="bg-background h-page">
            <Header page="2"/>
            {showPopup && 
            <div className="flex justify-center items-center bg-slate-300 opacity-60 absolute h-screen w-screen top-0 left-0">
                <Popup open={showPopup} onClose={closePopup}>
                    { !fetching && !updateMessage && <div className="bg-white rounded-md p-4 shadow-lg border-t-2 border-gray-100">
                        <div className="mb-4"><label>Are you sure to archive this container ?</label></div>
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
                <div className="my-12 mx-16 bg-white h-searchbox rounded-lg shadow-md">
                    <div className="grid grid-cols-2">
                        <div className="flex justify-center items-center">
                                <img className="w-container border rounded-lg" src={ContainerImage} alt="container image" />
                        </div>
                        <div className="flex flex-col ">
                            <div className="flex justify-center mt-10">
                                <table className="border border-black">
                                    <tr>
                                        <th className="border border-black w-60 h-10 bg-columnGrey">Identification number:</th>
                                        <tr className="border border-black w-72 block h-11 pt-1 text-center">{response.container.identificationNumber}</tr>
                                    </tr>
                                    <tr>
                                        <th className="border border-black w-60 h-10 bg-columnGrey">Size and type code:</th>
                                        <tr className="border border-black w-72 block h-11 pt-1 text-center">{response.container.sizeAndTypeCode}</tr>
                                    </tr>
                                    <tr>
                                        <th className="border border-black w-60 h-10 bg-columnGrey">Maximum gross weight:</th>
                                        <tr className="border border-black w-72 block h-10 pt-1 text-center">{response.container.maximumGrossWeight_Kg} kg/ {response.container.maximumGrossWeight_Lbs} Lbs</tr>
                                    </tr>
                                    <tr>
                                        <th className="border border-black w-60 h-10 bg-columnGrey">Tare weight:</th>
                                        <tr className="border border-black w-72 block h-10 pt-1 text-center">{response.container.tareWeight_Kg} kg/ {response.container.tareWeight_Lbs} Lbs</tr>
                                    </tr>
                                    <tr>
                                        <th className="border border-black w-60 h-10 bg-columnGrey">Maximum payload:</th>
                                        <tr className="border border-black w-72 block h-10 pt-1 text-center">{response.container.maximumPayload_Kg} kg/ {response.container.maximumPayload_Lbs} Lbs</tr>
                                    </tr>
                                    <tr>
                                        <th className="border border-black w-60 h-10 bg-columnGrey">Capacity:</th>
                                        <tr className="border border-black w-72 block h-10 pt-1 text-center">{response.container.capacity_CUM} CUM/ {response.container.capacity_CUFT} CUFT</tr>
                                    </tr>
                                    <tr>
                                        <th className="border border-black w-60 h-10 bg-columnGrey">Last update:</th>
                                        <tr className="border border-black w-72 block h-11 pt-1 text-center">{response.localisation.date}</tr>
                                    </tr>
                                    <tr>
                                        <th className="border border-black w-60 h-10 bg-columnGrey">Last updater:</th>
                                        <tr className="border border-black w-72 block h-10 pt-1 text-center">{response.localisation.updaterlastname + " " + response.localisation.updaterFirstname}</tr>
                                    </tr>
                                    <tr>
                                        <th className="border border-black w-60 h-10 bg-columnGrey">Localisation</th>
                                        <tr className="border border-black w-72 block h-10 pt-1 text-center">None</tr>
                                    </tr>
                                </table>
                            </div>
                            <div className="flex justify-end mt-4 mr-24">
                                <button className="bg-red-400 rounded-lg py-2 px-4 flex items-center" onClick={handleArchive}>
                                    <img className="w-5 mr-1" src={archiveIcon} alt="delete icon"></img>
                                    Retrieve
                                </button>
                            </div>
                        </div>
                </div>
            </div>}
        </div>
    )
}