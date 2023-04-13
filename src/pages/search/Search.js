import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import SearchForm from "../../components/hero/SearchForm";
import NewsLater from "../../components/newslater/NewsLater";
import SideBar from "../../components/sidebar/SideBar";
import { ApiService } from "../../services/data.service";
import HeroImg from "../../assets/img/hero-icon.svg";
import { useTranslation } from "react-i18next";
import NewsMasonrySearch from "../../components/news/NewsMasonrySearch";
import EventsSearch from "../../components/events/EventsSearch";
import PollSearch from "../../components/poll/PollSearch";
import NotFound from "./NotFound";
import "./Search.scss";
import HelmetMetaData from "../../services/HelmetData";
import placeholder from "../../assets/img/hashksa-placeholder.jpg";

const Search = () => {
  const [t] = useTranslation();

  const [posts, setPosts] = useState([]);
  const [postLinks, setPostLinks] = useState();
  const [postMeta, setPostMeta] = useState();
  const [currentPost, setCurrentPost] = useState();
  const [events, setEvents] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const SearchValue = localStorage.getItem("SearchValue");

  useEffect(() => {
    ApiService.SearchItems({ query: SearchValue })
      .then((response) => {
        setPosts(response.data.posts.data);
        setPostLinks(response.data.posts.links);
        setPostMeta(response.data.posts.meta);
        setCurrentPost(response.data.posts.meta.current_page);

        setEvents(response.data.events.data);
        setSurveys(response.data.surveys.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <React.Fragment>
      <HelmetMetaData
        title={"هاشتاق السعودية - نتائج البحث (" + SearchValue + ")"}
        description="ما يحدث في مواقع التواصل الاجتماعيفي منصة واحدة"
        image={placeholder}
        quote="يقدم لك آخر الأحداث في السعودية عبر تغطية مستمرة لما يتم تداوله عبر وسائل التواصل الاجتماعي على مدار الساعة"
      />
      <Tab.Container id="left-tabs-example" defaultActiveKey={t("news")}>
        <div className="hksa-page-start">
          <div className="container-fluid">
            <div className="row">
              <Header />
            </div>
          </div>
        </div>
        <div className="hksa-page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 offset-md-1">
                <div className="hksa-hero-wrapper">
                  <div className="container-fluid">
                    <div className="row d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
                      <div className="col-md-8">
                        <div className="hksa-hero-body">
                          <h1>
                            ما يحدث في مواقع التواصل الاجتماعي
                            <br></br>
                            في منصة واحدة
                          </h1>
                        </div>
                      </div>
                      <div className="col-md-4 text-start">
                        <img src={HeroImg} alt="hero" />
                      </div>
                    </div>
                  </div>
                  <div className="hksa-hero-serach">
                    <div className="hksa-hero-routes-btn">
                      <Nav variant="pills" className="hksa-search-nav">
                        <Nav.Item>
                          <Nav.Link eventKey={t("news")}>{t("news")}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey={t("events")}>
                            {t("events")}
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey={t("surveys")}>
                            {t("surveys")}
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>
                  </div>
                </div>
                <Tab.Content>
                  <Tab.Pane eventKey={t("news")}>
                    {posts.length > 0 ? (
                      <NewsMasonrySearch
                        data={posts}
                        links={postLinks}
                        meta={postMeta}
                        currentPage={currentPost}
                        type="search"
                      />
                    ) : (
                      <NotFound />
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey={t("events")}>
                    {events.length > 0 ? (
                      <EventsSearch data={events} />
                    ) : (
                      <NotFound />
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey={t("surveys")}>
                    {surveys.length > 0 ? (
                      <PollSearch data={surveys} />
                    ) : (
                      <NotFound />
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </div>
              <div className="col-md-3">
                <SideBar />
              </div>
            </div>
          </div>
        </div>
      </Tab.Container>
      <div className="container-fluid">
        <div className="row">
          <NewsLater />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Search;
