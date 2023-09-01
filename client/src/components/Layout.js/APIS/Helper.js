import axios from 'axios'
export const commonrequest=async (methods,body,header,url)=>{
    let config={
        method:methods,
        data:body,
        headers:header?header:{"Content-Type":"application/json"},
        url  
    }
    return axios(config).then((data)=>{
        return data
    }).catch((error)=>{
        return error
    })       
}