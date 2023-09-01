import { commonrequest } from "./Helper";
import { BASE_URL } from "./baseurl.js";
export const registerfunc = async (data, header) => {
  return await commonrequest("POST", data, header, `${BASE_URL}/auth/register`);
};
export const loginfunc = async (data, header) => {
  return await commonrequest("POST", data, header, `${BASE_URL}/auth/login`);
};
export const updateProfilefunc=async(data,header)=>{
    return await commonrequest("POST",data,header,`${BASE_URL}/auth/updateProfile`)
}
export const authenticateUser = async () => {
  return await commonrequest("GET", "", "", `${BASE_URL}/auth/user-auth`);
};
export const resetpasswordfunc = async (data, header) => {
  return await commonrequest("POST", data, header, `${BASE_URL}/auth/sendlink`);
};
export const updatepasswordfunc = async (data, header) => {
  return await commonrequest(
    "POST",
    data,
    header,
    `${BASE_URL}/auth/updatepassword/${data.id}/${data.token}`
  );
};
export const getCategoryfunc = async () => {
  return await commonrequest("GET", "", "", `${BASE_URL}/category/getcategory`);
};
export const createCategoryfunc = async (data, header) => {
  return await commonrequest(
    "POST",
    data,
    header,
    `${BASE_URL}/category/createCategory`
  );
};
export const updateCategoryfunc = async (data, header) => {
  return await commonrequest(
    "PUT",
    data,
    header,
    `${BASE_URL}/category/updateCategory/${data.id}`
  );
};
export const deleteCategoryfunc = async (data) => {
  return await commonrequest(
    "DELETE",
    data,
    "",
    `${BASE_URL}/category/deleteCategory/${data.id}`
  );
};
export const createProductfunc = async (data,header) => {
  return await commonrequest(
    "POST",
    data,
    header ,
    `${BASE_URL}/product/createProduct`
  );
};
export const updateProductfunc = async (data,header,id) => {
  return await commonrequest(
    "PUT",
    data,
    header ,
    `${BASE_URL}/product/updateProduct/${id}`
  );
};
//products api call
export const getAllproductsfunc = async () => {
  return await commonrequest("GET", "", "", `${BASE_URL}/product/getProduct`);
};
export const getSingleProductfunc=async(data)=>{
  return await commonrequest("GET","","",`${BASE_URL}/product/getProduct/${data}`)
}
export const productDeletefunc = async (data,header) => {
  console.log(data);
  return await commonrequest(
    "DELETE",
    "{}",
    "",
    `${BASE_URL}/product/deleteProduct/${data}`
  );
};
export const getfilteredProduct=async(data)=>{
  return await commonrequest("POST",data,"",`${BASE_URL}/product/filterProduct`)
}

export const getTotalcountfunc=async()=>{
  return await commonrequest("GET","","",`${BASE_URL}/product/product-count`)
}
export const getListPerPagefunc=async(data)=>{
  return await commonrequest("GET","","",`${BASE_URL}/product/product-list/${data}`)
}
export const searchinputFunc=async(data)=>{
    return await commonrequest("GET","","",`${BASE_URL}/product/search/${data}`);
}
export const getsimilarProductfunc=async(data)=>{
  return await commonrequest("GET","","",`${BASE_URL}/product/related-product/${data.pid}/${data.cid}/?page={1}`)
}

export const getProductCategoryWisefunc=async(data)=>{
  return await commonrequest("GET","","",`${BASE_URL}/product/product-category/${data}`)
}
export const getTokenfunc=async()=>{
    return await commonrequest("GET","","",`${BASE_URL}/product/braintree/token`)
}
export const paymentfunc=async(data)=>{
    return await commonrequest("POST",data,"",`${BASE_URL}/product/braintree/payment`)
}   
export const getOrdersfunc=async()=>{
  return await commonrequest("GET","","",`${BASE_URL}/auth/orders`)
}
export const getAllOrdersfunc=async()=>{
  return await commonrequest("GET","","",`${BASE_URL}/auth/all-orders`)
}
export const getOrderStatus=async(data,orderId)=>{
  return await commonrequest("POST",data,"",`${BASE_URL}/auth/order-status/${orderId}`)
}