import React, { useState } from "react";
import "./Form.scss";
import { HiOutlineMail, HiOutlineKey } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import Loader from "../../utils/Loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Please fill out all the fields");
      return;
    }
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        const user = userCredential.user;
        navigate("/");
      })
      .catch((error) => {
        if (email.length > 0 && password.length > 0) {
          setError("Wrong credentials");
        }
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const signInWithGoogle = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        navigate("/");
      })
      .catch((error) => {});
  };

  return (
    <div className="form-wrapper">
      <div className="baked">
        <img src="/images/logo.png" alt="" />
        <h1>
          BAKED <span>.com</span>
        </h1>
      </div>
      <form onSubmit={loginUser}>
        <h2>Sign in</h2>
        <label htmlFor="email">Email:</label>
        <div className="form-input">
          <span>
            <HiOutlineMail className="icon" size={28} />
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
            <HiOutlineKey className="icon" size={28} />
          </span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <h3>
          Not registered?{" "}
          <Link style={{ color: "#35A00F" }} to="/register">
            Register
          </Link>{" "}
          here
        </h3>
        <h3 className="h3">
          Forgot password?{" "}
          <Link style={{ color: "#35A00F" }} to="/reset">
            Reset
          </Link>{" "}
          your password
        </h3>
        {error && <p className="error">{error}</p>}
        {isLoading ? (
          <button disabled style={{ pointerEvents: "none", opacity: ".7" }}>
            <Loader />
          </button>
        ) : (
          <button>Login</button>
        )}

        <button onClick={signInWithGoogle}>
          <FcGoogle /> Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
