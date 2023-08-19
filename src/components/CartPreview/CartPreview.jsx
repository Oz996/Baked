import { useEffect, useRef } from "react";
import "./CartPreview.scss";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { RxCross2 } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";

const CartPreview = ({ setShowCart }) => {
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const dispatch = useDispatch();
  const cartRef = useRef();

  const handleIncrement = (id) => {
    dispatch(incrementQuantity({ id }));
  };
  const handleDecrement = (id) => {
    dispatch(decrementQuantity({ id }));
  };
  const removeProduct = (id) => {
    dispatch(removeFromCart({ id }));
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setShowCart(false);
      }
    });
  });

  return (
    <AnimatePresence>
      <motion.div
        className="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="cart-preview"
        ref={cartRef}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          right: 0,
        }}
        exit={{ opacity: 0 }}
      >
        <div className="exit-modal">
          <RxCross2
            className="cross"
            size={25}
            onClick={() => setShowCart(false)}
          />
        </div>
        {cartItems.length == 0 ? (
          <div className="empty">
            <FaShoppingCart size={40} className="empty-cart" />
            <span>Cart is empty</span>
          </div>
        ) : (
          <div className="cart-contents">
            {cartItems.map((item) => (
              <div className="cart" key={item.id}>
                <Link
                  to={`/products/${item.id}`}
                  onClick={() => setShowCart(false)}
                >
                  <img src={item.image} alt={item.name} />
                </Link>
                <div className="cart-buttons">
                  <Link
                    to={`/products/${item.id}`}
                    onClick={() => setShowCart(false)}
                  >
                    <p className="cart-ware-name">{item.name}</p>
                  </Link>
                  <div className="buttons">
                    <button onClick={() => handleDecrement(item.id)}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => handleIncrement(item.id)}>+</button>
                    <FaTrashAlt
                      size={17}
                      className="remove"
                      onClick={() => removeProduct(item.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 ? (
          <div className="action-buttons">
            <ShowOnLogin>
              <Link to="/cart">
                <button className="btn-cart" onClick={() => setShowCart(false)}>
                  To Cart
                </button>
              </Link>
            </ShowOnLogin>

            <ShowOnLogout>
              <Link to="/login">
                <button className="btn-cart" onClick={() => setShowCart(false)}>
                  Login to Purchase
                </button>
              </Link>
            </ShowOnLogout>
            <button
              onClick={() => dispatch(clearCart())}
              className="btn-remove"
            >
              Clear Cart
            </button>
          </div>
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
};

export default CartPreview;
