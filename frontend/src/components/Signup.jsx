import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function SignUp({userName , setUserName , password , setPassword}){
    const [response , setResponse] = useState("")
    const [firstName , setFirstName] = useState("")
    const [lastName , setLastName] = useState("")

    const navigate = useNavigate() ;
    return(
        <div className="flex">
            <div className="flex flex-col items-center justify-center w-1/2 h-screen bg-gray-800 gap-4">
                <div className="flex flex-col justify-start">
                    <div className="flex justify-center mb-7 text-cyan-600 text-5xl">
                        SignUp
                    </div>
                    <div className="text-white m-2">
                        Username
                    </div>

                    <input
                        className="bg-cyan-100 w-80 rounded-xl p-2 border-2 border-blue-400 m-2"
                        type="text"
                        placeholder="eg. app_user"
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    <div className="text-white m-2">
                        Password
                    </div>

                    <input
                        className="bg-cyan-100 w-80 rounded-xl p-2 border-2 border-blue-400 m-2"
                        type="password"
                        placeholder="strong password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="text-white m-2">
                        First Name
                    </div>

                    <input
                        className="bg-cyan-100 w-80 rounded-xl p-2 border-2 border-blue-400 m-2"
                        type="text"
                        placeholder="first_name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <div className="text-white m-2">
                        Last Name
                    </div>

                    <input
                        className="bg-cyan-100 w-80 rounded-xl p-2 border-2 border-blue-400 m-2"
                        type="text"
                        placeholder="last_name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <div className="text-red-500">
                        {response}
                    </div>
                    
                    <button
                        className="bg-cyan-500 w-80 rounded-xl p-2 border-2 border-blue-400 m-2 cursor-pointer"
                        onClick={
                            async () => {
                                const got = await axios.post("http://localhost:3000/api/v1/sign/signup" , {
                                        userName : userName ,
                                        firstName : firstName ,
                                        lastName : lastName ,
                                        password : password ,
                                    })
                                setResponse(got.data.message)
                                if(got.data.success){
                                    localStorage.setItem("token" , got.data.token)
                                    navigate('/content-page')
                                } 
                            }
                        }
                    >
                        SignUp
                    </button>
                    <div className="flex justify-center w-80">
                        <button
                            className="bg-gray-600 w-50 rounded-xl p-2 border-1 border-blue-300 m-1 cursor-pointer"
                            onClick={() => navigate('/sign-in')}
                        >
                            Already Registered? 
                        </button>
                    </div>
                    
                </div>
            </div>
            <div className="flex flex-col items-center justify-center w-1/2 h-screen bg-cyan-100 gap-4">
                <div className="text-4xl m-2">
                    From this : 
                    "Talk is cheap , show me your code"
                    To this :
                    "Code is cheap , show me your prompt"
                </div>
                <div className="w-full flex justify-end pr-10">
                    ~Linus
                </div>
            </div>
        </div>
    )
}