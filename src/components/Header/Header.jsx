import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser } from "react-icons/fa";
import { GiSlicedBread, GiHamburgerMenu } from "react-icons/gi";
import { HiUser, HiOutlineLogout } from "react-icons/hi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser, removeActiveUser } from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import CartPreview from "../CartPreview/CartPreview";
import { motion } from "framer-motion";
import "./Header.scss";

const Header = () => {
  const [email, setEmail] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [displayHamburger, setDisplayHamburger] = useState(false);
  const location = useLocation();
  const headerClass = location.pathname.includes("/products/")
    ? "header-details"
    : "";

  const cartItems = useSelector((state) => state.cart.cartItems || []);
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
        <div className="header-content">
          <div className="logo-div">
            <NavLink to="/">
              <img src="/images/logo.png" alt="logo" />
            </NavLink>
            <NavLink to="/">
              <h2>
                BAKED <br /> <span> .com </span>
              </h2>
            </NavLink>
          </div>
          <GiHamburgerMenu
            size={25}
            className="hamburger"
            onClick={() => setDisplayHamburger((prev) => !prev)}
          />
          <nav className={displayHamburger && "show-nav"}>
            <NavLink to="/profile">
              <FaUser size={20} />
              <span>Profile</span>
            </NavLink>
            <NavLink to="/">
              <FaHome />
              <span>Home</span>
            </NavLink>
            <NavLink to="/products">
              <GiSlicedBread />
              <span>Products</span>
            </NavLink>
            <ShowOnLogout>
              <NavLink to="/login">
                <HiUser />
                <span>Login</span>
              </NavLink>
            </ShowOnLogout>
            <ShowOnLogin>
              <NavLink onClick={logoutUser}>
                <HiOutlineLogout /> <span>Logout</span>
              </NavLink>
            </ShowOnLogin>

            <FaShoppingCart className="cart-icon" onClick={handleCartClick} />
            {cartItems.length > 0 && (
              <div className="cart-preview-quantity">{cartItems.length}</div>
            )}

            {showCart && <CartPreview setShowCart={setShowCart} />}
            <div className="cart-length"></div>
          </nav>
          <motion.div
            className={`hamburger-div ${displayHamburger && "show"}`}
            initial={{ right: -37 }}
            animate={{ right: 0 }}
          ></motion.div>
        </div>
      </header>
    </>
  );
};

export default Header;
