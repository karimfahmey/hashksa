import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { ApiService } from "../../services/data.service";
import "./Terms.scss";
import placeholder from "../../assets/img/hashksa-placeholder.jpg";
import HelmetMetaData from "../../services/HelmetData";

const TermsMobile = () => {
  const [terms, setTerms] = React.useState([]);

  useEffect(() => {
    ApiService.getTerms()
      .then((response) => {
        setTerms(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      <HelmetMetaData
        title="هاشتاق السعودية - سياسة الاستخدام"
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
                      __html: terms.terms?.description,
                    }}
                  ></div>
                </div>
              </div>
              <div className="col-md-4">
                <img
                  src={terms.terms?.main_photo}
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

export default TermsMobile;
