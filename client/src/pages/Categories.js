import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout.js/Layout'
import { toast } from 'react-hot-toast';
import { getCategoryfunc } from '../components/Layout.js/APIS/apicall';
import "./Category.css"
import { useNavigate } from 'react-router-dom';
const Categories = () => {

  const [categories, setCategories] = useState([]);
  const navigate=useNavigate();
  const getAllcategory = async () => {
    try {
      const { data } = await getCategoryfunc();
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Oops ! there is some error in getting catergories")

    }
  }


  useEffect(() => {
    getAllcategory();
  }, [])
  return (
    <div className="categories-page">
      <Layout title={"ALL-CATEGORIES"}>
        <div className="container">
          <div className="row">
            {
              categories.map((c) => (
                <div className="col-md-4 mt-5 mb-3 gx-3 gy-3">
                  {/* <Link to={`/category/${c.slug}`} ></Link> */}
                  <div className="card" style={{ width: '18rem' }}>
                    <img className="card-img-top" src="https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg" alt="Card  cap" />
                    <div className="card-body">
                      <h5 className="card-title">{c.name}</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <button  className="btn btn-secondary " onClick={()=>navigate(`/category/${c.slug}`)}>Explore</button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Categories
