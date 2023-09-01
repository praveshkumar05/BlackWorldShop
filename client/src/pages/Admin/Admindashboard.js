import React from 'react';
import Adminmenu from '../../components/Layout.js/Routes/Adminmenu';
import Layout from '../../components/Layout.js/Layout.js';
import { useAuth } from '../../components/Layout.js/context/auth';

const Admindashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-3 p-5 bg-secondary">
            <Adminmenu />
          </div>
          <div className="col-md-9 bg-dark p-4">
            <div className="card p-4 bg-dark text-white">
              <h3>
                <strong>Name: - {auth?.user?.name}</strong>
              </h3>
              <span>
                <strong>Email: - {auth?.user?.email}</strong>
              </span>
              <h3>
                <strong>Mobile: - {auth?.user?.phone}</strong>
              </h3>
              <h3>
                <strong>Address: - {auth?.user?.address}</strong>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admindashboard;
