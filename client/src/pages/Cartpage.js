import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout.js/Layout'
import { cartContext } from '../components/Layout.js/context/cart'
import { useAuth } from '../components/Layout.js/context/auth'
import DropIn from "braintree-web-drop-in-react";
import { getTokenfunc, paymentfunc } from '../components/Layout.js/APIS/apicall'
import { toast } from 'react-hot-toast'
import { BASE_URL } from '../components/Layout.js/APIS/baseurl'
import './cartpage.css'
const Cartpage = () => {
  const [cartItem, setCartItem] = useContext(cartContext);
  const [auth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //get payment gatway token
  const getToken = async () => {
    try {
      const { data } = await getTokenfunc();
      // console.log(data);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  }

  const removecartItem = async (id) => {
    try {
      localStorage.removeItem("cartItem");
      let newcartItem = cartItem.filter((c) => (c._id !== id))
      setCartItem(newcartItem);
      localStorage.setItem("cartItem", JSON.stringify(newcartItem));

    } catch (error) {
      console.log(error);
    }
  }
  const totalPrice = () => {
    try {
      let total = 0;
      cartItem?.map((item) => total = total + item.price)
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      setLoading(true);
      const { data } = await paymentfunc({ nonce, cartItem });
      setLoading(false);
      localStorage.removeItem("cartItem");
      setCartItem([]);
      toast.success("payment Completed succesfully");
      navigate("/dashboard/user/order")
    }
    catch (error) {
      console.log(error)
      setLoading(false);
    }
  }
  useEffect(() => {
    getToken();
  }, [auth?.token])


  return (
    <Layout>
      <div className="cart-page">
      <div className="row">
          <div className="col-md-12">
            <h1 className='text-center bg-dark p-2 mb-1'>
              <strong style={{ color: 'whitesmoke' }}>{`Hello ${auth?.token && auth?.user?.name}`}</strong>
            </h1>
            <h4 className='text-center'>
              {cartItem?.length > 0
                ? `You have ${cartItem.length} items in your cart${auth?.token ? "" : ". Please login to checkout."}`
                : "Your cart is empty"
              }
            </h4>
          </div>
        </div>
        <div className="container">
          <div className='row'>
            <div className="col-md-7 ">
              
              {
                cartItem?.map((p) => (
                  <div className="row m-3 " key={p._id}>
                    <div className="col-md-7 ">
                      <img
                        className="card-img-top"
                        width={"100%"}
                        height={"180px"}
                        src={`${BASE_URL}/product/productPhoto/${p._id}`}
                        alt="Card  cap"
                      />
                    </div>
                    <div className="col-md-5 justify-content-between p-3">
                    <div className="row">
                        <div className="col-6">
                             <h5 className="card-title">{p.name}</h5>
                        </div>
                        <div className="col-6">
                        <h5 className="card-title card-price">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </h5>
                        </div>
                      </div>
                      <div className="row">
                            <div className="col">
                            <p>{p.description}</p>
                            </div> 
                      </div>
                      <div className='row' >
                      <button
                        className="btn btn-danger"
                        onClick={() => removecartItem(p._id)}
                      >
                        Remove
                      </button>
                      </div>
                    </div>

                  </div>
                ))}
                
            </div>
            <div className="col-md-5 cart-summary ">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cartItem?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cartpage;