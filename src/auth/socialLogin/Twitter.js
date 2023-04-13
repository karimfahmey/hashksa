import React from "react";
import TwitterLogin from "react-twitter-login";
import { toast } from "react-toastify";
import { ApiService } from "../../services/data.service";
import { persistMyInfo } from "../../services/persistence";

const Twitter = () => {
  const responseTwitter = (response) => {
    console.log(response);
    // ApiService.provider({
    //   name: response.name,
    //   provider_name: "facebook",
    //   provider_id: response.id,
    //   email: response.email,
    // })
    //   .then((response) => {
    //     if (response.status === false) {
    //       toast.error(response.message, {
    //         position: "top-center",
    //         autoClose: 3000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: false,
    //         progress: undefined,
    //         theme: "colored",
    //       });
    //     } else {
    //       toast.success(response.message, {
    //         position: "top-center",
    //         autoClose: 3000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: false,
    //         progress: undefined,
    //         theme: "colored",
    //       });
    //       persistMyInfo(response.data);
    //       setTimeout(() => {
    //         window.location.reload(false);
    //       }, 500);
    //     }
    //   })
    //   .catch((err) => {
    //     toast(err);
    //     console.log(err);
    //   });
  };

  const TwitterBtn = () => {
    return (
      <button className="twitter-btn">
        <i className="fa fa-twitter" aria-hidden="true"></i>
        التسجيل عبر Twitter
      </button>
    );
  };

  return (
    <TwitterLogin
      authCallback={responseTwitter}
      consumerKey={"SlNiTHoyaVh3dF8tNUo4WFhuYTI6MTpjaQ"}
      consumerSecret={"AGxNelXHLBdxljkaGEHNw6JAxNA4W7OF16A1G74yR49nzfO6DW"}
      children={<TwitterBtn />}
      // appId="3124290001202236"
      // fields="name,email,picture"
      // autoLogAppEvents="true"
      // callback={responseTwitter}
      // cssClass="my-facebook-button-class"
      // icon="icon-fb"
      // textButton="التسجيل عبر Facebook"
    />
  );
};

export default Twitter;
