import React from "react";
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import "./Poll.scss";
import mainCat from "../../assets/img/icons/main-cat.svg";
import PollProgress from "./PollProgress/PollProgress";
import placeholder from "../../assets/img/hashksa-placeholder.jpg";
import ShareAction from "../../actions/ShareAction";


const PollItem = ({ poll }) => {

  return (
    <li className="hksa-poll-item">
      <div className="hksa-poll-item--media">
        {poll.type === "single_image" && 
          <img src={poll.image ? poll.image : placeholder} alt={poll.title} />
        }
        {poll.type === "video" && (
          <video width="100%" height="240" controls>
            <source src={poll.video} type="video/mp4" />
            <source src={poll.video} type="video/ogg" />
          </video>
        )}
        {poll.type === "four_image" && 
        
        <Splide aria-label={poll.title}   options={ {
          autoplay: true,
          rewind: true,
          width : 350,
          gap   : '1rem',
          type   : 'loop',
          perPage: 1,
          direction: 'rtl',
        } }>
          {poll.images && poll.images.map((item, index) => (
            <SplideSlide key={index}>
              <img className="slide-img" src={item} alt={poll.title} />
            </SplideSlide>
          ))}
        </Splide>
        }
        {poll.category[0] &&
        <span className="hksa-news-item--cat">
          <img src={poll.category && poll.category[0]?.icon} alt="category" />
          <span>{poll.category && poll.category[0]?.name}</span>
        </span>
        }
        {/* {poll.category.map((cat, index) => (
          <span key={index} className="hksa-news-item--cat">
            <img src={mainCat} alt="likes" />
            <span>{cat.name}</span>
          </span>
        ))} */}
      </div>
      <div className="hksa-poll-item--content">
        <h3 className="hksa-poll-title">{poll.title}</h3>
        <p className="hksa-poll-description">{poll.subDes}</p>
        <div className="hksa-poll-progress">
          <PollProgress data={poll} />
          {/* {poll.items.map((item, index) => (
          ))} */}
        </div>
        {/* <ShareAction title="مشاركة الخبر" post={poll} type="news" /> */}
      </div>
    </li>
  );
};

export default PollItem;
