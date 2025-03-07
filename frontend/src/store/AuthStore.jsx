import {create} from 'zustand'
import { AxiosIntance } from '../libs/Axios'

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
    }
}))