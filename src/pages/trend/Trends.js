import React from "react";
import Header from "../../components/header/Header";
import Hero from "../../components/hero/Hero";
import SideBar from "../../components/sidebar/SideBar";
import Footer from "../../components/footer/Footer";
import NewsLater from "../../components/newslater/NewsLater";
import Trend from "../../components/trend/Trend";
import placeholder from "../../assets/img/hashksa-placeholder.jpg";
import HelmetMetaData from "../../services/HelmetData";

const Trends = () => {
  return (
    <React.Fragment>
      <HelmetMetaData
        title="هاشتاق السعودية - ترند"
        description="ما يحدث في مواقع التواصل الاجتماعيفي منصة واحدة"
        image={placeholder}
        quote="يقدم لك آخر الأحداث في السعودية عبر تغطية مستمرة لما يتم تداوله عبر وسائل التواصل الاجتماعي على مدار الساعة"
      ></HelmetMetaData>
      <div className="hksa-page-start">
        <div className="container-fluid">
          <div className="row">
            <Header />
          </div>
        </div>
      </div>
      <div className="hksa-page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-1">
              <Hero />
              <Trend />
            </div>
            <div className="col-md-3">
              <SideBar />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <NewsLater />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Trends;
