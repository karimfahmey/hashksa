import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import placeholder from "../../../assets/img/hashksa-placeholder.jpg";
import "./NewsItemStyle.scss";
import Likes from "../../../assets/img/likes.svg";
import Comments from "../../../assets/img/comments.svg";
import Views from "../../../assets/img/views.svg";
import Like from "../../../actions/Like";

const NewsItem = ({ post }) => {
  return (
    <Fragment>
       <li id={post.id} className="hksa-news-item">
          <div className="hksa-news-item--media">
            <Link to={`/news/${post.id}`}  state={{post}}>
              {post.photo ? (
                  <img src={post.photo} alt={post.title} />
                ) : (
                  <img src={placeholder} alt={post.title} />
              )}
            </Link>
            <span className="hksa-news-item--date">
              <span>{post.category && post.category.name}</span>
            </span>
          </div>
          <div className="hksa-news-item--content">
            <h3 className="hksa-news-title" dangerouslySetInnerHTML={{ __html: post.title }}></h3>
            <div className="hksa-news-meta">
              <Like post={post} size="large" />
              <Link className="hksa-news-meta-item" to={`/news/${post.id}`}>
                <i className="icon-comments"></i>
                <span>{post.comments_count}</span>
                {/* <p className="hksa-news-meta-item"><i className="icon-comments"></i>{post.comments_count}</p> */}
              </Link>
              <p className="hksa-news-meta-item">
                <i className="icon-views"></i>
                <span>{post.view_count}</span>
              </p>
            </div>
          </div>
        </li>
    </Fragment>
  );
};

export default NewsItem;
