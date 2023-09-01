import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout.js/Layout";
import Usermenu from "../../components/Layout.js/Usermenu";
import { useAuth } from "../../components/Layout.js/context/auth";
import { getOrdersfunc } from "../../components/Layout.js/APIS/apicall";
import moment from "moment";
import { BASE_URL } from "../../components/Layout.js/APIS/baseurl";
const Order = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await getOrdersfunc();
      setOrders(data);
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token])
  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid  ">
        <div className="row">
          <div className="col-md-3 bg-secondary p-5 " >
            <Usermenu />
          </div>
          <div className="col-md-9 bg-dark">
            <h1 className="text-center" style={{ color: "whitesmoke" }}>All Orders</h1>
            {
              orders.map((o, i) => {
                return (
                  <div className="border shadow">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" style={{ color: "whitesmoke" }}>#</th>
                          <th scope="col" style={{ color: "whitesmoke" }}>Status</th>
                          <th scope="col" style={{ color: "whitesmoke" }}>Buyer</th>
                          <th scope="col" style={{ color: "whitesmoke" }}>Date</th>
                          <th scope="col" style={{ color: "whitesmoke" }}>Payment</th>
                          <th scope="col" style={{ color: "whitesmoke" }}>quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th style={{ color: "whitesmoke" }}>{i + 1}</th>
                          <th style={{ color: "whitesmoke" }}>{o?.status}</th>
                          <th style={{ color: "whitesmoke" }}>{o?.buyer?.name}</th>
                          <th style={{ color: "whitesmoke" }}>{moment(o?.createAt).fromNow()}</th>
                          <th style={{ color: "whitesmoke" }}>{o?.payment.success ? "Success" : "Failed"}</th>
                          <th style={{ color: "whitesmoke" }}>{o?.products?.length}</th>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {
                        o?.products?.map((p) => (
                          <div className="row card flex-row m-2 p-3">
                            <div className="col-md-4">
                              <img
                                className="card-img-top"
                                width={"200px"}
                                height={"200px"}
                                src={`${BASE_URL}/product/productPhoto/${p._id}`}
                                alt="Card  cap"
                              />
                            </div>
                            <div className="col-md-7 m-2">
                              <div className="card-name-price d-flex justify-content-around">
                                <h5 className="card-title">Name:{p.name}</h5>
                                <h5 className="card-title card-price">
                                  {p.price.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                  })}
                                </h5>
                              </div>
                              <p className="text-center">{p.description}</p>
                            </div>
                          </div>
                        ))
                      }
                    </div>


                  </div>
                )
              })
            }

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
