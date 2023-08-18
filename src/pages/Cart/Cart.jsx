import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.scss";
import {
  decrementQuantity,
  incrementQuantity,
} from "../../redux/slice/cartSlice";
import axios from "axios";
import OrderModal from "../../components/OrderModal/OrderModal";
import { BsCartX } from "react-icons/bs";
import { Link } from "react-router-dom";

const Cart = () => {
  const [showModal, setShowModal] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const dispatch = useDispatch();

  const handleIncrement = (id) => {
    dispatch(incrementQuantity({ id }));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity({ id }));
  };

  const calculateSubtotal = (item) => {
    return item.quantity * item.price;
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + calculateSubtotal(item),
      0
    );
  };

  const handleCheckout = () => {
    const orderData = cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    axios.post("https://baked-api.onrender.com/orders", { orderData });
  };

  const handleModalClick = () => {
    setShowModal(!showModal);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <BsCartX size={60}/>
        <span>Cart is empty</span>
        <Link to="/">Start browsing</Link>
      </div>
    );
  }

  return (
    <section className="cart-container">
      <div className="shopping-div">
        <h1>Shopping Cart</h1>
        <h3>Items: {cartItems.length}</h3>
      </div>
      {cartItems.map((item) => (
        <div className="cart" key={item.id}>
          <img src={item.image} alt={item.name} />
          <p>{item.name}</p>
          <div className="cart-div">
          <div className="buttons">
            <button onClick={() => handleIncrement(item.id)}>+</button>
            <p className="cart-quantity">{item.quantity}</p>
            <button onClick={() => handleDecrement(item.id)}>-</button>
          </div>
          <p className="cart-subtotal">€{calculateSubtotal(item)}</p>
        </div>
        </div>
      ))}
      <p className="total">Total Price: €{calculateTotalPrice()}</p>
      <button
        className="checkout"
        onClick={() => {
          handleCheckout();
          handleModalClick();
        }}
      >
        Proceed to Checkout
      </button>
      {showModal && <OrderModal setShowModal={setShowModal} />}
    </section>
  );
};

export default Cart;
