import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Policy from "./pages/Policy";
import Contact from "./pages/Contact";
import Pagenofound from "./pages/Pagenofounf";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import Dashboard from "./pages/user/Dashboard";
import Resetpassword from "./pages/auth/Resetpassword";
import Forgotpassword from "./pages/auth/Forgotpassword";
import { PrivateRoute } from "./components/Layout.js/Routes/Private";
import Admindashboard from "./pages/Admin/Admindashboard";
import PrivateAdmin from "./components/Layout.js/Routes/PrivateAdmin";
import Createcategory from "./pages/Admin/Createcategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Order from "./pages/user/Order";
import Profile from "./pages/user/Profle";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import SearchPage from "./pages/auth/SearchPage";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/Admin/CategoryProduct";
import Cartpage from "./pages/Cartpage";
import AdminOrder from "./pages/Admin/AdminOrder";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={ <Categories/>} />
        <Route path="/cart" element={<Cartpage/>}/>
        <Route path="/category/:slug" element={ <CategoryProduct/>} />
        <Route path="/product/:slug" element={<ProductDetail/>}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/dashboard" element={<PrivateAdmin/>}>
              <Route path="admin" element={ <Admindashboard/> }/>
              <Route path="admin/orders" element={ <AdminOrder/> }/>
              <Route path="admin/create-category" element={ <Createcategory/> }/>
              <Route path="admin/create-product" element={ <CreateProduct/> }/>
              <Route path="admin/users" element={ <Users/> }/>
              <Route path="admin/products" element={<Products/>}/>
              <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
        </Route>
        <Route path="/dashboard" element={<PrivateRoute/>} >
            <Route path="user" element={ <Dashboard/> }/>
            <Route path="user/order" element={<Order/>}/>
            <Route path="user/orders" element={ <Order/> }/>
            <Route path="user/profile" element={ <Profile/> }/>
        </Route>
        <Route path="/resetpassword" element={<Resetpassword/>} />
        <Route path="/forgotpassword/:id/:token" element={<Forgotpassword/>} />
        <Route path="/*" element={<Pagenofound />} />
      </Routes>
    </>
  );
};

export default App;
