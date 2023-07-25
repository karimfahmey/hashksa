import React from "react";
import { Route, Routes } from "react-router-dom";
import AddEvent from "../pages/events/AddEvent/AddEvent";
import EventsPage from "../pages/events/Events";
import Home from "../pages/home/Home";
import News from "../pages/news/News";
import Profile from "../pages/profile/Profile";
import SinglePost from "../pages/singlepost/SinglePost";
import SingleEvent from "../pages/singleevent/SingleEvent";
import Surveys from "../pages/surveys/Surveys";
import Trends from "../pages/trend/Trends";
import ContactUs from "../pages/contactUs/ContactUs";
import Privacy from "../pages/Privacy/Privacy";
import Bookmark from "../pages/bookmark/Bookmark";
import BookmarkEvents from "../pages/bookmark/BookmarkEvents";
import BookmarkPosts from "../pages/bookmark/BookmarkPosts";
import Search from "../pages/search/Search";
import Terms from "../pages/terms/Terms";
import PrivacyMobile from "../pages/Privacy/PrivacyMobile";
import TermsMobile from "../pages/terms/TermsMobile";
import Notfound from "../pages/search/NotFound";
import EmbeddedPost from "../pages/singlepost/EmbeddedPost";

const AuthRoute = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="news" element={<News />} />
      <Route path="events" element={<EventsPage />} />
      <Route path="/events/:id" element={<SingleEvent />} />
      <Route path="/news/:id" element={<SinglePost />} />
      <Route path="/news/:id/embedded" element={<EmbeddedPost />} />
      <Route path="surveys" element={<Surveys />} />
      <Route path="trend" element={<Trends />} />
      <Route path="events/add-event" element={<AddEvent />} />
      <Route path="profile" element={<Profile />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="privacy-and-policy" element={<Privacy />} />
      <Route path="privacy-and-policy-mobile" element={<PrivacyMobile />} />
      <Route path="terms-of-use-mobile" element={<TermsMobile />} />
      <Route path="terms-of-use" element={<Terms />} />
      <Route path="bookmark" element={<Bookmark />} />
      <Route path="events/bookmark" element={<BookmarkEvents />} />
      <Route path="posts/bookmark" element={<BookmarkPosts />} />
      <Route path="search" element={<Search />} />
      <Route path="not-found" element={<Notfound />} />
    </Routes>
  );
};

export default AuthRoute;
