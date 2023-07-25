import React, { Fragment, useState } from "react";
import Login from "../auth/login/Login";
import { store } from "../reducers";
import { ApiService } from "../services/data.service";

const Bookmark = ({ id, data, type }) => {
  const [bookMark, setBookMark] = useState(false);
  const userDate = store.getState().authStoreState.isAuthenticated;
  const [showLogin, setShow] = useState(false);
  const handleShow = () => setShow(!showLogin);

  const device_ids = localStorage.getItem('guest');

  const handleBookmark = async () => {
    if(type === "events" ) {
      ApiService.eventBookmark({ id: id, device_id: device_ids })
      .then((response) => {
        if (response.status === true) {
            setBookMark(!bookMark);
          }
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      }
      if(type === "post" ) {
        ApiService.postBookmark({ id: id, device_id: device_ids })
        .then((response) => {
          if (response.status === true) {
            setBookMark(!bookMark);
          }
          console.log(response);
          console.log(device_ids);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Fragment>
      {userDate ? (
        <div
          className={
            bookMark || data.bookmark
              ? "hksa-post-bookmark active"
              : "hksa-post-bookmark"
          }
          onClick={handleBookmark}
        >
          <i className="icon-bookmark"></i>
        </div>
      ) : (
        <div
          className={
            bookMark && bookMark && data.bookmark
              ? "hksa-post-bookmark active"
              : "hksa-post-bookmark"
          }
          onClick={handleBookmark}
        >
          <i className="icon-bookmark"></i>
        </div>
      )}
      <Login handleShow={handleShow} show={showLogin} />
    </Fragment>
  );
};

export default Bookmark;
