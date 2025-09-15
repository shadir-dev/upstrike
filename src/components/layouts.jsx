// components/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Navigation/header";
import Footer from "./Navigation/footer";

const Layout = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;