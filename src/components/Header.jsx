import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { GiSlicedBread } from "react-icons/gi";
import { HiUser } from "react-icons/hi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser, removeActiveUser } from "../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "./hiddenLink/hiddenLink";
import CartPreview from "./CartPreview/CartPreview";

const Header = () => {
  const [email, setEmail] = useState("");
  const [showCart, setShowCart] = useState(false);
  const location = useLocation();
  const headerClass = location.pathname.includes("/products/")
    ? "header-details"
    : "";

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);

        dispatch(
          setActiveUser({
            email: user.email,
            userID: user.uid,
          })
        );
      } else {
        setEmail("");

        dispatch(removeActiveUser());
      }
    });
  }, []);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCartClick = () => {
    setShowCart((prev) => !prev);
  };

  return (
    <>
      <header className={headerClass}>
        <div className="logo-div">
          <NavLink to="/">
            <img src="/images/logo.png" alt="" />
            <h2>
              BAKED <br /> <span> .com </span>
            </h2>
          </NavLink>
        </div>

        <nav>
          <NavLink to="/profile">{email}</NavLink>
          <NavLink to="/">
            <FaHome />
            Home
          </NavLink>
          <NavLink to="/products">
            <GiSlicedBread /> Products
          </NavLink>
          <ShowOnLogout>
            <NavLink to="/login">
              <HiUser />
              Login
            </NavLink>
          </ShowOnLogout>
          <ShowOnLogin>
            <NavLink onClick={logoutUser}>Logout</NavLink>
          </ShowOnLogin>

          <FaShoppingCart className="cart-icon" onClick={handleCartClick} />
          {showCart && <CartPreview setShowCart={setShowCart} />}
          <div className="cart-length"></div>
        </nav>
      </header>
    </>
  );
};

export default Header;
