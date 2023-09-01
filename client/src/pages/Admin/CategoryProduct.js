
import React, { useEffect } from 'react'
import Layout from '../../components/Layout.js/Layout'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { getProductCategoryWisefunc } from '../../components/Layout.js/APIS/apicall';
import { BASE_URL } from '../../components/Layout.js/APIS/baseurl';
import './categoryproudct.css'
const CategoryProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);

  const navigate = useNavigate();
  const getProduct = async () => {
    try {
      const { data } = await getProductCategoryWisefunc(params.slug);
      console.log(data);
      if (data?.success) {
        setProduct(data?.product);
      }

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (params?.slug) getProduct();
    //eslint-disable-next-line
  }, [params?.slug])
  return (
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {params.slug}</h4>
        <h6 className="text-center">{product?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className='d-flex flex-wrap '>
              {
                product.map((p) => (
                  <>
                    <div className="card m-2" style={{ width: '22rem', margin: '8px' }}>
                      <img className="card-img-top" width={"50px"} height={"200px"} src={`${BASE_URL}/product/productPhoto/${p._id}`} alt="Card  cap" />
                      <div className="card-body">
                        <div className="card-name-price">
                          <h5 className="card-title">{p.name}</h5>
                          <h5 className="card-title card-price">
                            {p.price.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </h5>
                        </div>
                        <p className="card-text">{p.description.substring(0, 60)}</p>
                        <div className="card-name-price">
                          <button class="btn btn-secondary ms-2" onClick={() => (navigate(`/product/${p.slug}`))}>More Details</button>
                        </div>

                      </div>
                    </div>
                  </>
                ))
              }
            </div>
          </div>
        </div>
      </div>


    </Layout>
  )
}

export default CategoryProduct
