import React, { useState } from "react";
import Layout from "../../components/Layout.js/Layout";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";
import { loginfunc } from "../../components/Layout.js/APIS/apicall";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useAuth } from "../../components/Layout.js/context/auth";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';

const Login = () => {
  const [inputVal, setinputVal] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const setvalue = async (e) => {
    const { name, value } = e.target;
    setinputVal(() => {
      return { ...inputVal, [name]: value };
    });
  };
  const submitData = async (e) => {
    e.preventDefault();
    const { email, password } = inputVal;
    if (email === " " || password === "") {
      toast.error("Please Fill All the Required Field");
    }
    else {
      const data = { email, password };
      const config = {
        "Content-Type": "application/json",
      };
      const result = await loginfunc(data, config);
      //console.log(result);
      if (result.status === 200) {
        setAuth({
          ...auth,
          user: result.data.user, token: result.data.token, role: result.data.role
        });
        localStorage.setItem('auth', JSON.stringify(result.data));
        toast.success("You are successfully LoggedIN");
        navigate(location.state || "/");
      } else {
        toast.error("Either Email ID Or Password Is Wrong ");
      }
    }
  };
  return (
    <>
      <Layout>
        <div className="form-container container-fluid" style={{ minHeight: "100vh" }}>
          <div className="row d-flex justify-content-center align-item-center ">
           
            <div className="col-md-5 mt-5 ">
              <form >
              <h2 className="title text-center" style={{color:"darksalmon"}}><strong > Please Login</strong></h2>
                <div className="mb-3 ">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <strong> Email Address </strong>
                  </label>
                  <input
                    type="email"
                    onChange={setvalue}
                    name="email"
                    className="form-control"
                    required
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email"
                  />
                </div>
                <div className="mb-1 form-group form-inline ">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <strong> Password </strong>
                  </label>
                  <div className="d-flex" style={{ position: "relative" }}>
                    <input
                      type={show ? "text" : "password"}
                      onChange={setvalue}
                      name="password"
                      className="form-control"
                      required
                      id="exampleInputPassword1"
                      placeholder="password"
                    />
                    <span style={{
                      backgroundColor: "transparent",
                      borderRadius: "25px",
                      position: 'absolute',
                      right: "0px",
                      padding: "6px",
                    }} >
                      {show ? (
                      <VisibilityTwoToneIcon onClick={() => setShow(false)} />
                    ) : (
                      <VisibilityOffTwoToneIcon onClick={() => setShow(true)} />
                    )}
                    </span>
                  </div>
                </div>
                <div>
                  <h6> <NavLink to="/resetpassword" style={{ textDecoration: "none" }}> ForGot Password?</NavLink> </h6>
                </div>
                <div className="mb-3 px-2 row  justify-content-center form-group">
                      <button
                        type="submit"
                        className="btn btn-primary bg-secondary"
                        onClick={submitData}
                      >
                        REGISTER
                      </button>
                  
                </div>

              </form>
            </div>
           
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
