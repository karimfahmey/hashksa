import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import './Login.scss';

export const InnerForm = (props) => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
  } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [t] = useTranslation();

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-signup me-2"
        onClick={handleShow}
      >
        {t("login")}
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>تسجيل الدخول</h2>
            <p>
              ليس لديك حساب ؟ <Link>انشاء حساب جديد</Link>{" "}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="login">
            <div className="form">
              <form noValidate onSubmit={handleSubmit}>
                <div className="input-group mb-4 w-100">
                  <label htmlFor="username" className="form-label">
                    {t("username")}
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    placeholder="Enter email id / username"
                    className="form-control inp_text"
                  />
                  <i className="icon-email"></i>
                </div>
                <p className="error">
                  {errors.username && touched.username && errors.username}
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
                  {t("login")}
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};
