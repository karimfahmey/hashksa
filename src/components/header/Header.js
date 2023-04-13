import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { store } from "../../reducers";
import { ToastContainer } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
// import "./HeaderStyle.scss";
import Logo from "../../assets/img/logo.svg";
import { useSelector } from "react-redux";
import Login from "../../auth/login/Login";
import { unpersistMyInfo } from "../../services/persistence";
import userProfile from "../../assets/img/user-profile.svg";
import Register from "../../auth/register/Register";
import { ApiService } from "../../services/data.service";
import Mobile from "../responsive/Mobile";
import Desktop from "../responsive/Desktop";
import Tablet from "../responsive/Tablet";
import SearchForm from "../hero/SearchForm";

const Header = () => {

  const [t] = useTranslation();

  const isAuthenticated = useSelector(
    (state) => state.authStoreState.isAuthenticated
  );

  useEffect(() => {
    if(!isAuthenticated) {
      window.localStorage.setItem('type_user', 'guest')
    }
  }, []);
  
  const [showLogin, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleShow = () => setShow(!showLogin);
  const handleShowRegister = () => setShowRegister(!showRegister);
  const handleShowSearch = () => setShowSearch(!showSearch);
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleCloseMenu = () => {
    setShowMenu(!showMenu);
  };

  const logout = () => {
    unpersistMyInfo();
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  };

  return (
    <header className="header">
      <div className="container-fluid">
        <div className="row">
          <div className="hksa-header-wrapper d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-5">
            <div className="col-md-3 col-6">
              <div className="logo d-flex flex-wrap">
                <Link to="/">
                  <img src={Logo} alt="logo" />
                </Link>
              </div>
            </div>
            <Mobile className="hksa-mobile-layout col-6 d-flex justify-content-end">
              <button className="hksa-open-menu" onClick={handleShowMenu}>
                <i className="fa-solid fa-bars"></i>
              </button>
              <div
                className={showMenu ? "hksa-sidemenu active" : "hksa-sidemenu"}
              >
                <div className="logo d-flex align-items-center justify-content-between">
                  <Link to="/">
                    <img src={Logo} alt="logo" />
                  </Link>
                  <div className="close-menu" onClick={handleCloseMenu}>
                  <i className="fa-solid fa-xmark"></i>
                  </div>
                </div>
                <div className="hksa-sidemenu-nav">
                  <nav>
                    <li>
                      <NavLink to="/">{t("home")}</NavLink>
                    </li>
                    <li>
                      <NavLink to="/bookmark">{t("favorite")}</NavLink>
                    </li>
                    <li>
                      <NavLink to="/contact-us">{t("contact")}</NavLink>
                    </li>
                  </nav>
                  <div className="col-md-3 hksa-action-header">
                    <div className="hksa-header-action">
                      {isAuthenticated ? (
                        <Dropdown>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <img src={userProfile} alt="logo" />
                            الحساب الشخصي
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="/profile">
                              معلومات الحساب
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2"> الاحداث </Dropdown.Item>
                            <Dropdown.Item
                              as="button"
                              onClick={logout}
                              href="#/action-3"
                            >
                              تسجيل الخروج
                              <i className="icon-logout"></i>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      ) : (
                        <Fragment>
                          <button
                            type="button"
                            className="btn btn-login"
                            onClick={handleShowRegister}
                          >
                            {t("signup")}
                          </button>
                          <Register
                            handleShow={handleShowRegister}
                            show={showRegister}
                          />
                          <button
                            type="button"
                            className="btn btn-signup me-2"
                            onClick={handleShow}
                          >
                            {t("login")}
                          </button>
                          <Login handleShow={handleShow} show={showLogin} />
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Mobile>
            <Desktop className="col-md-6 justify-content-center d-flex">
              <div className="hksa-navbar-wrapper">
                <nav>
                  <li>
                    <NavLink to="/">{t("home")}</NavLink>
                  </li>
                  <li>
                    <NavLink to="/bookmark">{t("favorite")}</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact-us">{t("contact")}</NavLink>
                  </li>
                </nav>
                <div className="hksa-search-btn">
                  <div className="hksa-search-action" onClick={handleShowSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28.15" height="28.202" viewBox="0 0 28.15 28.202">
                      <g id="Group_13" data-name="Group 13" transform="translate(0.503 0.526)">
                      <path id="Path_229" data-name="Path 229" d="M149.461,396.944a3.579,3.579,0,0,1-.147-.839,10.9,10.9,0,0,0-8.3-9.088,11.174,11.174,0,1,0,8.1,13.557,11.477,11.477,0,0,0,.3-1.747c0-.048-.017-.11.054-.132v-.265c-.106-.072-.033-.174-.045-.262.023-.248-.072-.5.045-.746Zm-11.207,9.961a9.065,9.065,0,1,1,9.078-9.063A9.092,9.092,0,0,1,138.254,406.905Z" transform="translate(-122.313 -386.639)" fill="#777e90" stroke="#777e90" strokeWidth="1"/>
                      <path id="Path_230" data-name="Path 230" d="M414.586,679.971a2.47,2.47,0,0,0,.8-.62q2.191-2.2,4.385-4.389a1.062,1.062,0,1,0-1.5-1.5q-1.441,1.446-2.887,2.886c-.544.544-1.06,1.119-1.638,1.623a1.116,1.116,0,0,0,.362,1.995Z" transform="translate(-413.276 -652.795)" fill="#777e90" stroke="#777e90" strokeWidth="1"/>
                      <path id="Path_231" data-name="Path 231" d="M127.14,538.71c-.118.242-.023.5-.045.746l.045,0Z" transform="translate(-99.993 -527.928)" fill="#777e90" stroke="#777e90" strokeWidth="1"/>
                      <path id="Path_232" data-name="Path 232" d="M127.138,549.19l-.045,0c.012.088-.06.191.045.262Z" transform="translate(-99.991 -537.665)" fill="#777e90" stroke="#777e90" strokeWidth="1"/>
                      </g>
                    </svg>
                  </div>
                {showSearch && <SearchForm /> } 
                </div>
              </div>
            </Desktop>
            <Desktop className="col-md-3 hksa-action-header">
              <div className="hksa-header-action">
                {isAuthenticated ? (
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <img src={userProfile} alt="logo" />
                      الحساب الشخصي
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="/profile">
                        معلومات الحساب
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2"> الاحداث </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={logout}
                        href="#/action-3"
                      >
                        تسجيل الخروج
                        <i className="icon-logout"></i>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Fragment>
                    <button
                      type="button"
                      className="btn btn-login"
                      onClick={handleShowRegister}
                    >
                      {t("signup")}
                    </button>
                    <Register
                      handleShow={handleShowRegister}
                      show={showRegister}
                    />
                    <button
                      type="button"
                      className="btn btn-signup me-2"
                      onClick={handleShow}
                    >
                      {t("login")}
                    </button>
                    <Login handleShow={handleShow} show={showLogin} />
                  </Fragment>
                )}
              </div>
            </Desktop>
          </div>
        </div>
      </div>
      <ToastContainer />
    </header>
  );
};

export default Header;
