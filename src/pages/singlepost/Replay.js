import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import { useFormik } from "formik";
import User from "../../assets/img/user-placeholder.svg";
import { ApiService } from "../../services/data.service";

const Replay = (item) => {
  const userId = useParams();
  const [comment, setComment] = useState([]);

  const replayForm = useFormik({
    initialValues: {
      replay: "",
      comment_id: item.item.id,
    },
    onSubmit: async (values) => {
      ApiService.postReplay({
        post_id: userId.id,
        comment_id: values.comment_id,
        comment: values.replay,
      })
        .then((response) => {
          setComment(response.data.comment);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div className="hksa-comments-replay--wrapper">
      <ul className="hksa-comments-replay">
        {item.item.replay &&
          item.item.replay.map((item, index) => (
            <li key={index} id={item.id}>
              <div className="single-post-comment-user">
                <img
                  src={item.user.photo ? item.user.photo : User}
                  alt={item.user.name}
                />
              </div>
              <div className="single-post-comment">
                <div className="single-post-comment--user-name">
                  {item.user.name}
                  <span className="hksa-dots">.</span>
                  <span className="single-post-comment--date">
                    <Moment locale="ar" fromNow>
                      {item.user.created_at}
                    </Moment>
                  </span>
                </div>
                <div className="single-post-comment-text">{item.comment}</div>
                <div className="single-post-comment-replay"></div>
              </div>
            </li>
        ))}
        {comment && comment.user && (
          <li id={comment.name}>
            <div className="single-post-comment--block">
              <div className="single-post-comment-user">
                <img
                  src={comment.user.photo ? comment.user.photo : User}
                  alt={comment.user.name}
                />
              </div>
              <div className="single-post-comment">
                <div className="single-post-comment--user-name">
                  {comment.user.name}
                  <span className="hksa-dots">.</span>
                  <span className="single-post-comment--date">
                    <Moment locale="ar" fromNow>
                      {comment.user.created_at}
                    </Moment>
                  </span>
                </div>
                <div className="single-post-comment-text">
                  {comment.comment}
                </div>
                <div className="single-post-comment-replay"></div>
              </div>
              <div className="single-post-comment-info"></div>
            </div>
          </li>
        )}
      </ul>
      <div className="single-post-data--comments">
        <div className="hksa-comment-action">
          <div className="hksa-comment-action--form">
            <form onSubmit={replayForm.handleSubmit}>
              <div className="form-group">
                <img src={User} alt="replay" />
                <input
                  hidden
                  type="text"
                  id="comment_id"
                  name="comment_id"
                  defaultValue={() =>
                    replayForm.setFieldValue("comment_id", item.id)
                  }
                  // defaultValue={item.id}
                  // onChange={replayForm.setFieldValue('comment_id', item.id)}
                />
                <input
                  placeholder="اكتب تعليقأ هنا..."
                  type="text"
                  id="replay"
                  name="replay"
                  onChange={replayForm.handleChange}
                  value={replayForm.values.replay}
                />
              </div>
              <div className="form-action">
                <button type="submit">
                  <i className="icon-send"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Replay;
