import React from "react";
import "./CartPreview.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
} from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { RxCross2 } from "react-icons/rx";

const CartPreview = ({ setShowCart }) => {
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const dispatch = useDispatch();

  const handleIncrement = (id) => {
    dispatch(incrementQuantity({ id }));
  };
  const handleDecrement = (id) => {
    dispatch(decrementQuantity({ id }));
  };

  return (
    <div className="cart-preview">
      <div className="exit-modal">
        <RxCross2
          className="cross"
          size={22}
          onClick={() => setShowCart(false)}
        />
      </div>
      {cartItems.length == 0 ? (
        <span>Cart is empty</span>
      ) : (
        <div className="cart-contents">
          {cartItems.map((item) => (
            <div className="cart" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-buttons">
                <p>{item.name}</p>
                <div className="buttons">
                  <button onClick={() => handleDecrement(item.id)}>-</button>
                  <p>{item.quantity}</p>
                  <button onClick={() => handleIncrement(item.id)}>+</button>
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
              <button className="btn-cart">To Cart</button>
            </Link>
          </ShowOnLogin>

          <ShowOnLogout>
            <Link to="/login">
              <button className="btn-cart">Login to Purchase</button>
            </Link>
          </ShowOnLogout>
          <button onClick={() => dispatch(clearCart())} className="btn-remove">
            Clear Cart
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CartPreview;
