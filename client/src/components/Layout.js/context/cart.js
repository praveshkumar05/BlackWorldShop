import { createContext, useEffect, useState } from "react";
const cartContext=createContext();
const CartProvider=({children})=>{
    const [cartItem,setCartItem]=useState([]);
    
    useEffect(()=>{
            setCartItem(JSON.parse(localStorage.getItem("cartItem")) ?? []);
    },[])
      
    return (
        <cartContext.Provider value={[cartItem,setCartItem]}>
                {children}
        </cartContext.Provider> 
    )
}
export {cartContext,CartProvider};