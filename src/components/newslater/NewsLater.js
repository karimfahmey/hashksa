import React from "react";
import "./NewsLater.scss";

const NewsLater = () => {
  return (
    <div className="col-12">
      <div className="news-later">
          <div className="row d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
            <div className="col-md-8">
              <div className="hksa-hero-body">
                <h1>انضم الينا</h1>
                <p>
                اشترك في قائمتنا البريدية للتصلك آخر الأخبار مباشرة على بريدك الإلكتروني.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="hksa-news-later-form">
                <form>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="البريد الإلكتروني"
                    />
                    <span className="input-group-btn">
                      <button className="btn" type="submit">
                        {" "}
                        اشتراك
                      </button>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default NewsLater;
