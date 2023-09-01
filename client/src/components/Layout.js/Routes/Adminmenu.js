import React from "react";
import { NavLink } from "react-router-dom";

const Adminmenu = () => {
  return (
    <div className="container text-center" style={{ minHeight: "30vh" }}>
      <div className="list-group">
        <li>
          <NavLink to="/dashboard/admin" activeClassName="active" className="nav-link">
            <h3><strong>Admin Panel</strong></h3>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">
            <h5><strong>Create Category</strong></h5>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">
            <h5><strong>Create Product</strong></h5>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">
            <h5><strong>Products</strong></h5>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">
            <h5><strong>Orders</strong></h5>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">
            <h5><strong>Users</strong></h5>
          </NavLink>
        </li>
      </div>
    </div>
  );
};

export default Adminmenu;
