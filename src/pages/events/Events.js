import React from "react";
import Header from "../../components/header/Header";
import Hero from "../../components/hero/Hero";
import Events from "../../components/events/Events";
import SideBar from "../../components/sidebar/SideBar";
import "./EventsStyle.scss";
import Footer from "../../components/footer/Footer";
import NewsLater from "../../components/newslater/NewsLater";
import HelmetMetaData from "../../services/HelmetData";
import placeholder from "../../assets/img/hashksa-placeholder.jpg";

const EventsPage = () => {
  return (
    <React.Fragment>
      <HelmetMetaData
        title="هاشتاق السعودية - الأحداث"
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
              <Events />
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

export default EventsPage;
