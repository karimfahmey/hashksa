import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import News from "./news/News";
import "./SidebarStyle.scss";
import SocialMedia from "./social-media/SocialMedia";
// import Tags from "./tags/Tags";
import { ApiService } from "../../services/data.service";

const SideBar = () => {
  const [t] = useTranslation();
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
    <div className="sidebar">
      <div className="sidebar-content">
        {/* <div className="sidebar-block">
          <div className="sidebar-title">
            <h4>{t("latest-hashtags")}</h4>
          </div>
          <div className="sidebar-hashtags">
            <Tags />
          </div>
        </div> */}
        <div className="sidebar-block">
          <div className="sidebar-title">
            <h4>{t("latest-news")}</h4>
          </div>
          <div className="latest-news">
            <News />
          </div>
        </div>
        <SocialMedia data={contact}/>
        <div className="download-app">
          <div className="download-title">
            <h4>حمّل التطبيق</h4>
            <p>تطبيق شامل يقدم لك آخر الأحداث في السعودية عبر تغطية مستمرة</p>
          </div>
          <div className="download-content">
            <Link to={contact.social?.appStore.link}>
              <img src={contact.social?.appStore.image} alt="Feacbook" />
            </Link>
            <Link to={contact.social?.googlePlay.link}>
              <img src={contact.social?.googlePlay.image} alt="Feacbook" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
