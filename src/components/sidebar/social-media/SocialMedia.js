import React from "react";
import { Link } from "react-router-dom";
import "./SocialMedia.scss";
import Feacbook from "../../../assets/img/feacbook.svg";
import Instagram from "../../../assets/img/instagram.svg";
import Snapchat from "../../../assets/img/snapchat.svg";
import Twitter from "../../../assets/img/twitter.svg";

const SocialMedia = ({data}) => {
  return (
    <div className="social-media">
      <div className="sidebar-block">
        <div className="social-title">
          <h4>ابق على اطلاع</h4>
        </div>
        {data.social && (
          <div className="social-media-icons">
            <Link target="_blank" to={data.social.facebook.link} className="facebook">
              <img src={Feacbook} alt="Feacbook" />
            </Link>
            <Link target="_blank" to={data.social.instagram.link} className="instagram">
              <img src={Instagram} alt="Instagram" />
            </Link>
            <Link target="_blank" to={data.social.snapchat.link} className="snapchat">
              <img src={Snapchat} alt="Snapchat" />
            </Link>
            <Link target="_blank" to={data.social.twitter.link} className="twitter">
              <img src={Twitter} alt="Twitter" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMedia;
