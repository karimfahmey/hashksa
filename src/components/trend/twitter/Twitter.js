import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ApiService } from '../../../services/data.service';
import './Twitter.scss';

const Twitter = () => {
    const [trends, setTrends] = useState([]);

    useEffect(() => {
    ApiService.twitterGetTrends()
    .then( response => {
        setTrends(response.data);
    })
    .catch( err => {
        console.log(err)
    })
    }, []);


  return (
    <div className='hksa-twitter-trends-wrapper'>
        {trends && trends.map((item, index) =>(
            item && (
            <div className='hksa-twitter-trends-item' key={index}>
                <Link className='hksa-twitter-trends-item-link' to={`https://twitter.com/search?q=${item.query}`} target="_blank">
                    <div className='hksa-twitter-trends-item-text'>
                        <span className='hksa-twitter-trends-item-hashtag'>{'#'}</span>
                        <h4>
                            {item.name && item.name}
                            {item.tweet_volume && <span>{item.tweet_volume} تغريدة</span>}
                        </h4>
                    </div>
                    <div className='hksa-twitter-trends-item-numb'>
                        <span>{index + 1}</span>
                    </div>
                </Link>
            </div>
            )
        ))}
    </div>
  )
}

export default Twitter