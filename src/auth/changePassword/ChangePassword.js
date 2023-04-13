import React from "react";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as Yup from "yup";
import "./ChangePassword.scss";
import { ApiService } from "../../services/data.service";
import { useTranslation } from "react-i18next";

const ChangePassword = ({ show, handleShow, phone }) => {

  const [t] = useTranslation();

  // Creating schema
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(6, "Password must be at least 6 characters"),
  });

  return (
    <Modal show={show} onHide={handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>اعادة تعيين الرمز السري</h2>
          <p>  ادخل رمز سري جديد واختار كلمات او ارقام تتذكرها لاحقا </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Formik
            initialValues={{ password_confirmation: "", password: "" }}
            onSubmit={(values) => {
              ApiService.updatePassword({phone: phone, password_confirmation: values.password_confirmation, password: values.password})
              .then( response => {
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
                        {t("Newpassword")}
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder={t("passwordPlch")}
                        className="form-control inp_text"
                      />
                      <i className="icon-lock"></i>
                    </div>
                    <p className="error">
                    {errors.password && touched.password && errors.password}
                    </p>
                    <div className="input-group mb-4 w-100">
                      <label htmlFor="password_confirmation" className="form-label">
                        {t("Confirmpassword")}
                      </label>
                      <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password_confirmation}
                        placeholder={t("passwordPlch")}
                        className="form-control"
                      />
                      <i className="icon-lock"></i>
                    </div>
                    <p className="error">
                    {errors.password_confirmation && touched.password_confirmation && errors.password_confirmation}
                    </p>
                    <button className="login-submit" type="submit">{t('changePassword')}</button>
                  </form>
                </div>
              </div>
            )}
          </Formik>
        </Modal.Body>
    </Modal>
  );
};

export default ChangePassword;
