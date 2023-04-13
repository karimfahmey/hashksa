import React from "react";
import { Link } from "react-router-dom";
import "./EventsItemStyle.scss";
import placeholder from "../../assets/img/hashksa-placeholder.jpg";
import Bookmark from "../../actions/Bookmark";
import ShareAction from "../../actions/ShareAction";

const EventsItem = ({ events }) => {
  return (
    <ul>
      {events.map((event, index) => (
        <li id={event.id} key={index} className="hksa-events-item">
          <div className="hksa-events-item__date">
            <span className="hksa-events-item--date">
              <span>{event.created_at_month && event.created_at_month}</span>
              <span>{event.create_at_day_number && event.create_at_day_number}</span>
            </span>
          </div>
          <div className="hksa-events-item__content">
            <div className="hksa-events-item--content">
              <div className="hksa-events-item--title">
                <Link to={`/events/${event.id}`} state={{ event: event }}>
                  <h3 className="hksa-events-title" dangerouslySetInnerHTML={{ __html: event.title }}></h3>
                </Link>
                <p className="hksa-events-description" dangerouslySetInnerHTML={{ __html: event.shortDescription.substring(0, 180) }}></p>
              </div>
              <div className="hksa-events-meta">
                <p className="hksa-events-location">
                  <i className="fa-sharp fa-solid fa-location-dot"></i>
                  {event.location && event.location.slice(0,30)}
                </p>
                <p className="hksa-events-time">
                  <i className="fa-solid fa-clock"></i>
                  {event.created_time && event.created_time} {event.time_am_or_pm && event.time_am_or_pm}
                </p>
              </div>
              <Bookmark id={event.id} data={event} type="events" />
            </div>
            <div className="hksa-events-item--media">
              <Link to={`/events/${event.id}`} state={{ event: event }}>
                {event.main_photo ? (
                  <img src={event.main_photo} alt={event.title} />
                ) : (
                  <img src={placeholder} alt={event.title} />
                )}
              </Link>
              <ShareAction title="مشاركة الحدث" post={event} type="events" schema="light" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EventsItem;
