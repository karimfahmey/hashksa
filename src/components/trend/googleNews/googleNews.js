import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiService } from "../../../services/data.service";
import placeholder from "../../../assets/img/hashksa-placeholder.jpg";
import "./googleNews.scss";

const GoogleNews = () => {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    ApiService.googleNewsGetTrends()
      .then((response) => {
        setTrends(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="hksa-google-news-wrapper">
      <div className="hksa-news-wrapper">
        <ul>
          {trends.map(
            (item, index) =>
              item && (
                <li key={index} className="hksa-news-item">
                  <div className="hksa-news-item-header">
                    <div className="hksa-news-item--media">
                      <Link
                        className="hksa-twitter-trends-item-link"
                        to={item.url}
                        target="_blank"
                      >
                        {item.image ? (
                          <img src={item.image} alt={item.title} />
                        ) : (
                          <img src={placeholder} alt={item.title} />
                        )}
                      </Link>
                    </div>
                    <div className="hksa-news-item--content">
                      <Link
                        className="hksa-twitter-trends-item-link"
                        to={item.url}
                        target="_blank"
                      >
                        <h3 className="hksa-news-title" dangerouslySetInnerHTML={{ __html: item.title }}></h3>
                      </Link>
                      <div className="hksa-news-block-meta">
                        <span className="hksa-news-item--date">
                          <span>{item.source}</span>
                        </span>
                        <span>
                          {item.create_at_day_number} {item.created_date_month}
                          <span>
                            {item.created_time} {item.time_am_or_pm}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="hksa-news-item-footer">
                    <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                  </div>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default GoogleNews;
