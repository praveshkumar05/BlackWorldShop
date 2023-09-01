import React from "react";
import Layout from "../../components/Layout.js/Layout";
import Usermenu from "../../components/Layout.js/Usermenu";

const Dashboard = () => {
  return (
    <Layout title={"Dashboard-Ecommerce-App"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <Usermenu />
          </div>
          <div className="col-md-9">
            <h1>Your Profile</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
