import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tweet } from "react-twitter-widgets";
import "./SinglePost.scss";
import { ApiService } from "../../services/data.service";
import "moment/locale/ar";

const EmbeddedPost = () => {
  const userId = useParams();

  const [post, setPost] = useState([]);

  useEffect(() => {
    ApiService.postsShow({ id: userId.id, session: 'guest' })
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  return (
    <Fragment>
      <div className="single-post-embedded">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="single-post-date--content">
                <div className="single-post-content--block">
                  <div className="single-post-title-block">
                    {post.twitter_embedded && (
                      <Fragment>
                        <Tweet tweetId={post.twitter_embedded}/>
                      </Fragment>
                    )}
                    <div
                      className="single-post-description"
                      dangerouslySetInnerHTML={{
                        __html: post.facebook_embedded,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EmbeddedPost;
