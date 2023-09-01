import React, { useEffect } from 'react'
import Layout from '../../components/Layout.js/Layout'
import { useAuth } from '../../components/Layout.js/context/auth'
import { useNavigate } from 'react-router-dom'
import { toast,Toaster } from 'react-hot-toast'
const Logout = () => {
    const [auth,setAuth]=useAuth();
    const navigate=useNavigate();
    useEffect(()=>{
             setAuth(
                {
                    ...auth,
                    user:null,
                    token:''
                }
             )
             localStorage.removeItem('auth');
             toast.success('you are logged out')
            navigate('/login')  ;
    },[])
  return (
    <div>
       
        
    </div>
  )
}

export default Logout
