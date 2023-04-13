import React, { Fragment } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import SearchForm from "../../components/hero/SearchForm";
import "./Notfound.scss";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <Header />
          <div className="hksa-notdound-page">
            <div className="hksa-notdound-header">
              <h2>تعذر العثور على الصفحة</h2>
              <p>الصفحة التي تبحث عنها غير موجودة؛ ربما تم نقله أو إزالته تمامًا. استخدم وظيفة البحث أو عد إلى الصفحة الأولى.</p>
            </div>
            <div className="hksa-notdound-footer">
              <SearchForm />
              <Link to="/" className="btn btn-primary">الصفحة الرئيسية</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Notfound;
