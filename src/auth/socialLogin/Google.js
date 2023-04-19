import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { ApiService } from "../../services/data.service";
import { persistMyInfo } from "../../services/persistence";
import googleIcon from "../../assets/img/icons/google.svg";
import { auth, googleProvider } from "../../firebaseConfig";

const Google = () => {
  const handleClick = () => {
    signInWithPopup(auth, googleProvider).then((data) => {
      console.log(JSON.stringify(data));
      ApiService.provider({
        name: data.user.displayName,
        provider_name: "google",
        provider_id: data.user.uid,
        email: data.user.email,
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

  return (
    <div className="hksa-google-login">
      <button onClick={handleClick}>
        <img src={googleIcon} alt="Google Login" />
        التسجيل عبر Google
      </button>
      {/* <GoogleLogin
        // theme="outline"
        // size="large"
        // text="signin"
        // shape="pill"
        // width="100%"
        clientId="841717470500-1n28e7cnn827dhrn72t2vthjp46qq2q2.apps.googleusercontent.com"
        logo_alignment="left"
        onSuccess={(response) => {
          console.log(response)
        }}
        // onSuccess={credentialResponse => {
        //   var response = jwt_decode(credentialResponse.credential);
        //   console.log(response);
        //   ApiService.provider({
        //     name: response.name,
        //     provider_name: 'google',
        //     provider_id: response.exp,
        //     email: response.email,
        //   })
        //     .then((response) => {
        //       if (response.status === false) {
        //         toast.error(response.message, {
        //           position: "top-center",
        //           autoClose: 3000,
        //           hideProgressBar: false,
        //           closeOnClick: true,
        //           pauseOnHover: true,
        //           draggable: false,
        //           progress: undefined,
        //           theme: "colored",
        //         });
        //       } else {
        //         toast.success(response.message, {
        //           position: "top-center",
        //           autoClose: 3000,
        //           hideProgressBar: false,
        //           closeOnClick: true,
        //           pauseOnHover: true,
        //           draggable: false,
        //           progress: undefined,
        //           theme: "colored",
        //         });
        //         persistMyInfo(response.data);
        //         setTimeout(() => {
        //           window.location.reload(false);
        //         }, 500);
        //       }
        //     })
        //     .catch((err) => {
        //       toast(err);
        //       console.log(err);
        //     });

        // }}
        onError={() => {
          console.log('Login Failed');
        }}
        render={renderProps => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}><img src={googleIcon} alt="Google Login" />التسجيل عبر Google</button>
        )}
        // size={'large'}
        // text={'signin_with'}
        // shape={'pill'}
        // logo_alignment={'left'}
        // width="100%"
      /> */}
    </div>
  );
};

export default Google;
