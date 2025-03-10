import React, { useState } from 'react'
import { authStore } from '../store/AuthStore'
import { Box } from '@mui/material'
import { MessageSquare, User, Eye,EyeOff,Lock,Mail } from 'lucide-react'
import AuthImagePattern from '../components/AuthImage'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const Signup = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [formData,setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })

  const {signup, isSignUp} = authStore()

  const validateForm = ()=>{
    if(!formData.fullName.trim()) return toast.error("Full name is required")
    if(!formData.email.trim()) return toast.error("Email is required")
    if(!formData.password) return toast.error("Password is required")
    if(formData.password.length < 6) return toast.error("Password at least 6 charactor")
    
    return true
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    const success = validateForm(formData)
    console.log(success)
    if(success == true) {
      signup(formData)
    }
  }

  return (
    <div className='h-screen grid lg:grid-cols-2 bg-[#263238] overflow-hidden'>
        <div className='   flex flex-col text-white justify-center items-center p-6 sm:p-12'>
            <div className='flex opacity-70 flex-col min-w-[70%]'>
                <div className='flex flex-col gap-4 items-center justify-center'>
                    <MessageSquare className='size-10 '></MessageSquare>
                    <h1 className='font-bold text-2xl'>Create Account</h1>
                    <p>Get started with your free account</p>
                </div>

                <div className='flex flex-col gap-2 mt-6'>
                  <label className='font-bold'>Full name</label>
                  <div className='flex gap-1 p-2 border-1'>
                      <User className='size-5'></User>           
                      <input type="text" onChange={(e)=>{setFormData({...formData,fullName: e.target.value})}} className='border-none outline-none w-full' placeholder='ACC' />
                  </div>
                </div>

                <div className='flex flex-col gap-2 mt-6'>
                  <label className='font-bold'>Email</label>
                  <div className='flex gap-1 p-2 border-1'>
                      <Mail className='size-5'></Mail>           
                      <input type="text" onChange={(e)=>{setFormData({...formData,email: e.target.value})}}  className='border-none outline-none w-full' placeholder='Email@gmail.com' />
                  </div>
                </div>

                <div className='flex flex-col gap-2 mt-6'>
                  <label className='font-bold'>Password</label>
                  <div className='flex gap-1 p-2 border-1 relative'>
                      <Lock className='size-5'></Lock>           
                      <input type={`${showPassword ? 'text' : 'password'}`}  onChange={(e)=>{setFormData({...formData,password: e.target.value})}}  className='border-none outline-none w-full' placeholder='********' />
                      <div className='absolute right-0 px-2 cursor-pointer' onClick={(e)=>{setShowPassword(!showPassword)}}>
                        {showPassword ? <Eye className='size-5'></Eye> : <EyeOff className='size-5'></EyeOff>}
                      </div>
                  </div>
                </div>

                <div onClick={(e)=>handleSubmit(e)} className='flex justify-center mt-4 w-full bg-[#6069d2] p-3 rounded-md font-bold cursor-pointer'>
                  <button className='w-full'>Create Account</button>
                </div>

                <div className='flex justify-center opacity-80 mt-4'>
                  <p>Already have an account? <Link to='/login'>Sign in</Link></p>
                </div>
            </div>
        </div>

        <div className='flex flex-col justify-center items-center  m-4 rounded-md bg-[#090d14]'>
          <AuthImagePattern  
              title="Join our community"
              subtitle="Connect with friends, share moments, and stay in touch with your loved ones.">
          </AuthImagePattern>
        </div>

    </div>
  )
}

export default Signup
