import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { ApiService } from "../../services/data.service";
import "./Privacy.scss";
import PrivacyImg from "../../assets/img/hero.svg";
import placeholder from "../../assets/img/hashksa-placeholder.jpg";
import HelmetMetaData from "../../services/HelmetData";

const PrivacyMobile = () => {
  const [privacy, setPrivacy] = React.useState([]);

  useEffect(() => {
    ApiService.getPrivacy()
      .then((response) => {
        setPrivacy(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      <HelmetMetaData
        title="هاشتاق السعودية - سياسة الخصوصية"
        description="ما يحدث في مواقع التواصل الاجتماعيفي منصة واحدة"
        image={placeholder}
        quote="يقدم لك آخر الأحداث في السعودية عبر تغطية مستمرة لما يتم تداوله عبر وسائل التواصل الاجتماعي على مدار الساعة"
      />
      <div className="hksa-page-privacy">
        <div className="hkas-privacy-details">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                <div className="hkas-privacy-content">
                  <div
                    className="hkas-privacy-description"
                    dangerouslySetInnerHTML={{
                      __html: privacy.Privacy?.description,
                    }}
                  ></div>
                </div>
              </div>
              <div className="col-md-4">
                <img
                  src={privacy.Privacy?.main_photo}
                  alt=""
                  className="hkas-privacy-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PrivacyMobile;
