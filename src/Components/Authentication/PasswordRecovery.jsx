import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"



export default function PasswordRecovery(){

    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState(true);

    const [emailSent, setEmailSent] = useState("not yet");

    const [response, setResponse] = useState(null);

    const navigate = useNavigate();

    function isValidEmail(email) {
        return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email));
    }

    const submitClick = () => {
        setEmailSent("not yet");
        if (isValidEmail(email)){
            setIsValid(true);
            fetch("http://localhost:8080/api/v1/password-recovery/send-recovery-mail/" + email)
            .then( res => {
                return res.json();
            })
            .then((data) => {
                setResponse(data);
                console.log(data);
            });
            
        }
        else{
            setIsValid(false);
        }
    }

    useEffect( () => {
        if(response) {
            if( response.status === 200){
                setEmailSent("success");
            }
            else if (response.status === 500) {
                setEmailSent("failed");
            }
        }
    }, [response])




    const cancelClick = () => {
        navigate("/login");
    }

    return (
            <div className=" bg-general h-page">

                <div className="flex flex-col items-center pt-14">
                    <div>
                        <h1 className="font-Lalezar text-logoBlue text-logoSize">ContainerTracker</h1>
                        <h1 className="font-Archivo font-extrabold text-sublogoSize pl-1">The real time tracking tool.</h1>
                    </div>
                    <div className="w-recorybox bg-white mt-16 rounded-lg shadow-md">
                        <div  className="h-12 pt-2 flex ml-12 items-center">
                            <h1 className="text-2xl font-Biryani font-extrabold">Recover your account.</h1>
                        </div>
                        <hr/>
                        <div className="flex flex-col items-center">
                            {(emailSent==="not yet" || emailSent==="failed") && <div className="mt-3">
                                <h1>Please enter your email address in order to recover your account.</h1>
                                <input value={email} onChange={ (e) => setEmail(e.target.value)} placeholder="Email" className="border border-lightGrey w-500 h-10 mt-3 mb-4 rounded-md pl-4"></input>
                            </div>}
                            {emailSent==="success" && <div className="m-3 justify-center text-xl ">
                                <h1>Email sent successfuly !</h1>
                                <h1>Check you email box for the password recovery link.</h1>
                            </div>}
                        </div>
                        <hr/>
                        <div className="flex flex-col">

                            {isValid && emailSent==="not yet" && <div className="flex justify-center">
                                <button className="border h-12 my-2 w-24 rounded-md bg-lightGrey" onClick={cancelClick}>Cancel</button>
                                <button className="border h-12 my-2 w-24 rounded-md bg-logoBlue mx-3" onClick={submitClick}>Send</button>
                            </div>}

                            {!isValid && emailSent==="not yet" && <div className="flex flex-col justify-center">
                                <div className="flex justify-center">
                                 <h1 className="text-red-400 border-b border-red-400">Invalid Email.</h1>
                                </div>
                                <div className="flex justify-center">
                                    <button className="border h-12 my-2 w-24 rounded-md bg-lightGrey" onClick={cancelClick}>Cancel</button>
                                    <button className="border h-12 my-2 w-24 rounded-md bg-logoBlue mx-3" onClick={submitClick}>Send</button>
                                </div>
                            </div>}

                            {isValid && emailSent==="failed" && <div className="flex flex-col justify-end">
                                <div className="flex justify-center">
                                    <h1 className="text-red-400 border-b border-red-400">No user with such email.</h1>
                                </div>
                                <div className="flex justify-center">
                                    <button className="border h-12 my-2 w-24 rounded-md bg-lightGrey" onClick={cancelClick}>Cancel</button>
                                    <button className="border h-12 my-2 w-24 rounded-md bg-logoBlue mx-3" onClick={submitClick}>Send</button>
                                </div>
                            </div>}

                            {isValid && emailSent==="success" && <div className="flex justify-center">
                                <button className="border h-12 my-2 w-24 rounded-md bg-lightGrey" onClick={cancelClick}>Login</button>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
    )
}