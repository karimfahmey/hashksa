import { withFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ApiService } from "../../services/data.service";
import "./Profile.scss";
import User from "../../assets/img/user-placeholder.svg";
import ChangePassword from "../../auth/changePassword/ChangePassword";

const ProfileEdit = () => {
  const [info, setInfo] = useState([]);
  const [uploadFile, setUploadFile] = useState();
  const [previewImage, setPreviewImage] = useState(undefined);
  const [extensions, setExtensions] = useState();
  const [submit, setSubmit] = useState(false);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  useEffect(() => {
    ApiService.getProfile()
      .then((response) => {
        setInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const MyInnerForm = (props) => {
    const {
      values,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
    } = props;
    return (
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          <div className="hksa-edit-photo">
            {previewImage ? (
                <img src={previewImage ? previewImage : User} alt={info.name} />
            ) : (
                <img
                src={info.user && info.user.photo ? info.user.photo : User}
                alt={info.name}
              />
            )}

            {/*  */}
            <div className="hksa-action">
              <h5>صورة البروفايل</h5>
              <span>نوصي بصورة لا تقل عن 400 × 400 🙌</span>
              <label className="label">
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  accept="image/*"
                  onChange={(e) => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                      if (fileReader.readyState === 2) {
                        setFieldValue("photo", fileReader.result);
                        setUploadFile(fileReader.result);
                      }
                    };
                    fileReader.readAsDataURL(e.target.files[0]);

                    setExtensions(e.currentTarget.files[0].type);
                    setPreviewImage(
                      e.target.files[0]
                        ? URL.createObjectURL(e.target.files[0])
                        : ""
                    );
                  }}
                  className="default-file-input"
                />
                <div className="hksa-upload-photo">
                  رفع
                  <i className="icon-add-photo"></i>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="input-group mb-4 w-100">
              <label htmlFor="name" className="form-label">
                الاسم بالكامل
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="الاسم بالكامل"
                className="form-control inp_text"
              />
              <i className="icon-user"></i>
            </div>
            <div className="input-group mb-4 w-100">
              <label htmlFor="email" className="form-label">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="البريد الإلكتروني"
                className="form-control inp_text"
              />
              <i className="icon-email"></i>
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-group mb-4 w-100">
              <label htmlFor="phone" className="form-label">
                رقم الجوال
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                placeholder="رقم الجوال"
                className="form-control inp_text"
              />
              <i className="icon-phone"></i>
            </div>
            <div className="input-group mb-4 w-100">
              <label htmlFor="password" className="form-label">
                الرمز السري
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={info.user && info.user.email}
                placeholder="الرمز السري"
                className="form-control inp_text"
              />
              <div onClick={handleShow} className="btn btn-primary">تغيير الرمز</div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <button className="add-submit" type="submit">
              حفظ التعديلات
            </button>
          </div>
        </div>
      </form>
    );
  };

  const EnhancedForm = withFormik({
    mapPropsToValues: () => ({
      file: "",
      name: info.user && info.user.name ? info.user.name : "",
      email: info.user && info.user.email ? info.user.email : "",
      phone: info.user && info.user.phone ? info.user.phone : "",
      extensions: "",
    }),
    handleSubmit: async (values) => {
      const data = new FormData();
      if (uploadFile) {
        data.append("photo", uploadFile[0]);
      }
      setSubmit(true);

      if(submit) {
          const resolveAfter3Sec = new Promise((resolve) =>
            setTimeout(resolve, 5000)
          );
          toast.promise(resolveAfter3Sec, {
            pending: "برجاء الإنتظار",
          });
      }

      ApiService.updateProfile({
        file: uploadFile,
        email: values.email,
        name: values.name,
        phone: values.phone,
        extensions: extensions && extensions.replace("image/", ""),
      })
        .then((response) => {
          setSubmit(false);
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
          }

        })
        .catch((err) => {
          console.log(err);
        });
    },
    displayName: "BasicForm", // helps with React DevTools
  })(MyInnerForm);

  return (
    <div className="hksa-profile-edit">
      <div className="container">
        <div className="row justify-content-center">
          <EnhancedForm />
          <ChangePassword phone={info.user && info.user.phone} handleShow={handleShow} show={show} />
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
