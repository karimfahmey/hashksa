import React, { useState } from "react";
import { Link } from "react-router-dom";
import { store } from "../../reducers";
import { ApiService } from "../../services/data.service";
import placeholder from "../../assets/img/hashksa-placeholder.jpg";
import "./Bookmark.scss";
import Login from "../../auth/login/Login";

const BookmarkEvents = ({ events }) => {
  const [like, setLike] = useState(false);
  const [bookMark, setBookMark] = useState(false);
  const [openShare, setOpenShare] = useState(false);

  const [showLogin, setShow] = useState(false);

  const userDate = store.getState().authStoreState.isAuthenticated;

  const handleShow = () => setShow(!showLogin);

  return (
    <div className="hksa-page-bookmark-posts">
      <div className="hkas-bookmark-details">
        <div className="container-fluid">
          <div className="row">
            <div className="hkas-bookmark-posts-items">
              {events.length > 0 &&
                events.map((post, index) => (
                  <div
                    className={
                      post.video_url
                        ? "hksa-news-block hksa-news-block--with-video"
                        : "hksa-news-block"
                    }
                    key={index}
                  >
                    {post.main_photo ? (
                        <img src={post.main_photo} alt={post.title} />
                      ) : (
                        <img src={placeholder} alt={post.title} />
                    )}
                    <div className="hksa-news-block-content">
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
                        <span className="hksa-events-item--date">
                          <span>{post.created_at_month}</span>
                          <span>{post.create_at_day_number}</span>
                        </span>
                        {/* 
                      <span className="hksa-news-item--cat">
                        <img
                          src={post.video_url ? videosCat : mainCat}
                          alt="likes"
                        />
                        <span>{post.category.name}</span>
                      </span> */}
                        {userDate ? (
                          <div
                            className={
                              bookMark || post.bookmark
                                ? "hksa-post-bookmark active"
                                : "hksa-post-bookmark"
                            }
                            onClick={async () => {
                              ApiService.postBookmark({ id: post.id })
                                .then((response) => {
                                  if (response.status === true) {
                                    setBookMark(!bookMark);
                                  }
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                          >
                            <i className="icon-bookmark"></i>
                          </div>
                        ) : (
                          <div
                            className={
                              bookMark || post.bookmark
                                ? "hksa-post-bookmark active"
                                : "hksa-post-bookmark"
                            }
                            onClick={handleShow}
                          >
                            <i className="icon-bookmark"></i>
                          </div>
                        )}
                        <Login handleShow={handleShow} show={showLogin} />
                      </header>
                      <footer className="hksa-news-block-footer">
                        <div className="hksa-news-block-footer-info">
                          <div className="hksa-news-block-meta">
                            <span>
                              {post.created_at_day} {post.create_at_day_number} {post.created_at_month}
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
                          <p
                            className="hksa-event-description"
                            dangerouslySetInnerHTML={{
                              __html: post.shortDescription.substring(0, 180),
                            }}
                          ></p>
                          <div
                            className="hksa-news-meta align-items-end"
                            onClick={() => setOpenShare(!openShare)}
                          >
                            <p className="hksa-news-meta-item hksa-share-post justify-content-end">
                              <i className="icon-share"></i>
                            </p>
                            <div
                              className={
                                openShare
                                  ? "hksa-news-share-item active"
                                  : "hksa-news-share-item"
                              }
                            ></div>
                          </div>
                        </div>
                      </footer>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkEvents;
