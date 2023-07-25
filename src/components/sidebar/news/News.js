import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import { ApiService } from "../../../services/data.service";

const News = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    ApiService.pinnedPosts()
    .then( response => {
      setPosts(response.data);
    })
    .catch( err => {
        console.log(err)
    })
  }, []);

  return (
    <div className="hksa-news-wrapper">
      <ul>
        {(posts.length > 0) && posts.slice(0, 3).map((item, index) =>(
          <NewsItem key={index} post={item} />
        ))}
      </ul>
    </div>
  );
};

export default News;
