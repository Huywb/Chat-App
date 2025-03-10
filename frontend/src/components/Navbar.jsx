import React from 'react'
import { MessageSquare,Settings,LogIn,User } from 'lucide-react'
import { authStore } from '../store/AuthStore'

const Navbar = () => {
  const {authUser,logout} = authStore()

  const handleLogout = ()=>{
    logout()
  }
  return (
    <div className='flex justify-between p-4 bg-[#090d14] text-white transition duration-300'>
      <div className='flex gap-2 px-2'>
          <MessageSquare className='size-8'></MessageSquare>
          <h1 className='font-bold text-xl'>Chatty</h1>
      </div>
      <div className='flex gap-4'>
          <div className='flex gap-2 items-center cursor-pointer opacity-60 hover:opacity-90 transition-opacity'>
            <Settings className='size-5' />
            <h1 className='font-bold text-md'>Settings</h1>
          </div>    
          {(authUser) ?  
          <>
            <div className='flex gap-2 items-center cursor-pointer opacity-60 hover:opacity-90 transition-opacity'> 
            <User />
            <h1 className='font-bold text-md'>Profile</h1>
          </div>
          <div onClick={handleLogout} className='flex gap-2 items-center cursor-pointer opacity-60 hover:opacity-90 transition-opacity'>
            <LogIn />
            <h1 className='font-bold text-md'>Logout</h1>
          </div>
          </> : <></>}
          
      </div>
      
    </div>
  )
}

export default Navbar
