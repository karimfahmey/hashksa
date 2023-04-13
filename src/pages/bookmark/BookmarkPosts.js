import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { store } from "../../reducers";
import { ApiService } from "../../services/data.service";
import mainCat from "../../assets/img/icons/main-cat.svg";
import videosCat from "../../assets/img/icons/videos-cat.svg";
import placeholder from "../../assets/img/hashksa-placeholder.jpg";
import "./Bookmark.scss";
import Login from "../../auth/login/Login";

const BookmarkPosts = ({ posts }) => {
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
              {posts.length > 0 &&
                posts.map((post, index) => (
                  <div
                    className={
                      post.video_url
                        ? "hksa-news-block hksa-news-block--with-video"
                        : "hksa-news-block"
                    }
                    key={index}
                  >
                    {post.photo ? (
                        <img src={post.photo} alt={post.title} />
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
                        <span className="hksa-news-item--cat">
                          <img
                            src={post.video_url ? videosCat : mainCat}
                            alt="likes"
                          />
                          <span>{post.category.name}</span>
                        </span>
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
                              {post.create_at_day_number}{" "}
                              {post.created_date_month}{" "}
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
                            {userDate ? (
                              <p
                                className={
                                  like || post.like === true
                                    ? "hksa-news-meta-item like active"
                                    : "hksa-news-meta-item like"
                                }
                                onClick={async () => {
                                  ApiService.postLike({ id: post.id })
                                    .then((response) => {
                                      if (response.status === true) {
                                        setLike(!like);
                                      }
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                }}
                              >
                                <i className="icon-likes"></i>
                                {post.like === true && (
                                  <span>
                                    {like
                                      ? post.like_count - 1
                                      : post.like_count}
                                  </span>
                                )}
                                {post.like === false && (
                                  <span>
                                    {like
                                      ? post.like_count + 1
                                      : post.like_count}
                                  </span>
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
                                <i className="icon-likes"></i>
                                {post.like === true && (
                                  <span>
                                    {like
                                      ? post.like_count - 1
                                      : post.like_count}
                                  </span>
                                )}
                                {post.like === false && (
                                  <span>
                                    {like
                                      ? post.like_count + 1
                                      : post.like_count}
                                  </span>
                                )}
                              </p>
                            )}

                            {userDate ? (
                              <Link
                                className="hksa-news-meta-item"
                                to={`/news/${post.id}`}
                              >
                                <p className="hksa-news-meta-item">
                                  <i className="icon-comments"></i>
                                  <span>{post.comments_count}</span>
                                </p>
                              </Link>
                            ) : (
                              <Link
                                onClick={handleShow}
                                className="hksa-news-meta-item"
                              >
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

export default BookmarkPosts;
