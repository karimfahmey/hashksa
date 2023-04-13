import React, { useState } from "react";
import { Link } from "react-router-dom";
import placeholder from "../../assets/img/hashksa-placeholder.jpg";
import { store } from "../../reducers";
import "./NewsMasonryitem.scss";
import ShareAction from "../../actions/ShareAction";
import Like from "../../actions/Like";
import Bookmark from "../../actions/Bookmark";

const NewsMasonryitem = ({ post }) => {
  const [openShare, setOpenShare] = useState(false);

  const [showLogin, setShow] = useState(false);

  const userDate = store.getState().authStoreState.isAuthenticated;

  const handleShow = () => setShow(!showLogin);
  
  return (
    <div
      className={
        post.video_url
          ? "hksa-news-block hksa-news-block--with-video"
          : "hksa-news-block"
      }
    >
      <div className="post-image-warpper">
        {post.photo ? (
            <img className="post-image" src={post.photo} alt={post.title} />
          ) : (
            <img className="post-image" src={placeholder} alt={post.title} />
        )}
      </div>
      <div
        className={
          openShare
            ? "hksa-news-block-content active"
            : "hksa-news-block-content"
        }
      >
        <header className="hksa-news-block-header">
          {post.video_url ? (
            <Link to={`/news/${post.id}`}>
              <div className="hksa-play">
                <i className="icon-play"></i>
              </div>
            </Link>
          ) : (
            ""
          )}
          <span className="hksa-news-item--cat">
            <img src={post.category && post.category.icon} alt="likes" />
            <span>{post.category && post.category.name}</span>
          </span>
          <Bookmark id={post.id} data={post} type="post" />
        </header>
        <footer className="hksa-news-block-footer">
          <div className="hksa-news-block-footer-info">
            <div className="hksa-news-block-meta">
              <span>
                {post.create_at_day_number} {post.created_date_month}{" "}
                <span>
                  {post.created_time} {post.time_am_or_pm}
                </span>
              </span>
            </div>
            <Link to={`/news/${post.id}`}>
              <h3
                className="hksa-news-title"
                dangerouslySetInnerHTML={{ __html: post.title }}
              ></h3>
            </Link>
          </div>
          <div className="hksa-news-meta-block">
            <div className="hksa-news-meta">
              <Like post={post} />
              {userDate ? (
                <Link className="hksa-news-meta-item" to={`/news/${post.id}`}>
                  <p className="hksa-news-meta-item">
                    <i className="icon-comments"></i>
                    <span>{post.comments_count}</span>
                  </p>
                </Link>
              ) : (
                <Link onClick={handleShow} className="hksa-news-meta-item">
                  <p className="hksa-news-meta-item">
                    <i className="icon-comments"></i>
                    <span>{post.comments_count}</span>
                  </p>
                </Link>
              )}
              <p className="hksa-news-meta-item">
                <i className="icon-views"></i>
                <span>{post.view_count}</span>
              </p>
            </div>
            <ShareAction
              title="مشاركة الخبر"
              post={post}
              type="news"
              schema="dark"
            />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default NewsMasonryitem;
