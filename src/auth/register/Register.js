import React, { Fragment, useState } from "react";
import { Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./Register.scss";
import { ApiService } from "../../services/data.service";
import { persistMyInfo } from "../../services/persistence";
import Google from "../socialLogin/Google";
import Facebook from "../socialLogin/Facebook";

const Register = ({handleShow, show}) => {

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
            <h2>انشاء حساب</h2>
            <p>
              لديك حساب بالفعل ؟<Link> تسجيل الدخول</Link>{" "}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            initialValues={{ name: "", phone: "", email: "", password: "" }}
            onSubmit={(values) => {
              ApiService.registerStepOne({
                name: values.name,
                phone: values.phone,
                email: values.email,
                password: values.password,
              })
                .then((response) => {
                  // setShow(false);
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
                    persistMyInfo(response.data);
                    setTimeout(() => {
                      window.location.reload(false);
                    }, 500);
                  }
                })
                .catch((err) => {
                  toast(err);
                  console.log(err);
                });
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
                      <label htmlFor="name" className="form-label">
                        {t("name")}
                      </label>
                      <input
                        type="name"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder={t("name")}
                        className="form-control inp_text"
                      />
                      <i className="icon-user"></i>
                    </div>
                    <p className="error">
                      {errors.name && touched.name && errors.name}
                    </p>
                    <div className="input-group mb-4 w-100">
                      <label htmlFor="phone" className="form-label">
                        {t("phone")}
                      </label>
                      <input
                        type="phone"
                        name="phone"
                        id="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        placeholder={t("phone")}
                        className="form-control inp_text"
                      />
                      <i className="icon-phone"></i>
                    </div>
                    <p className="error">
                      {errors.phone && touched.phone && errors.phone}
                    </p>
                    <div className="input-group mb-4 w-100">
                      <label htmlFor="email" className="form-label">
                      البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="البريد الإلكتروني"
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
                    <button className="login-submit" type="submit">
                      {t("register")}
                    </button>
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
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </Fragment>
  );
};

export default Register;
