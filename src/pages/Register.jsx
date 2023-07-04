import React, { useState } from "react";
import "./Form.scss";
import { HiOutlineMail, HiOutlineKey } from "react-icons/hi";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import Loader from "../utils/Loader/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      setError("Passwords do not match");
    } else if (password == "" || cPassword == "" || email == "") {
      setError("Please fill out all the fields");
    } else if (password.length < 6) {
      setError("Password has to be atleast 6 characters");
    } else {
      setIsLoading(true);
      setError("");
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setIsLoading(false);
          navigate("/login");
        })
        .catch((error) => {
          setIsLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };

  return (
    <div className="form-wrapper">
      <div className="baked">
        <img src="/images/logo.png" alt="" />
        <h1>
          BAKED <span>.com</span>
        </h1>
      </div>
      <form onSubmit={registerUser}>
        <label htmlFor="email">Email:</label>
        <div className="form-input">
          <span>
            <HiOutlineMail className="icon" size={23} />
          </span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <label htmlFor="password">Password:</label>
        <div className="form-input">
          <span>
            <HiOutlineKey className="icon" size={23} />
          </span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <label htmlFor="confirmPassword">Confirm password: </label>
        <div className="form-input">
          <span>
            <HiOutlineKey className="icon" size={23} />
          </span>
          <input
            type="password"
            name="confirmPassword"
            value={cPassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        {isLoading ? (
          <button disabled style={{ pointerEvents: "none", opacity: ".7" }}>
            <Loader />
          </button>
        ) : (
          <button>Register</button>
        )}
      </form>
    </div>
  );
};

export default Register;
