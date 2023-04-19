import React from "react";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { ApiService } from "../../services/data.service";
import { persistMyInfo } from "../../services/persistence";


import { auth, twitterProvider } from "../../firebaseConfig";

const Twitter = () => {
  const handleClick = () => {
    signInWithPopup(auth, twitterProvider).then((data) => {
      console.log(data);
      ApiService.provider({
        name: data.user.providerData[0].displayName,
        provider_name: "twitter",
        provider_id: data.user.providerData[0].uid,
        email: data.user.providerData[0].email,
      })
        .then((response) => {
          if (response.status === false) {
            toast.error(response.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "colored",
            });
          } else {
            toast.success(response.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "colored",
            });
            persistMyInfo(response.data);
            setTimeout(() => {
              window.location.reload(false);
            }, 500);
          }
        })
        .catch((err) => {
          toast(err);
          console.log(err);
        });
    });
  };

  const TwitterBtn = () => {
    return (
      <div className="hksa-twitter-login">
        <button className="twitter-btn" onClick={handleClick}>
          <i className="icon-tw"></i>
          التسجيل عبر Twitter
        </button>
      </div>
    );
  };

  return (
    <TwitterBtn />
  );
};

export default Twitter;
