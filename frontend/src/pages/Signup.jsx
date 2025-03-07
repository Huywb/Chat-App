import React, { useState } from 'react'
import { authStore } from '../store/AuthStore'
import { Box } from '@mui/material'
import { MessageSquare, User } from 'lucide-react'

const Signup = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [formData,setFormData] = useState({
    fullname: '',
    email: '',
    password: ''
  })

  const {signup, isSignUp} = authStore()

  const validateForm = ()=>{

  }

  const handleSubmit = (e)=>{
    e.preventDefault()
  }

  return (
    <div className='min-h-screen gird lg:grid-cols-2'>
        <div className='flex flex-col justify-center items-center p-6 sm:p-12'>

            <div className='w-full max-w-md space-y-8'>

              <div className='text-center mb-8 '>
                  <div className='flex flex-col items-center gap-2 group'>
                    <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                        <MessageSquare className='size-6 text-primary'></MessageSquare>
                    </div>
                    <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
                    <p className='text-base-content/60'>Get started with your free account</p>
                  </div>
              </div>

              <form onSubmit={handleSubmit} className='space-y-6'>  
              <div className='form-controll'>
                <label className='label'>
                  <span className='label-text font-medium'>Full Name</span>
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <User className='size-5 text-base-content/40'></User>
                  </div>
                  <input type="text" className={`input input-bordered w-full pl-10`}  placeholder='ACC' value={formData.fullname} onChange={(e)=>{setFormData({...formData,fullname:e.target.value})}}/>

                </div>
              </div>

              </form>

            </div>

        </div>
    </div>
  )
}

export default Signup
