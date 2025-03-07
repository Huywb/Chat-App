
import './App.css'
import { Box } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { authStore } from './store/AuthStore'
import { useEffect } from 'react'
import {Loader} from 'lucide-react'

function App() {
  const {authUser,checkAuth,isCheckingAuth} = authStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log({authUser})

  if(isCheckingAuth && !authUser){
    return (
    <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'></Loader>
    </div>)
  }
  return (
    <div>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={authUser ? <Home></Home>: <Navigate to='/login'></Navigate>}></Route>
          <Route path='/signup' element={!authUser ? <Signup></Signup> : <Navigate to='/'></Navigate>}></Route>
          <Route path='/login' element={!authUser ? <Login></Login> : <Navigate to='/'></Navigate>}></Route>
          <Route path='/settings' element={<SettingsPage></SettingsPage>}></Route>
          <Route path='/profile' element={authUser ?  <ProfilePage></ProfilePage> : <Navigate to='/login'></Navigate>}></Route>
        </Routes>
    </div>
  )
}

export default App
