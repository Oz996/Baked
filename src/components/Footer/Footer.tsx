import React from "react";
import "./Footer.scss";
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer>
      <figure>
        <img src="/images/logo.png" alt="Website logo" />
      </figure>
      <div>
        <BsYoutube className="footer-icon" size={20} />
        <BsFacebook className="footer-icon" size={20} />
        <BsTwitter className="footer-icon" size={20} />
      </div>
      <h3>@{date} Baked.com. All rights reserved</h3>
    </footer>
  );
};

export default Footer;
