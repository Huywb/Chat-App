import {create} from 'zustand'
import { AxiosIntance } from '../libs/Axios'
import toast from 'react-hot-toast'

export const authStore = create((set)=>({
    authUser : null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdateingProfile: false,


    isCheckingAuth:true,

    checkAuth: async()=>{
        try {
            const res =await AxiosIntance.get('/auth/check')
            set({authUser: res.data})
        } catch (error) {
            console.log("Error in checkAuth",error)
            set({authUser:null})            
        }finally{
            set({isCheckingAuth: false})
        }
    },

    signup: async(data)=>{
        set({isSigningUp: true})
        try {
            const res = await AxiosIntance.post("/auth/register",data)
            set({authUser: res.data})
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response.data.message)

        }finally {
            set({isSigningUp: false})
        }
    },
    login: async(data)=>{
        set({isLoggingIn:true})
        try {
            const res = await AxiosIntance.post("/auth/login",data)
            set({authUser: res.data})
            toast.success("Login successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    logout: async()=>{
        try {
            await AxiosIntance.post("/auth/loguot")
            set({authUser:null})
            toast.success("Logout successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}))