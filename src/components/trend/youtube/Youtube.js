import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ApiService } from "../../../services/data.service";
import "./Youtube.scss";

const Youtube = () => {
  //   const [show, setShow] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalInfo, setModalInfo] = useState(null);

  const handleClose = () => setModalIsOpen(false);
  const handleShow = (item) => {
    setModalIsOpen(true);
    setModalData(item.player);
    setModalInfo(item);
  };

  const [trends, setTrends] = useState([]);

  useEffect(() => {
    ApiService.youtubeGetTrends()
      .then((response) => {
        setTrends(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="hksa-youtube-trend-wrapper">
      <div className="hksa-youtube-trend-container">
        <div className="hksa-youtube-trend-lists">
          {trends &&
            trends.map(
              (item, index) =>
                item && (
                  <div key={index} className="hksa-youtube-trend-list">
                    <div className="hksa-youtube-trend-list-header">
                      <img src={item.image} alt="" />
                      <div
                        className="hksa-play"
                        onClick={() => {
                          handleShow(item);
                        }}
                      >
                        <i className="icon-play"></i>
                      </div>
                    </div>
                    <div className="hksa-youtube-trend-list-content">
                      <div className="hksa-youtube-trend-list-content-title">
                        <h4>{item.title}</h4>
                      </div>
                      <div className="hksa-youtube-trend-list-info">
                        <div className="hksa-youtube-trend-list-info-names">
                          <img src={item.image} alt="" />
                          <div className="hksa-list-info-names">
                            <h5>{item.channelTitle}</h5>
                            <span>{item.statistics.viewCount} مشاهدة</span>
                          </div>
                        </div>
                        <div className="hksa-youtube-trend-list-date">
                          {item.create_at_day_number} {item.created_date_month}{" "}
                          . ال{item.created_date_day}
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
          <Modal className="hksa-youtube-modal" show={modalIsOpen} size="lg" onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <div dangerouslySetInnerHTML={{ __html: modalData }}></div>
              {modalInfo && 
              <div className="hksa-youtube-trend-list-content">
                <div className="hksa-youtube-trend-list-content-title">
                  <h4>{modalInfo.title}</h4>
                </div>
                <div className="hksa-youtube-trend-list-info">
                  <div className="hksa-youtube-trend-list-info-names">
                    <img src={modalInfo.image} alt="" />
                    <div className="hksa-list-info-names">
                      <h5>{modalInfo.channelTitle}</h5>
                      <span>{modalInfo.statistics.viewCount} مشاهدة</span>
                    </div>
                  </div>
                  <div className="hksa-youtube-trend-list-date">
                    {modalInfo.create_at_day_number}{" "}
                    {modalInfo.created_date_month} . ال
                    {modalInfo.created_date_day}
                  </div>
                </div>
              </div>
              }
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Youtube;
