import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import axios from 'axios'
import { Outlet } from 'react-router-dom';
import Spinner from '../../spinner/Spinner';
import { BASE_URL } from '../APIS/baseurl';
const PrivateAdmin = () => {

    const [auth]=useAuth();
    const [ok,setOk]=useState(false);

    useEffect(()=>{

        const authCheck=async()=>{

            const res=await axios.get(`${BASE_URL}/auth/admin-auth`,{
                headers: {
                    Authorization: `${auth.token}`
                  }
            })
            if(res.data.ok){
                setOk(true);
            }

        }
        if(auth?.token)authCheck();


    },[auth?.token])

  return ok?<Outlet/>:<Spinner path=''/>
  
}

export default PrivateAdmin
