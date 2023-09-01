import React, { useEffect, useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { SiAdobephotoshop } from "react-icons/si";
import { useAuth } from "./context/auth";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import SearchInput from "../Form/SearchInput";
import { getCategoryfunc } from "./APIS/apicall";
import { toast } from "react-hot-toast";
import { cartContext } from "./context/cart";
import { Avatar, Badge, Space } from 'antd';


const Header = () => {
  const [auth] = useAuth();
  const [cartItem] = useContext(cartContext);

  const [categories, setCategories] = useState([]);
  const getAllcategory = async () => {
    try {
      const { data } = await getCategoryfunc();
      if (data?.success) {
        setCategories(data?.category);
      }
    }
    catch (error) {
      toast.error("Oops ! there is some error in getting catergories");
    }
  }
  useEffect(() => {
    getAllcategory()
  }, []);

  function getRandomColor() {
    // Generate a random color using the Math.random() function
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  // console.log("print rolt", auth.role);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              <SiAdobephotoshop />
              <strong style={{ marginLeft: "7px" }}>BlacKWoRLDSHoP</strong>
            </Link>
            <div className="d-flex align-items-center">
              <SearchInput />
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  <span style={{ color: getRandomColor(), fontWeight: 'bold' }}>Home</span>
                </NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      <span style={{ color: getRandomColor(), fontWeight: 'bold' }}>Register</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      <span style={{ color: getRandomColor(), fontWeight: 'bold' }}>Login</span>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Nav style={{ textDecoration: "none" }}>
                      <NavDropdown
                        id="nav-dropdown-dark-example"
                        title={<span style={{ color: getRandomColor(), fontWeight: 'bold' }}>{auth.user.name}</span>}
                      >
                        <NavDropdown.Item href={`/dashboard/${auth?.role === 1 ? "admin" : "user"}`}>
                          <span style={{ color: getRandomColor(), fontWeight: 'bold' }}>Dashboard</span>
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/logout">
                          <span style={{ color: getRandomColor(), fontWeight: 'bold' }}>Logout</span>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Nav style={{ textDecoration: "none" }}>
                  <NavDropdown
                    id="nav-dropdown-dark-example"
                    title={<span style={{ color: getRandomColor(), fontWeight: 'bold' }}>Categories</span>}
                  >
                    <NavDropdown.Item href={`/categories`}>
                      <span style={{ color: getRandomColor(), fontWeight: 'bold' }}>All Categories</span>
                    </NavDropdown.Item>
                    {categories.map((c) => (
                      <NavDropdown.Item href={`/category/${c.slug}`}>
                        <span style={{ color: getRandomColor(), fontWeight: 'bold' }}>{c.name}</span>
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                </Nav>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  <span style={{ color: getRandomColor(), fontWeight: 'bold' }}>
                    <Space size="middle">
                      <Badge count={cartItem?.length}>
                        <Avatar shape="square" size="large">cart</Avatar>
                      </Badge>
                    </Space>
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  );
};

export default Header;
