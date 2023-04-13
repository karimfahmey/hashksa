import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  FacebookShareCount,
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
} from "react-share";
import HelmetMetaData from "../services/HelmetData";
import "./style.scss";

const ShareAction = ({ title, post, type, schema }) => {
  const [openShare, setOpenShare] = useState();
  const shareUrl = `http://hashksa.co/${type}/${post.id}`;

  return (
    <div
      className={`hksa-social-share align-items-end ${schema}`}
      onClick={() => setOpenShare(!openShare)}
    >
      <p className="hksa-social-share-item hksa-share-post justify-content-end">
        <i className="icon-share"></i>
      </p>
      <Modal show={openShare} onHide={openShare}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>{title}</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="hksa_share_container">
            <div className="hksa__some-network">
            {/* <li>
              <a class="large-button facebook" rel="noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank">
              <i class="fab fa-facebook-f"></i>
              <span>Share On Facebook</span>
              </a>
            </li> */}
              <FacebookShareButton 
                url={shareUrl}
                quote={post.title}
                >
                 <FacebookIcon size={36} />
              </FacebookShareButton>
{/* 
              <FacebookShareButton
                url={shareUrl}
                quote={post.title}
                className="hksa__some-network__share-button"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <div>
                <FacebookShareCount
                  url={shareUrl}
                  className="hksa__some-network__share-count"
                >
                  {(count) => count}
                </FacebookShareCount>
              </div> */}
            </div>

            <div className="hksa__some-network">
              <FacebookMessengerShareButton
                url={shareUrl}
                appId="3124290001202236"
                className="hksa__some-network__share-button"
              >
                <FacebookMessengerIcon size={32} round />
              </FacebookMessengerShareButton>
            </div>

            <div className="hksa__some-network">
              <TwitterShareButton
                url={shareUrl}
                title={post.name}
                className="hksa__some-network__share-button"
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>

              <div className="hksa__some-network__share-count">&nbsp;</div>
            </div>

            <div className="hksa__some-network">
              <TelegramShareButton
                url={shareUrl}
                title={post.name}
                className="hksa__some-network__share-button"
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>

              <div className="hksa__some-network__share-count">&nbsp;</div>
            </div>

            <div className="hksa__some-network">
              <WhatsappShareButton
                url={shareUrl}
                title={post.name}
                separator=":: "
                className="hksa__some-network__share-button"
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>

              <div className="hksa__some-network__share-count">&nbsp;</div>
            </div>

            <div className="hksa__some-network">
              <LinkedinShareButton
                url={shareUrl}
                className="hksa__some-network__share-button"
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ShareAction;
