import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ApiService } from '../../../services/data.service';
import './googleTrends.scss';


const GoogleTrends = () => {
    const [trends, setTrends] = useState([]);

    useEffect(() => {
    ApiService.googleGetTrends()
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
                    <Link className='hksa-twitter-trends-item-link' to={`https://www.google.com/search?q=${item.title}`} target="_blank">
                        <div className='hksa-twitter-trends-item-text'>
                            <span className='hksa-twitter-trends-item-hashtag'>{'#'}</span>
                            <h4>
                                {item.title}
                                {item.traffic && <span>{item.traffic}  عملية بحث</span>}
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

export default GoogleTrends