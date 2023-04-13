import React, { Fragment, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { ApiService } from "../../../services/data.service";
import "./PollProgress.scss";

const PollProgress = ({ data }) => {
  const [pollData, setPollData] = useState(data);
  return (
    <Fragment>
      {pollData.items.map((item, index) => (
        <div key={index} className="poll-progress-wrapper">
          {item.choose === true ? (
            <Fragment>
              <div
                className={
                  item.choose ? "poll-progress active" : "poll-progress"
                }
              >
                {item.choose ? <ProgressBar now={item.count} /> : ""}
                <div className="poll-progress-text">
                  <i className="icon-check"></i>
                  <h6>{item.name}</h6>
                </div>
                <span className="percentage-count">
                  {pollData.show_total_count === 0
                    ? "0%"
                    : ((item.count / pollData.show_total_count) * 100).toFixed(0) + "%"}
                </span>
              </div>
              <span className="choose-count">{item.count} اصوات</span>
            </Fragment>
          ) : (
            <Fragment>
              <div
                onClick={() => {
                  ApiService.sendPollItem({
                    id: item.id,
                    servey_id: pollData.id,
                    device: 'web'
                  })
                    .then((response) => {
                      setTimeout(() => {
                        setPollData(response.data);
                      }, 500);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
                className={
                  item.choose ? "poll-progress active" : "poll-progress"
                }
              >
                {item.choose ? <ProgressBar now={item.count} /> : ""}
                <div className="poll-progress-text">
                  <i className="icon-check"></i>
                  <h6>{item.name}</h6>
                </div>
                <span className="percentage-count">
                  {pollData.show_total_count === 0
                    ? "0%"
                    : ((item.count / pollData.show_total_count) * 100).toFixed(0) + "%"}
                </span>
              </div>
              <span className="choose-count">{item.count} اصوات</span>
            </Fragment>
          )}
        </div>
      ))}
    </Fragment>
  );
};

export default PollProgress;
