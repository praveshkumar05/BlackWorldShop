import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout.js/Layout";
import Usermenu from "../../components/Layout.js/Usermenu";
import { toast } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { updateProfilefunc } from "../../components/Layout.js/APIS/apicall";
import "../auth/register.css"
import { useAuth } from "../../components/Layout.js/context/auth";
const Profile = () => {
  const [inputVal, setinputVal] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "0"
  });
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    //const {name,email,password,phone ,address}=auth.user;
    //console.log(auth.user);
    setinputVal(auth?.user);
  }, [])
  const setvalue = async (e) => {
    const { name, value } = e.target;
    setinputVal(() => {
      return { ...inputVal, [name]: value };
    });
  };
  const submitData = async (e) => {
    e.preventDefault();
    const { name, phone, address } = inputVal;
    {
      const Data = { name, phone, address };
      const config = {
        "Content-Type": "application/json",
      };
      const { data } = await updateProfilefunc(Data, config);

      if (data.success) {
        setAuth({ ...auth, user: data?.user });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.user;
        localStorage.setItem('auth', JSON.stringify(ls));
        toast.success("Your Profile is updated");
      }
      else {
        toast.error(`${data.message}`);
      }
    }
  };
  return (
    <Layout>
      <div className="container-fluid   ">
        <div className="row ">
          <div className="col-md-3 bg-secondary  p-5">
            <Usermenu />
          </div>
          <div className="col-md-9 form-container">
            <form>
              <h4 className="title text-center text-danger"> <strong>Update Your Profile</strong></h4>
              <div className="mb-3">
                <label><span style={{ fontWeight: "bold" }}>Name</span></label>
                <input
                  type="text"
                  onChange={setvalue}
                  name="name"
                  className="form-control"
                  id="fullname"
                  placeholder="Enter Your Name"
                  autoFocus
                  value={inputVal.name}
                />
              </div>
              <div className="mb-3">
                <label><span style={{ fontWeight: "bold" }}>Email</span></label>
                <input
                  type="email"
                  onChange={setvalue}
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Email"
                  value={inputVal.email}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label><span style={{ fontWeight: "bold" }}>Mobile</span></label>
                <input
                  type="text"
                  onChange={setvalue}
                  name="phone"
                  className="form-control"

                  id="Phone"
                  placeholder="Enter Your Phone Number"
                  value={inputVal.phone}
                />
              </div>
              <div className="mb-3">
                <label><span style={{ fontWeight: "bold" }}>Address</span></label>
                <input
                  type="text"
                  onChange={setvalue}
                  name="address"
                  className="form-control"

                  id="add"
                  placeholder="Enter Your Address"
                  value={inputVal.address}
                />
              </div>

              <div className="mb-3">
                <div>
                  <label><span style={{ fontWeight: "bold" }}>ADMIN/USER</span></label>
                  <input
                    type="text"
                    onChange={setvalue}
                    name="role"
                    className="form-control"

                    id="add"
                    value={inputVal.role}
                    disabled
                    placeholder="if You are Admin then enter 1 or else enter 0"
                  />
                </div>

              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={submitData}
              >
                UPDATE PROFILE
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
