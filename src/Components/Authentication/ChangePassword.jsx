import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"



export default function ChangePassword(){

    const {jwt} = useParams();

    const [request, setRequest] = useState(null);

    const [password1, setPassword1] = useState("");

    const [password2, setPassword2] = useState("");

    const navigate = useNavigate();

    const [message, setMessage] = useState(null);

    const passwordValidation= (password1, password2)=>{   //password structure validation function.
       
        if (password1 === "" || password2 === ""){
            setMessage("Fill all fields.");
        }
        else if (password1 !== password2){
            setMessage("Passwords don't match.");
        }
        else {
            const uppercaseRegExp   = /(?=.*?[A-Z])/;
            const lowercaseRegExp   = /(?=.*?[a-z])/;
            const digitsRegExp      = /(?=.*?[0-9])/;
            const specialCharRegExp = /(?=.*?[#?!@$%^&*-.])/;
            const minLengthRegExp   = /.{8,}/;
            const passwordLength =      password1.length;
            const uppercasePassword =   uppercaseRegExp.test(password1);
            const lowercasePassword =   lowercaseRegExp.test(password1);
            const digitsPassword =      digitsRegExp.test(password1);
            const specialCharPassword = specialCharRegExp.test(password1);
            const minLengthPassword =   minLengthRegExp.test(password1);
            if(passwordLength===0){
                    setMessage("Password is empty");
            }
            else if(!minLengthPassword){
                setMessage("At least minumum 8 characters");
            }
            else if(!uppercasePassword){
                    setMessage("At least one Uppercase");
            }
            else if(!lowercasePassword){
                    setMessage("At least one Lowercase");
            }
            else if(!digitsPassword){
                    setMessage("At least one digit");
            }
            else if(!specialCharPassword){
                    setMessage("At least one Special Characters");
            }
            else {
                setMessage("");
            }
        }
    }

    const submitClick = () => {             //Password changign event handler.
        passwordValidation(password1, password2);
        if (message === "" || message === null){
            setRequest({
                "token": jwt,
                "password": password1
            });
        }
    }

    useEffect( () => {
        if (message === ""){
            fetch("http://localhost:8080/api/v1/password-recovery/change-account-password", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(request)
            })
            .then((res) => {
                return res.json(); 
            })
            .then((data) => {
                if (data.status === 200){
                    navigate("/login");
                }
                else{
                    setMessage("Recovery token has been expired");
                };
            });
        }
    }, [request])

    const handlePaste = (e) => {
        e.preventDefault(); // Prevent the default paste behavior
    };

    return (
            <div className=" bg-general h-page">

                <div className="flex flex-col items-center pt-14">
                    <div>
                        <h1 className="font-Lalezar text-logoBlue text-logoSize">ContainerTracker</h1>
                        <h1 className="font-Archivo font-extrabold text-sublogoSize pl-1">The real time tracking tool.</h1>
                    </div>
                    <div className="w-recorybox bg-white mt-16 rounded-lg shadow-md">
                        <div  className="h-12 pt-2 flex ml-12 items-center">
                            <h1 className="text-2xl font-Biryani font-extrabold">Enter new password</h1>
                        </div>
                        <hr/>
                        <div className="ml-12">
                            <div className="mt-3 mb-2">
                                <h1>Please enter your new password.</h1>
                                <input value={password1} onChange={(e) => setPassword1(e.target.value)} type="password" placeholder="New password" className="border border-lightGrey w-500 h-10 mt-3 mb-4 rounded-md pl-4"></input>
                                <input value={password2} onChange={(e) => setPassword2(e.target.value)} type="password" placeholder="Confirm password" onPaste={handlePaste} className="border border-lightGrey w-500 h-10 mt-3 mb-4 rounded-md pl-4"></input>
                            </div>
                        </div>
                        <hr/>
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-red-400 border-b border-red-400">{message}</h1>
                            <button className="border h-12 my-2 w-36 rounded-md bg-lime-700 text-white" onClick={submitClick}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}