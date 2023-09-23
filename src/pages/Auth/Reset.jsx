import React, { useState } from "react";
import "./Form.scss";
import { HiOutlineMail } from "react-icons/hi";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config"
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const resetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigate('/')
        alert('Password reset instructions has been sent to you email')
      })
      .catch((error) => {
        if(email == ""){
          setError("")
        } else if (email !== email)
        setError("User does not exist")
      });
  };

  return (
    <div className="form-wrapper">
      <div className="baked">
        <img src="/images/logo.png" alt="" />
        <h1>
          BAKED <span>.com</span>
        </h1>
      </div>
      <form onSubmit={resetPassword}>
        <h2>Reset Password</h2>
        <label htmlFor="email">Email:</label>
        <div className="form-input">
          <span>
            <HiOutlineMail className="icon" size={23} />
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button>Send</button>
      </form>
    </div>
  );
};

export default Reset;
