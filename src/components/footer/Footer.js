import React, { useEffect } from "react";
import "./Footer.scss";
import Logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";

import Feacbook from "../../assets/img/fb-fo.svg";
import Instagram from "../../assets/img/ins-fo.svg";
import Snapchat from "../../assets/img/sv-fo.svg";
import Twitter from "../../assets/img/tw-fo.svg";
import { ApiService } from "../../services/data.service";

const Footer = () => {
  const [contact, setContact] = React.useState([]);

  useEffect(() => {
    ApiService.getContactUs()
      .then((response) => {
        setContact(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <footer className="footer-wrapper d-flex flex-wrap justify-content-between align-items-center">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-4">
            <div className="logo d-flex flex-wrap">
              <Link to="/">
                <img src={Logo} alt="logo" />
              </Link>
            </div>
          </div>

          <div className="col-md-4">
            <ul className="nav justify-content-center mb-3">
              <li className="nav-item">
                <Link to={"/privacy-and-policy"} className="nav-link px-2">
                  سياسة الخصوصية
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/terms-of-use"} className="nav-link px-2">
                  سياسة الاستخدام
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/contact-us"} className="nav-link px-2">
                  تواصل معنا
                </Link>
              </li>
            </ul>
            <p className="text-center">{contact.copyright && contact.copyright}</p>
          </div>

          <div className="col-md-4">
            <div className="social-links d-flex flex-wrap justify-content-end">
              <Link target="_blank" to={contact.social?.facebook.link} className="facebook">
                <img src={Feacbook} alt="Feacbook" />
              </Link>
              <Link target="_blank" to={contact.social?.instagram.link} className="instagram">
                <img src={Instagram} alt="Instagram" />
              </Link>
              <Link target="_blank" to={contact.social?.snapchat.link} className="snapchat">
                <img src={Snapchat} alt="Snapchat" />
              </Link>
              <Link target="_blank" to={contact.social?.twitter.link} className="twitter">
                <img src={Twitter} alt="Twitter" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
