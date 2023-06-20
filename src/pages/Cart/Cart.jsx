import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.scss";
import {
  decrementQuantity,
  incrementQuantity,
} from "../../redux/slice/cartSlice";
import axios from "axios";
import OrderModal from "../../components/OrderModal/OrderModal";


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

    axios.post("http://localhost:3000/orders", { orderData });
  };

  const handleModalClick = () => {
    setShowModal(!showModal);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <p>Cart is empty</p>
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
          <div className="buttons">
            <button onClick={() => handleIncrement(item.id)}>+</button>
            <p>{item.quantity}</p>
            <button onClick={() => handleDecrement(item.id)}>-</button>
          </div>
          <p>€{calculateSubtotal(item)}</p>
        </div>
      ))}
      <p className="total">Total Price: €{calculateTotalPrice()}</p>
      <button className="checkout"
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
