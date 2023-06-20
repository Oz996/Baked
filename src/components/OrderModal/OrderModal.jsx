import React from "react";
import "./OrderModal.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slice/cartSlice";

const OrderModal = ({ setShowModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleBackButton = () => {
    setShowModal(false);
    navigate('/products')
    dispatch(clearCart())
  };
  return (
    <div className="order-modal">
      <div className="modal-contents">
        <img src="/images/logo.png" alt="" />
        <h2>Your order has been added</h2>
        <button onClick={handleBackButton}>Back</button>
      </div>
    </div>
  );
};

export default OrderModal;
