import React from 'react'
import Header from "../../components/header/Header";
import Hero from "../../components/hero/Hero";
import Events from "../../components/events/Events";
import SideBar from "../../components/sidebar/SideBar";
import './NewsStyle.scss';
import Footer from "../../components/footer/Footer";
import NewsLater from "../../components/newslater/NewsLater";

function News() {
  return (
    <React.Fragment>
      <div className="hksa-page-start">
        <div className="container-fluid">
          <div className="row">
            <Header />
            <Hero />
          </div>
        </div>
      </div>
      <div className="hksa-page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-1">
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

export default News