import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EventsPage from "../pages/events/Events";
import Home from "../pages/home/Home";
import News from "../pages/news/News";
import SinglePost from "../pages/singlepost/SinglePost";
import SingleEvent from "../pages/singleevent/SingleEvent";
import Surveys from "../pages/surveys/Surveys";
import Trends from "../pages/trend/Trends";
import ContactUs from "../pages/contactUs/ContactUs";
import Notfound from '../pages/notFound/Notfound';
import Privacy from '../pages/Privacy/Privacy';
import Search from '../pages/search/Search';
import Terms from '../pages/terms/Terms';
import PrivacyMobile from '../pages/Privacy/PrivacyMobile';
import TermsMobile from '../pages/terms/TermsMobile';

const MainRoute = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="news" element={<News />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="/events/:id" element={<SingleEvent />} />
        <Route path="/news/:id" element={<SinglePost />} />
        <Route path="surveys" element={<Surveys />} />
        <Route path="trend" element={<Trends />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="privacy-and-policy" element={<Privacy />} />
        <Route path="terms-of-use" element={<Terms />} />
        <Route path="privacy-and-policy-mobile" element={<PrivacyMobile />} />
        <Route path="terms-of-use-mobile" element={<TermsMobile />} />
        <Route path="search" element={<Search />} />
        <Route path="bookmark" element={<Notfound />} />
        <Route path="events/bookmark" element={<Notfound />} />
        <Route path="posts/bookmark" element={<Notfound />} />
        <Route path="events/add-event" element={<Notfound />} />
        <Route path="profile" element={<Notfound />} />
        <Route path="not-found" element={<Notfound />} />
    </Routes>
  )
}

export default MainRoute