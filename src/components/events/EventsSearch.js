import React from "react";
import EventsItem from "./EventsItem";
import "./EventsItemStyle.scss";

const EventsSearch = ({data}) => {
  return (
    <div className="hksa-events-wrapper">
      <EventsItem events={data} />
    </div>
  );
};

export default EventsSearch;
