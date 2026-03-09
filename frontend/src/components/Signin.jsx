import { useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"

export default function SignIn({userName , setUserName , password , setPassword}){
    const [response , setResponse] = useState("")
    const navigate = useNavigate() 
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-800 gap-4">
                <div className="flex flex-col justify-start">
                    <div className="flex justify-center mb-7 text-cyan-600 text-5xl">
                        Sign In
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

                    <div className="text-pink-200">
                        {response}
                    </div>

                    <button
                        className="bg-cyan-500 w-80 rounded-xl p-2 border-2 border-blue-400 m-2 cursor-pointer"
                        onClick={async () => {
                            const got = await axios.post("http://localhost:3000/api/v1/sign/signin" , {
                                userName : userName , 
                                password : password
                            })
                            setResponse(got.data.message)
                            if(got.data.success){
                                localStorage.setItem("token" , got.data.token)
                                navigate('/content-page')
                            } 
                        }}
                    >
                        SignIn
                    </button>
                    <div className="flex justify-center w-80">
                        <button
                            className="bg-gray-600 w-50 rounded-xl p-2 border-1 border-blue-300 m-1 cursor-pointer"
                            onClick={() => navigate('/')}
                        >
                            New User? 
                        </button>
                    </div>
                    
                </div>
            </div>
    )
}