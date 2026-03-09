import axios from "axios"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"

export default function MyAccount(){
    const [data , setData] = useState({})
    const navigate = useNavigate() 

    useEffect(() => {
        async function getter(){
            const response = await axios.get("http://localhost:3000/api/v1/feature/my-data" , {
                headers : {
                    'Authorization' : 'Bearer ' +  localStorage.getItem("token")
                }
            }) ;
            setData({
                userId : response.data.userId ,
                userName : response.data.userName ,
                firstName : response.data.firstName ,
                lastName : response.data.lastName ,
                amount : response.data.amount ,
                transactionHistory : response.data.transactionHistory
            })
        }
        getter() 
    } , [])

    return(
        <div>
            <div>
                <button 
                    className="bg-cyan-500 rounded-xl p-2 border-2 border-blue-400 m-2 cursor-pointer"
                    onClick={() => navigate("/content-page")}>
                    Back to Home
                </button>
            </div>
            <div>
                User-name : {data.userName}
            </div>
            <div>
                Name : {data.firstName}_{data.lastName}
            </div>
            <div>
                Current-Amount : {data.amount} 
            </div>
            <div>
                My - Id : {data.userId}
            </div>
            <div>
                Trasaction History : 
                {data.transactionHistory?.map((transaction) => (
                    <div key={transaction._id}>
                        <div>
                            TransactionId : {transaction._id}
                        </div>
                        <div>
                            SenderId : {transaction.senderId}
                        </div>
                        <div>
                            ReceiverId : {transaction.counterParty}
                        </div>
                        <div>
                            Transaction amount : {transaction.amount}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}