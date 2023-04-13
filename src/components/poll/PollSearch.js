import React from "react";
import { useTranslation } from "react-i18next";
import PollItem from "./PollItem";

const PollSearch = ({data}) => {
  const [t] = useTranslation();
  return (
    <div className="hksa-poll-wrapper">
      <ul>
        {data.length > 0 &&
          data.map((item, index) => <PollItem key={index} poll={item} />)}
      </ul>
    </div>
  );
};

export default PollSearch;
