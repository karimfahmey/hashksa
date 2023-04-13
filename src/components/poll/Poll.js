import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PollItem from "./PollItem";
import { ApiService } from "../../services/data.service";

const Poll = () => {
  const [t] = useTranslation();

  const [poll, setPoll] = useState([]);

  useEffect(() => {
    ApiService.poll()
      .then((response) => {
        setPoll(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="hksa-poll-wrapper">
      <h2 className="hksa-poll-title">{t("surveys")}</h2>
      <ul>
        {poll.length > 0 &&
          poll.map((item, index) => <PollItem key={index} poll={item} />)}
      </ul>
    </div>
  );
};

export default Poll;
