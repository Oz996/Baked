import React from "react";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products/Products";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import WareDetails from "./pages/Ware/WareDetails";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Footer from "./components/Footer/Footer";
import Reset from "./pages/Auth/Reset";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart/Cart";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route element={<Header />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<WareDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
