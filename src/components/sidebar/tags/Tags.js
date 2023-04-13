import React, { useEffect } from 'react'
import { ApiService } from '../../../services/data.service';
import './Tags.scss';

const Tags = () => {

    const [tags, setTags] = React.useState([])

    useEffect(() => {
        ApiService.getTags()
        .then( response => {
            setTags(response.data);
        })
        .catch( err => {
            console.log(err)
        })
    }, []);

  return (
    <ul className="hksa-tags-list">
        {tags && tags.slice(0, 10).map((item, index) =>(
            <li id={item.id} key={index}>
                <p>{item.name}</p>
            </li>
        ))}
    </ul>
  )
}

export default Tags