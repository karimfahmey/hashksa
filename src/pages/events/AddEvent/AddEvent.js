import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/header/Header";
import AddForm from "./AddForm";
import "./AddEvent.scss"
import Footer from "../../../components/footer/Footer";

const AddEvent = () => {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <Header />
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
                      <span>الاحداث</span>
                    </li>
                    <li>
                      <i className="fa fa-angle-left"></i>
                      <span className="active">إضافة حدث</span>
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
          <div className="hksa-add-event-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                    <div className="hksa-add-event--title">
                        <h3>اضافة حدث جديد</h3>
                        <p>إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد</p>
                    </div>
                </div>
                <AddForm/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AddEvent;
