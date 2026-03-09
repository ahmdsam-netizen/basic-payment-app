import axios from "axios"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"

export default function ContentPage(){
    const [data , setData] = useState([]) 
    const [search , setSearch] = useState("")
    const [amount , setAmount] = useState(0) 
    const [to , setTo] = useState("")
    const [response , setResponse] = useState("") 

    const navigate = useNavigate() 

    useEffect(() => {
        async function getter(){
            const got = await axios.get("http://localhost:3000/api/v1/feature/search?filter=" + search)
            setData(got.data.user)
        }
        getter() 
    } , [search])

    return(
        <div className="flex flex-col bg-gray-200 h-screen">
            <div className="flex justify-between">
                <div className="text-teal-400 text-2xl p-2 m-2">
                    SayMate
                </div>
                <div className="flex justify-end">
                    <button className="bg-cyan-500 rounded-xl p-2 border-2 border-blue-400 m-2 cursor-pointer"
                        onClick={() => {
                            navigate("/my-account")
                        }}
                    >
                        My account 
                    </button>
                    <button className="bg-cyan-500 rounded-xl p-2 border-2 border-blue-400 m-2 cursor-pointer">
                        Other
                    </button>
                </div>
            </div>
            
            
            <div className="grid grid-cols-12">
                <div className="col-span-9">
                    <button className="bg-emerald-400 rounded-xl p-2 m-2 cursor-pointer"
                        onClick={async () => {
                            const got = await axios.patch("http://localhost:3000/api/v1/feature/send" , {
                                amount : amount ,
                                to : to 
                            } , {
                                headers : {
                                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                                }
                            })
                            setResponse(got.data.message) 
                    }}>
                        Transfer Money
                    </button>
                    <br />
                    <input 
                        className="bg-cyan-100 rounded-xl p-2 border-2 border-blue-400 m-2"
                        type="text" 
                        placeholder="insert amount" 
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                    />
                    <br />

                    <input 
                        className="bg-cyan-100 rounded-xl p-2 border-2 border-blue-400 m-2"
                        type="text" 
                        placeholder="enter receiver user name" 
                        onChange={(e) => setTo(e.target.value)}
                    />
                    <br />
                    <div>
                        {response}
                    </div>
                </div>
                
                <div className="bg-zinc-300 rounded m-2 col-span-3">
                    <input 
                        className="bg-gray-300 rounded-xl p-2 border-2 border-gray-100 m-2"
                        type="text" 
                        placeholder="Search Users"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="text-sky-700 m-2">
                        User found as per filter : 
                    </div>
                    {data.map((user) => (
                        <div>
                            <div 
                                className="bg-gray-600 m-2 p-2 rounded-xl"
                                key={user.userId}>
                                Username : {user.userName}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            
        </div>
    )
}