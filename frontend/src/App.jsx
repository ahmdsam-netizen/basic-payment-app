import { useEffect, useState } from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import SignUp from './components/Signup'
import SignIn from './components/Signin'
import ContentPage  from './components/Content'
import MyAccount from './components/Myaccount'
import "./App.css"

function App() {
  const [userName , setUserName] = useState("")
  const [password , setPassword] = useState("")
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp userName={userName} setUserName={setUserName} password={password} setPassword={setPassword}/>}/>
        <Route path='/sign-in' element={<SignIn userName={userName} setUserName={setUserName} password={password} setPassword={setPassword}/>}/>
        <Route path='content-page' element={<ContentPage/>}/>
        <Route path='/my-account' element={<MyAccount/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
