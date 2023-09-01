import React, { useEffect, useState } from 'react'
import Adminmenu from '../../components/Layout.js/Routes/Adminmenu'
import Layout from '../../components/Layout.js/Layout'
import { toast } from 'react-hot-toast';
import { getAllproductsfunc } from '../../components/Layout.js/APIS/apicall';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../components/Layout.js/APIS/baseurl';

const Products = () => {

    const [products, setProducts] = useState([]);
    // get all products

    const getAllproducts = async () => {

        try {
            const { data } = await getAllproductsfunc();
            if (data.success) {
                setProducts(data.products);
            }

        } catch (error) {
            console.log(error)

            toast.error("some error in getting all products")

        }
    }
    // Life cycle method
    useEffect(() => {
        getAllproducts();
    }, [])

    return (
        <Layout >
            <div className="container-fluid bg-black" style={{minHeight:'100vh'}}>
            <div className='row'>
                <div className="col-md-3 p-5 bg-secondary ">
                    <Adminmenu />
                </div>
                <div className="col-md-8 ">
                    <h1 className='text-center '> <strong style={{color:"whitesmoke"}}>All product</strong></h1>
                    <div className='d-flex flex-wrap'>
                        {
                            products.map((p) => (
                                <Link key={p._id} className='product-link' to={`/dashboard/admin/product/${p.slug}`} >
                                    <div className="card m-3" style={{ width: '18rem' }} >
                                        <img className="card-img-top" width={"50px"} height={"200px"} src={`${BASE_URL}/product/productPhoto/${p._id}`} alt="Card Ka chehra" />
                                        <div className="card-body">
                                            <div className="card-name-price d-flex justify-content-between">
                                                <h5 className="card-title">{p.name}</h5>
                                                <h5 className="card-title card-price">
                                                    {p.price.toLocaleString("en-US", {
                                                        style: "currency",
                                                        currency: "USD",
                                                    })}
                                                </h5>
                                            </div>
                                            <p className="card-text">{p.description.substring(0, 30)}...</p>
                                           
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
            </div>
        </Layout>
    )
}

export default Products
