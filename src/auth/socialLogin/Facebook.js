import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { toast } from 'react-toastify';
import { ApiService } from '../../services/data.service';
import { persistMyInfo } from '../../services/persistence';

const Facebook = () => {

  const responseFacebook = (response) => {
    ApiService.provider({
      name: response.name,
      provider_name: 'facebook',
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
  }

  return (
    <FacebookLogin
        appId="3124290001202236"
        fields="name,email,picture"
        autoLogAppEvents=  'true'
        callback={responseFacebook}
        cssClass="my-facebook-button-class"
        icon="icon-fb"
        textButton="التسجيل عبر Facebook"
    />
  )
}

export default Facebook