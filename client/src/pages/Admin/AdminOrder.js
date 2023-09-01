import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout.js/Routes/Adminmenu'
import Layout from '../../components/Layout.js/Layout'
import { useAuth } from '../../components/Layout.js/context/auth'
import { getAllOrdersfunc, getOrderStatus } from '../../components/Layout.js/APIS/apicall'
import moment from 'moment'
import { Select } from "antd";
import { BASE_URL } from '../../components/Layout.js/APIS/baseurl'
const { Option } = Select;
const AdminOrder = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [status] = useState(["Not Process", "Processing", "Shipped", "delivered", "cancel"]);
  const [auth] = useAuth()

  const getAllorder = async () => {
    try {
      const { data } = await getAllOrdersfunc();
      setAllOrders(data);

    } catch (error) {
      console.log(error);
    }
  }
  const handleChange = async (orderId, value) => {
    try {
        //console.log("funcion is called")
      const { data } = await getOrderStatus({status:value},orderId);
      console.log(data.orders);
      getAllorder();
      // setChangeStatus(data.status);

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (auth?.token)
      getAllorder();
  }, [auth?.token])
  return (
    <Layout>
      <div className="container-fluid">

      <div className="row" style={{overflow:'auto'}}>
        <div className="col-md-3  bg-secondary p-5" style={{minHeight:"100vh"}}>
          <AdminMenu />
        </div>
        <div className="col-md-9 bg-dark" style={{overflow:'auto'}}>
        <h1 className="text-center" style={{ color: "whitesmoke" }}>All Orders</h1>
          {
            allOrders?.map((o, i) => {
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
                        <td>{i + 1}</td>
                        <td>

                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                           
                          >
                            {
                                status.map((s, i) => (
                                <Option key={i} value={s}  className="text-black" >
                                 <h5 style={{color:"whiteSmoke"}}>{s}</h5> 
                                </Option>
                              ))
                            }
                          </Select>
                        </td>
                        <td style={{ color: "whiteSmoke" }}>{o?.buyer?.name}</td>
                        <td style={{ color: "whiteSmoke" }}>{moment(o?.createAt).fromNow()}</td>
                        <td style={{ color: "whiteSmoke" }}>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td style={{ color: "whiteSmoke" }}>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {
                      o?.products?.map((p) => (
                        <div className="row card flex-row mb-2 p-3">
                          <div className="col-md-4">
                            <img
                              className="card-img-top"
                              width={"200px"}
                              height={"200px"}
                              src={`${BASE_URL}/product/productPhoto/${p._id}`}
                              alt="Card  cap"
                            />
                          </div>
                          <div className="col-md-8">
                            <h4>{p.name}</h4>
                            <p>{p.description}</p>
                            <h4>Price: {p.price}</h4>
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
  )
}

export default AdminOrder
