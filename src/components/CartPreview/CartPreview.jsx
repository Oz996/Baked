import React from "react";
import "./CartPreview.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
} from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";

const CartPreview = () => {
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
      {cartItems.length > 0 ? 
      
      <div className="action-buttons">
        <Link to="/cart">
          <button className="btn-cart">To Cart</button>
        </Link>
        <button onClick={() => dispatch(clearCart())} className="btn-remove">Clear Cart</button>
      </div>
      : ""
    }
    </div>
  );
};

export default CartPreview;
