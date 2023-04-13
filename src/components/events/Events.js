import React, { useEffect, useState } from "react";
import * as bootstrap from "bootstrap";
import Select from "react-select";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import EventsItem from "./EventsItem";
import { ApiService } from "../../services/data.service";
import arLocale from "@fullcalendar/core/locales/ar";
import "./EventsItemStyle.scss";
import { Link } from "react-router-dom";
import { store } from "../../reducers";
import { Formik } from "formik";
import NotFound from "../../pages/search/NotFound";

const Events = () => {
  const [date, setDate] = useState([]);
  const [filterList, setfilterList] = useState(false);
  const [dataInfo, setDatainfo] = useState([]);
  const [categorys, setCategorys] = useState([]);

  const auth = store.getState().authStoreState.token;

  useEffect(() => {
    ApiService.getEventsCalender()
      .then((response) => {
        setDate(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    ApiService.getEvents()
      .then((response) => {
        setDatainfo(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    ApiService.getEventCategoryWeb()
      .then((response) => {
        setCategorys(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFilterList = () => {
    setfilterList(!filterList);
  };

  const renderEventContent = (eventInfo) => {
    return <span className="fc-event-title">{eventInfo.event.title}</span>;
  };

  return (
    <div className="hksa-events-wrapper">
      <div className="hksa-events-header">
        <button onClick={handleFilterList} className="hksa-events-header-btn">
          <i className={filterList ? "icon-calendar" : "icon-list"}></i>
        </button>
        {auth && (
          <Link className="hksa-add-new" to={"/events/add-event/"}>
            <i className="icon-add-event"></i>
            إضافة حدث
          </Link>
        )}
        <div className="hksa-events-filter">
          <Formik
            initialValues={{ category_id: [] }}
            onSubmit={(values, { setSubmitting }) => {
              if(filterList) {
                ApiService.getEvents({
                  category_id: values.category_id,
                })
                .then((response) => {
                  setDatainfo(response.data.data);
                })
                .catch((err) => {
                  console.log(err);
                });
              }

                if(!filterList) {
                  ApiService.getEventsCalender({
                    category_id: values.category_id,
                  })
                  .then((response) => {
                    setDate(response.data.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                }
            }}
          >
            {(formikProps) => (
              <form onSubmit={formikProps.handleSubmit}>
                <div className="input-groups w-100">
                  <div className="input-group me-4 w-100">
                    {/* <label htmlFor="title" className="form-label">
                      التصنيف
                    </label> */}
                    <Select
                      name="category_id"
                      id="category_id"
                      options={categorys}
                      placeholder="التصنيف"
                      className="w-100 select-custom"
                      isMulti
                      onChange={(value) => {
                        let categoryValue = [];
                        value.forEach((element) => {
                          categoryValue.push(element.value);
                        });
                        formikProps.setFieldValue("category_id", categoryValue);
                      }}
                      onBlur={formikProps.handleBlur}
                    />
                    {formikProps.errors.category_id &&
                    formikProps.touched.category_id ? (
                      <div className="input-error">
                        {formikProps.errors.category_id}
                      </div>
                    ) : null}
                  </div>
                  <div className="input-group w-100 align-self-end">
                    <button className="add-submit" type="submit">
                      تصفية
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
      {filterList ? (
        dataInfo.length > 0 ? (
          <EventsItem events={dataInfo} />
        ) : (
          <NotFound />
        )
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale={arLocale}
          headerToolbar={{
            left: "next",
            center: "title",
            right: "prev",
          }}
          themeSystem="Simplex"
          events={date}
          eventDidMount={(info) => {
            return new bootstrap.Popover(info.el, {
              placement: "right",
              trigger: "click hover",
              customClassName: "event-popover",
              content:
                "<div class='events-item-popover'><a href='/events/" +
                info.event.id +
                "'><img src='" +
                info.event.backgroundColor +
                "' alt='" +
                info.event.title +
                "'<div class='events-item-popover-content'> <h5>" +
                info.event.title +
                "</h5><div class='events-item-popover-meta'><span><i class='icon-pin'></i>" +
                info.textColor +
                "</span><span><i class='icon-clock'></i>" +
                info.timeText +
                "</span></div></div></a></div>",
              html: true,
            });
          }}
          eventContent={renderEventContent}
        />
      )}
    </div>
  );
};

export default Events;
