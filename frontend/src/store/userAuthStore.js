import {create} from 'zustand'
import API from '../api/axios.js'


export const userAuthStore=create((set)=>({
    user:null,
    loading:true,

    checkStatus:async()=>{
        try {
            const res= await API.get('http://localhost:3000/api/me')
            set({user:res.data.user,loading:false})
         
        } catch (error) {
            set({user:null,loading:false})
        }
    },

    updateUser:(updatedUser)=> set((state)=>({
        user:{...state.user, ...updatedUser}
    })),
    

    clearAuth:()=>set({user:null})
}))