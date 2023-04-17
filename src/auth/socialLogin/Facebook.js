import { Fragment, useState } from "react";
import FacebookLogin from "react-facebook-login";
import { toast } from "react-toastify";
import { ApiService } from "../../services/data.service";
import { persistMyInfo } from "../../services/persistence";

import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";

const Facebook = () => {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFacebookLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        // fetch facebook graph api to get user actual profile picture
        fetch(
          `https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`
        )
          .then((response) => response.blob())
          .then((blob) => {
            setProfilePicture(URL.createObjectURL(blob));
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const responseFacebook = (response) => {
    ApiService.provider({
      name: response.name,
      provider_name: "facebook",
      provider_id: response.id,
      email: response.email,
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
  };

  return (
    <Fragment>
      {user ? (
        <>
          <button className="btn btn-secondary btn-md" onClick={handleLogout}>
            LOGOUT
          </button>
          <h3>Welcome {user.displayName}</h3>
          <p>{user.email}</p>
          <div className="photo">
            <img src={profilePicture} alt="dp" referrerPolicy="no-referrer" />
          </div>
        </>
      ) : (
        <span>
          <button
            className="btn btn-primary btn-md my-facebook-button-class"
            onClick={handleFacebookLogin}
          >
            <i className="icon-fb"></i>
            التسجيل عبر Facebook
          </button>
        </span>
      )}
    </Fragment>
  );
};

export default Facebook;
