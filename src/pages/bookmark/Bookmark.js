import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { ApiService } from "../../services/data.service";
import BookmarkPosts from "./BookmarkPosts";
import BookmarkEvents from "./BookmarkEvents";

import "./Bookmark.scss";

const Bookmark = () => {
  const [bookmarkPosts, setBookmarkPosts] = React.useState([]);
  const [bookmarkEvents, setBookmarkEvents] = React.useState([]);

  useEffect(() => {
    ApiService.getBookmarkPosts()
      .then((response) => {
        setBookmarkPosts(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
      ApiService.getBookmarkEvents()
      .then((response) => {
        setBookmarkEvents(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="hksa-page-bookmark">
            <Header />
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
                        <span className="active">المفضلة</span>
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
            <div className="hkas-bookmark-details">
              <div className="container-fluid">
                <div className="row">
                  <Tabs
                    defaultActiveKey="posts"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                  >
                    <Tab
                      eventKey="posts"
                      title={
                        <span>
                          أخبار
                        </span>
                      }
                    >
                      <BookmarkPosts posts={bookmarkPosts} />
                    </Tab>
                    <Tab
                      eventKey="events"
                      title={
                        <span>
                          أحداث
                        </span>
                      }
                    >
                      <BookmarkEvents events={bookmarkEvents} />
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Bookmark;
