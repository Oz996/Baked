import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";
import "./Profile.scss";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import {HiOutlineLogout} from 'react-icons/hi'

const Profile = () => {
  const email = useSelector(selectEmail);
  const navigate = useNavigate()

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <div className="profile-main">
        <h2>Logged in as {email}</h2>
        <button onClick={logoutUser}><HiOutlineLogout size={17}/> Logout</button>
      </div>
    </div>
  );
};

export default Profile;
