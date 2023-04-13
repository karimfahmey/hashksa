import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./SinglePost.scss";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";

import User from "../../assets/img/user-placeholder.svg";
import { ApiService } from "../../services/data.service";
import Moment from "react-moment";
import "moment/locale/ar";
import { useFormik } from "formik";
import Replay from "./Replay";
import ShareAction from "../../actions/ShareAction";
import Like from "../../actions/Like";
// import { Helmet } from "react-helmet-async";
import HelmetMetaData from "../../services/HelmetData";

const SinglePost = () => {
  const userId = useParams();

  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [showReplay, setShowReplay] = useState();
  const [bookMark, setBookMark] = useState(false);

  useEffect(() => {
    const type_user = localStorage.getItem('type_user');

    ApiService.postsShow({ id: userId.id, session: type_user })
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const handleBookmark = async () => {
    ApiService.postBookmark({ id: userId.id })
      .then((response) => {
        if (response.status === true) {
          setBookMark(!bookMark);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: (values) => {
      ApiService.postComment({ post_id: userId.id, comment: values.comment })
        .then((response) => {
          setComment(response.data.comment);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const Desc = post?.des_no_html?.substring(0, 170)

  console.log(post);

  return (
    <React.Fragment>
      <HelmetMetaData
        title={`هاشتاق السعودية - ${post?.title}`}
        description={Desc}
        image={post?.photo}
        quote={post?.title}
      ></HelmetMetaData>
      <div className="hksa-page-start">
        <div className="container-fluid">
          <div className="row">
            <Header />
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="breadcrumb">
              <ul>
                <li>
                  <a href="/">الرئيسية</a>
                </li>
                <li>
                  <i className="fa fa-angle-left"></i>
                  <span
                    className="active"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  ></span>
                </li>
              </ul>
              <Link to="/">
                <span className="back-home">
                  الرجوع الى الرئيسية <i className="fa-solid fa-arrow-left"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="single-post">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-1">
              <div className="single-post-data">
                { post.photo && post.video_url === "" && (
                  <img
                    className="post-image"
                    src={post.photo}
                    alt={post.title}
                  />
                )}
                {post.video_url && (
                  <iframe className="post-video"  title={post.title} src={post.video_url} />
                )}
                <div
                  className={
                    bookMark || post.bookmark
                      ? "hksa-post-bookmark active"
                      : "hksa-post-bookmark"
                  }
                  onClick={handleBookmark}
                >
                  <i className="icon-bookmark"></i>
                </div>
                <div className="single-post-date--content">
                  <div className="single-post-content--block">
                    <div className="single-post-title-block">
                      <span className="hksa-posts-item--date">
                        <span>{post.create_at_day_number}</span>
                        <span>{post.created_date_month}</span>
                        <span>{post.created_time}</span>
                        <span>{post.time_am_or_pm}</span>
                      </span>
                      <h1
                        className="hksa-posts-title"
                        dangerouslySetInnerHTML={{ __html: post.title }}
                      ></h1>
                    </div>
                    <ul className="hksa-tags-list">
                      {post.tags &&
                        post.tags.map((item, index) => (
                          <li key={index} id={item.name}>
                            {item.name}
                          </li>
                        ))}
                    </ul>
                    <div
                      className="single-post-description"
                      dangerouslySetInnerHTML={{ __html: post.des }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="single-post-data">
                <div className="single-post-comments--info">
                  <div className="single-post-comment-info">
                    <h3>
                      التعليقات <span>({post.comments_count})</span>
                    </h3>
                  </div>
                  <div className="single-post-meta-info">
                    <Like post={post} />
                    <p className="hksa-news-meta-item">
                      <i className="icon-comments"></i>
                      <span>{post.comments_count}</span>
                    </p>
                    <p className="hksa-news-meta-item">
                      <i className="icon-views"></i>
                      <span>{post.view_count}</span>
                    </p>
                    <ShareAction
                      title="مشاركة الخبر"
                      post={post}
                      type="news"
                      schema="relative"
                    />
                  </div>
                </div>
              </div>
              {post.comments && (
                <div id="comments" className="single-post-data single-comments-data">
                  <div className="single-post-comments">
                    <ul>
                      {post.comments &&
                        post.comments.map((item, index) => (
                          <li key={item.id} id={item.name}>
                            <div className="single-post-comment--block">
                              <div className="single-post-comment-user">
                                <img
                                  src={item.user.photo ? item.user.photo : User}
                                  alt={item.user.name}
                                />
                              </div>
                              <div className="single-post-comment">
                                <div className="single-post-comment--user-name">
                                  {item.user.name}
                                  <span className="hksa-dots">.</span>
                                  <span className="single-post-comment--date">
                                    <Moment locale="ar" fromNow>
                                      {item.user.created_at}
                                    </Moment>
                                  </span>
                                </div>
                                <div className="single-post-comment-text">
                                  {item.comment}
                                </div>
                                <div className="single-post-comment-replay">
                                  <div className="hksa-form-reply">
                                    <button
                                      onClick={() => setShowReplay(index)}
                                    >
                                      <p>رد</p>
                                      <i className="icon-reply"></i>
                                    </button>
                                  </div>
                                  <div className="hksa-replys">
                                    {item.replay.length > 0 && (
                                      <p>
                                        الردود
                                        <span>({item.replay.length})</span>
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="single-post-comment-info"></div>
                            </div>
                            {showReplay === index && <Replay item={item} />}
                          </li>
                        ))}
                      {comment && comment.user && (
                        <li id={comment.name}>
                          <div className="single-post-comment--block">
                            <div className="single-post-comment-user">
                              <img
                                src={
                                  comment.user.photo ? comment.user.photo : User
                                }
                                alt={comment.user.name}
                              />
                            </div>
                            <div className="single-post-comment">
                              <div className="single-post-comment--user-name">
                                {comment.user.name}
                                <span className="hksa-dots">.</span>
                                <span className="single-post-comment--date">
                                  <Moment locale="ar" fromNow>
                                    {comment.user.created_at}
                                  </Moment>
                                </span>
                              </div>
                              <div className="single-post-comment-text">
                                {comment.comment}
                              </div>
                              <div className="single-post-comment-replay"></div>
                            </div>
                            <div className="single-post-comment-info"></div>
                          </div>
                          <ul className="hksa-comments-replay">
                            {comment.replay &&
                              comment.replay.map((comment, index) => (
                                <li key={index} id={comment.id}>
                                  <div className="single-post-comment-user">
                                    <img
                                      src={
                                        comment.user.photo
                                          ? comment.user.photo
                                          : User
                                      }
                                      alt={comment.user.name}
                                    />
                                  </div>
                                  <div className="single-post-comment">
                                    <div className="single-post-comment--user-name">
                                      {comment.user.name}
                                      <span className="hksa-dots">.</span>
                                      <span className="single-post-comment--date">
                                        <Moment locale="ar" fromNow>
                                          {comment.user.created_at}
                                        </Moment>
                                      </span>
                                    </div>
                                    <div className="single-post-comment-text">
                                      {comment.comment}
                                    </div>
                                    <div className="single-post-comment-replay"></div>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="single-post-data--comments">
                    <div className="hksa-comment-action">
                      <div className="hksa-comment-action--form">
                        <form onSubmit={formik.handleSubmit}>
                          <div className="form-group">
                            <img src={User} alt="comment" />
                            <input
                              placeholder="اكتب تعليقأ هنا..."
                              type="text"
                              id="comment"
                              name="comment"
                              onChange={formik.handleChange}
                              value={formik.values.comment}
                            />
                          </div>
                          <div className="form-action">
                            <button type="submit">
                              <i className="icon-send"></i>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-3">
              <SideBar />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default SinglePost;
