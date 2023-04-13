import React, { Fragment, useState } from "react";
import Login from "../auth/login/Login";
import { store } from "../reducers";
import { ApiService } from "../services/data.service";

const Like = ({post, size}) => {
  const [like, setLike] = useState(false);
  const [postLike, setPostLike] = useState(post.like);
  const [showLogin, setShow] = useState(false);
  const handleShow = () => setShow(!showLogin);

  const userDate = store.getState().authStoreState.isAuthenticated;

  const handleLike = async () => {
    ApiService.postLike({ id: post.id })
      .then((response) => {
        if (response.status === true) {
          setLike(!like);
          setPostLike(!postLike);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      {userDate ? (
        <p
          className={
            like || post.like === true
              ? "hksa-news-meta-item like active"
              : "hksa-news-meta-item like"
          }
          onClick={handleLike}
        >
          <i className={size === "large" ? "icon-likes large": "icon-likes"}></i>
          {post.like === true && (
            <span>{like ? post.like_count - 1 : post.like_count}</span>
          )}
          {post.like === false && (
            <span>{like ? post.like_count + 1 : post.like_count}</span>
          )}
        </p>
      ) : (
        <p
          className={
            like || post.like === true
              ? "hksa-news-meta-item like active"
              : "hksa-news-meta-item like"
          }
          onClick={handleShow}
        >
          <i className={size === "large" ? "icon-likes large": "icon-likes"}></i>
          {post.like === true && (
            <span>{like ? post.like_count - 1 : post.like_count}</span>
          )}
          {post.like === false && (
            <span>{like ? post.like_count + 1 : post.like_count}</span>
          )}
        </p>
      )}
      <Login handleShow={handleShow} show={showLogin} />
    </Fragment>
  );
};

export default Like;
