import React from "react";
import "./Footer.scss";
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      <figure>
        <img src="/images/logo.png" alt="" />
      </figure>
      <div>
        <BsYoutube className="footer-icon" size={20} />
        <BsFacebook className="footer-icon" size={20} />
        <BsTwitter className="footer-icon" size={20} />
      </div>
      <h3>@2023 Baked.com. All rights reserved</h3>
    </footer>
  );
};

export default Footer;
