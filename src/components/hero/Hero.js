import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import HeroImg from "../../assets/img/hero-icon.svg";
import "./HeroStyle.scss";
import SearchForm from "./SearchForm";

const Hero = () => {
  const [t] = useTranslation();

  return (
    <div className="hksa-hero-wrapper">
      <div className="container-fluid">
        <div className="row d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
          <div className="col-md-8">
            <div className="hksa-hero-body">
              <h1>
                ما يحدث في مواقع التواصل الاجتماعي
                <br></br>
                في منصة واحدة
              </h1>
            </div>
          </div>
          <div className="col-md-4 text-start">
            <img width="200" height="200" src={HeroImg} alt="hero" />
          </div>
        </div>
      </div>
      <div className="hksa-hero-serach">
        <div className="hksa-hero-routes-btn">
          <nav>
            <NavLink to="/">{t("news")}</NavLink>
            <NavLink to="/trend">{t("trend")}</NavLink>
            <NavLink to="/events">{t("events")}</NavLink>
            <NavLink to="/surveys">{t("surveys")}</NavLink>
          </nav>
        </div>
      </div>
      {/* <SearchForm /> */}
    </div>
  );
};

export default Hero;
