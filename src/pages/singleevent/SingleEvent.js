import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";

import Global from "../../assets/img/global.svg";
import Insta from "../../assets/img/ins-fo.svg";
import Pin from "../../assets/img/pin.svg";
import placeholder from "../../assets/img/hashksa-placeholder.jpg";
import { ApiService } from "../../services/data.service";
import HelmetMetaData from "../../services/HelmetData";
import Bookmark from "../../actions/Bookmark";
import "./SingleEvent.scss";

const libraries = ["places"];

const SingleEvent = () => {
  const userId = useParams();

  const [event, setEvent] = useState([]);

  useEffect(() => {
    ApiService.getEventByID({ event_id: userId.id })
      .then((response) => {
        setEvent(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const center = { lat: event.lat, lng: event.lng };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD5onmfjofDOCSLAszkgGv7o7haIlseHtw",
    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  const mapContainerStyle = {
    height: "40vh",
    width: "50%",
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  };

  return (
    <React.Fragment>
      <HelmetMetaData
        title={`هاشتاق السعودية - ${event.title}`}
        description={event.shortDescription}
        image={event.main_photo}
        quote={event.shortDescription}
      />
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
                  <span>الاحداث</span>
                </li>
                <li>
                  <i className="fa fa-angle-left"></i>
                  <span className="active">{event.title}</span>
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
              <div className="single-event-data">
                <div className="single-event-date--content">
                  <div className="single-event-content--block">
                    <div className="single-event-title-block">
                      <span className="hksa-events-item--date">
                        <span>{event.created_at_month}</span>
                        <span>{event.create_at_day_number}</span>
                      </span>
                      <h1 className="hksa-events-title">{event.title}</h1>
                    </div>
                    <p
                      className="single-event-description"
                      dangerouslySetInnerHTML={{ __html: event.description }}
                    ></p>
                  </div>
                  <div className="hksa-events-meta">
                    <p className="hksa-events-location">
                      <i className="fa-sharp fa-solid fa-location-dot"></i>
                      {event.location}
                    </p>
                    <p className="hksa-events-time">
                      <i className="fa-solid fa-clock"></i>
                      {event.created_time} {event.time_am_or_pm}
                    </p>
                  </div>
                </div>
                {event.main_photo ? (
                  <img
                    className="event-image"
                    src={event.main_photo}
                    alt={event.title}
                  />
                ) : (
                  <img
                    className="event-image"
                    src={placeholder}
                    alt={event.title}
                  />
                )}
                <Bookmark id={event.id} data={event} type="event" />

                {/* <div
                  className={
                    bookMark || event.bookmark
                      ? "hksa-post-bookmark active"
                      : "hksa-post-bookmark"
                  }
                  onClick={handleBookmark}
                >
                  <i className="icon-bookmark"></i>
                </div> */}
              </div>
              <div className="single-event-data">
                <GoogleMap
                  id="map"
                  mapContainerStyle={mapContainerStyle}
                  zoom={14}
                  center={center}
                  options={options}
                  onLoad={onMapLoad}
                >
                  <MarkerF
                    key={center}
                    position={center}
                    icon={{
                      url: { Pin },
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(15, 15),
                      scaledSize: new window.google.maps.Size(30, 30),
                    }}
                  />
                </GoogleMap>

                <div className="single-event-data--info">
                  <header className="single-event-data--info-header">
                    <h2 className="single-event-info--title">العنوان</h2>
                    <p className="single-event-info--description">
                      {event.location}
                    </p>
                  </header>
                  <footer className="single-event-links">
                    {event.website && (
                      <div className="single-event-link">
                        <img src={Global} alt="website" />
                        <p>{event.website}</p>
                      </div>
                    )}
                    <div className="single-event-link-social">
                      {event.instagram && (
                        <div className="single-event-link">
                          <Link to={event.instagram}>
                            <img src={Insta} alt="instagram" />
                            <p>حساب انستقرام</p>
                          </Link>
                        </div>
                      )}
                      {event.facebook && (
                        <div className="single-event-link">
                          <Link to={event.facebook}>
                            <img src={Insta} alt="instagram" />
                            <p>حساب انستقرام</p>
                          </Link>
                        </div>
                      )}
                    </div>
                  </footer>
                </div>
              </div>
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

export default SingleEvent;
