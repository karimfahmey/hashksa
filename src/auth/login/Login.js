import React, { Fragment, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./Login.scss";
import { ApiService } from "../../services/data.service";
import { persistMyInfo } from '../../services/persistence';
import Facebook from "../socialLogin/Facebook";
import Google from "../socialLogin/Google";
import Twitter from "../socialLogin/Twitter";

const Login = ({handleShow, show}) => {

  const [t] = useTranslation();

  // Creating schema
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("يرجي إدخال البريد الإلكتروني")
      .email("بريد إلكتروني غير صالح"),
    password: Yup.string()
      .required("كلمة المرور مطلوبة")
      .min(6, "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل"),
  });

  return (
    <Fragment>
      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>تسجيل الدخول</h2>
            <p>
              ليس لديك حساب ؟ <Link>انشاء حساب جديد</Link>{" "}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { props }) => {
              ApiService.login({email: values.email, password: values.password})
              .then( response => {
                // setShow(false)
                persistMyInfo(response.data)
                setTimeout(()=>{
                    window.location.reload(false);
                    localStorage.getItem("guest");
                }, 500);
              })
              .catch( err => {
                  console.log(err)
              })
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <div className="login">
                <div className="form">
                  <form noValidate onSubmit={handleSubmit}>
                    <div className="input-group mb-4 w-100">
                      <label htmlFor="email" className="form-label">
                        {t("email")}
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder={t("email")}
                        className="form-control inp_text"
                      />
                      <i className="icon-email"></i>
                    </div>
                    <p className="error">
                    {errors.email && touched.email && errors.email}
                    </p>
                    <div className="input-group mb-4 w-100">
                      <label htmlFor="password" className="form-label">
                        {t("password")}
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder={t("passwordPlch")}
                        className="form-control"
                      />
                      <i className="icon-lock"></i>
                    </div>
                    <p className="error">
                    {errors.password && touched.password && errors.password}
                    </p>
                    <button className="login-submit" type="submit">{t('login')}</button>
                  </form>
                </div>
              </div>
            )}
          </Formik>
          <div className="hksa-social-login">
            <div className="hksa-separator-login">
              <p>التسجيل عبر</p>
            </div>
            <div className="hksa-social-login-item">
              <Google />
              <Facebook />
              <Twitter />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default Login;
