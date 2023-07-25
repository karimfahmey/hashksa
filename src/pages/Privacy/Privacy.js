import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { ApiService } from "../../services/data.service";
import "./Privacy.scss";
import PrivacyImg from "../../assets/img/hero.svg";
import placeholder from "../../assets/img/hashksa-placeholder.jpg";
import HelmetMetaData from "../../services/HelmetData";

const Privacy = () => {
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

  console.log(privacy, 'privacy');
  return (
    <Fragment>
      <HelmetMetaData
        title="هاشتاق السعودية - سياسة الخصوصية"
        description="ما يحدث في مواقع التواصل الاجتماعيفي منصة واحدة"
        image={"https://hashksa.co" + privacy.Privacy?.main_photo}
        quote="يقدم لك آخر الأحداث في السعودية عبر تغطية مستمرة لما يتم تداوله عبر وسائل التواصل الاجتماعي على مدار الساعة"
      />
      <div className="hksa-page-privacy">
        <div className="container-fluid">
          <div className="row">
            <Header />
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumb">
                <ul>
                  <li>
                    <a href="/">الرئيسية</a>
                  </li>
                  <li>
                    <i className="fa fa-angle-left"></i>
                    <span className="active">{privacy.Privacy?.title}</span>
                  </li>
                </ul>
                <Link to="/">
                  <span className="back-home">
                    الرجوع الى الرئيسية{" "}
                    <i className="fa-solid fa-arrow-left"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
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
        <Footer />
      </div>
    </Fragment>
  );
};

export default Privacy;
