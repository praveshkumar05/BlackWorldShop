import React, { useContext } from 'react';
import { searchContext } from '../../components/Layout.js/context/Search';
import Layout from '../../components/Layout.js/Layout';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../components/Layout.js/APIS/baseurl';

const SearchPage = () => {
  const [value] = useContext(searchContext);
  const navigate = useNavigate();

  return (
    <Layout title="Search Results">
      <div className="container">
        <div className="text-center">
          <h2><b> Search Results</b></h2>
          <h6>
            {value?.results.length < 1
              ? 'No products found'
              : `Found ${value?.results.length} products`}
          </h6>
          <div className="row justify-content-center">
            {value.results.map((p) => (
              <div
                key={p._id}
                className="col-md-4 mb-4"
              >
                <div
                  className="card"
                  style={{
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: 'none',
                  }}
                >
                  <img
                    className="card-img-top"
                    style={{ objectFit: 'cover', height: '200px' }}
                    src={`${BASE_URL}/product/productPhoto/${p._id}`}
                    alt={`${p.name} product`}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 80)}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="card-price" style={{ fontWeight: 'bold', color: 'green' }}>
                        $ {p.price}
                      </p>
                      <div>
                        <button className="btn btn-primary" onClick={() => alert('Added to cart')}>
                          Add To Cart
                        </button>
                        <button
                          className="btn btn-secondary ms-2"
                          onClick={() => navigate(`product/${p.slug}`)}
                        >
                          More Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
