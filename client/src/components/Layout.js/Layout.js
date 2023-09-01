import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
const Layout = ({ children,description,keyword,author,title }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Header />
      <main style={{ minHeight: "75vh",width:"100%" }}>{children}</main>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
  
Layout.defaultProps={
      title:"BlackWorld",
      keyword:" Blackworld mern react mongoose monogdb,node",
      description:"every end is the new Begining",
      author:"Black Adam the time traveller"
}

export default Layout;
