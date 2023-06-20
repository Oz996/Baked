import React from "react";
import "./Footer.scss";
import { BsFacebook, BsTwitter ,BsYoutube} from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      <div>
        <BsYoutube size={18} /> <BsFacebook size={18} /> <BsTwitter size={18} />
      </div>
      <h3>@2023 Baked.com. All rights reserved</h3>
    </footer>
  );
};

export default Footer;
