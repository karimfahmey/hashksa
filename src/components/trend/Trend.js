import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './TrendStyle.scss';
import Twitter from './twitter/Twitter';
import Youtube from './youtube/Youtube';
import GoogleNews from './googleNews/googleNews';
import GoogleTrends from './googleTrends/googleTrends';
import googleIcon from "../../assets/img/icons/google-trends.png";
import googleNewsIcon from "../../assets/img/icons/google-news.png";

const Trend = () => {

  return (
    <div className='trend-bllocks-wrapper'>
        <div className='trend-tabs-wrapper'>
        <Tabs
            defaultActiveKey="twitter"
            id="fill-tab-example"
            className="mb-3"
            fill
            >
            <Tab eventKey="twitter" title={<span>Twitter <i className="icon-tw" /> </span>}>
                <Twitter />
            </Tab>
            <Tab eventKey="google" title={<span>Google Trends <img src={googleIcon} alt="GoogleIcon" /> </span>}>
                <GoogleTrends />
            </Tab>
            <Tab eventKey="youtube" title={<span>YouTube <i className="icon-youtube" /> </span>}>
                <Youtube />
            </Tab>
            <Tab eventKey="google-news" title={<span>Google News <img src={googleNewsIcon} alt="GoogleNewsIcon" /> </span>}>
                <GoogleNews />
            </Tab>
        </Tabs>
        </div>
        <div className='trend-content'>
        </div>
    </div>
  )
}

export default Trend