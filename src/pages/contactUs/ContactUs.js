import { useFormik } from "formik";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { ApiService } from "../../services/data.service";
import "./ContactUs.scss";
import Contact from "../../assets/img/hero.svg";
import placeholder from "../../assets/img/hashksa-placeholder.jpg";
import HelmetMetaData from "../../services/HelmetData";

const ContactUs = () => {
  const [contact, setContact] = React.useState([]);

  const ContactUs = useFormik({
    initialValues: {
      email: "",
      des: "",
    },
    onSubmit: async (values) => {
      ApiService.postContactUs({
        email: values.email,
        des: values.des,
        device: "web",
      })
        .then((response) => {
          if (response.status === false) {
            toast.error(response.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "colored",
            });
          } else {
            toast.success(response.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "colored",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  useEffect(() => {
    ApiService.getContactUs()
      .then((response) => {
        setContact(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      <HelmetMetaData
        title="هاشتاق السعودية - تواصل معانا"
        description="ما يحدث في مواقع التواصل الاجتماعيفي منصة واحدة"
        image={placeholder}
        quote="يقدم لك آخر الأحداث في السعودية عبر تغطية مستمرة لما يتم تداوله عبر وسائل التواصل الاجتماعي على مدار الساعة"
      />
      <div className="hksa-page-contact-us">
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
                    <span className="active">تواصل معنا</span>
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
        <div className="hkas-contactus-details">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 offset-4">
                <div className="hkas-contactus-form">
                  <div className="hkas-contactus-form-title">
                    <h3>تواصل معنا</h3>
                    <p>
                      إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص
                      العربى زيادة عدد الفقرات كما تريد
                    </p>
                  </div>
                  <form onSubmit={ContactUs.handleSubmit}>
                    <div className="input-group mb-4 w-100">
                      <label htmlFor="email" className="form-label">
                      البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={ContactUs.handleChange}
                        onBlur={ContactUs.handleBlur}
                        value={ContactUs.values.email}
                        placeholder="البريد الإلكتروني"
                        className="form-control inp_text"
                      />
                      <i className="icon-email"></i>
                    </div>
                    <div className="input-group mb-4 w-100">
                      <label htmlFor="email" className="form-label">
                        التفاصيل
                      </label>
                      <textarea
                        name="des"
                        id="des"
                        onChange={ContactUs.handleChange}
                        onBlur={ContactUs.handleBlur}
                        value={ContactUs.values.des}
                        placeholder="اكتب تفاصيل الرسالة..."
                        className="form-control inp_text"
                      />
                    </div>
                    <button className="login-submit" type="submit">
                      ارسل
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-md-4">
                <img src={Contact} alt="" className="hkas-contactus-img" />
                <div className="hksa-contactus-text">
                  <h5>تواصل معنا</h5>
                  <ul>
                    <li>
                      <i className="icon-email"></i>
                      <p>{contact.email}</p>
                    </li>
                    <li>
                      <i className="icon-phone"></i>
                      <p>{contact.phone}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
        <Footer />
      </div>
    </Fragment>
  );
};

export default ContactUs;
