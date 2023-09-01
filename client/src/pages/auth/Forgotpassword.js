import React, { useState } from "react";
import Layout from "../../components/Layout.js/Layout";
import  {toast} from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";
import { updatepasswordfunc } from "../../components/Layout.js/APIS/apicall";
import { useNavigate,useParams} from "react-router-dom";
const Forgotpassword = () => {
  const [inputVal, setinputVal] = useState({
    password: "",
  });
  const {id,token}=useParams();
  const navigate = useNavigate();
  const setvalue = async (e) => {
    const { name, value } = e.target;
    setinputVal(() => {
      return { ...inputVal, [name]: value };
    });
  };
  const submitData = async (e) => {
    e.preventDefault();
    const {  password } = inputVal;
    if ( password === "") {
      toast.error("Please Fill All the Required Field");
    } else {
      const data = { password,id,token };
      const config = {
        "Content-Type": "application/json",
      };
      const result = await updatepasswordfunc(data, config);
      //console.log(result);
      if (result.status === 201) {
        toast.success("You Password is updated successfully");
        navigate("/login");
      } 
      else {
        toast.error("There is some error try again please");
      }
    }
  };
  return (
    <>
       <Layout>
        <div className="form-container container-fluid" style={{ minHeight: "100vh" }}>
          <div className="row d-flex justify-content-center align-item-center ">
            <div className="col-md-5 mt-5 ">
              <form>
              <h2 className="title text-center" style={{color:"darksalmon"}}><strong > Enter Your New Password</strong></h2>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword" className="form-label">
                    <strong>Password</strong>
                  </label>
                  <input
                    type="Password"
                    onChange={setvalue}
                    name="Password"
                    className="form-control"
                    required
                    id="exampleInputPassword"
                  />
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
    </>)
};


export default Forgotpassword;
