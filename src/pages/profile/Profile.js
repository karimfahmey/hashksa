import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import ProfileEdit from "./ProfileEdit";

const Profile = () => {
  return (
    <div className="hksa-page-profile">
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
                  <span className="active">الملف الشخصي</span>
                </li>
              </ul>
              <Link to="/">
                <span className="back-home">
                  الرجوع الى الرئيسية <i className="fa-solid fa-arrow-left"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="hksa-profile-title">
              <h2>تعديل الملف الشخصي</h2>
              <p>إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص</p>
            </div>
            <ProfileEdit />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
