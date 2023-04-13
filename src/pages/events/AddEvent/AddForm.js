// /* eslint-disable jsx-a11y/iframe-has-title */
// import React, { useEffect, useState } from "react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  Autocomplete,
} from "@react-google-maps/api";
import Select from "react-select";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { ApiService } from "../../../services/data.service";
// import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import Global from "../../../assets/img/global.svg";
import ar from "date-fns/locale/ar";


const libraries = ["places"];

const AddForm = () => {
  const [show, setShow] = useState(false);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [previewImageSize, setPreviewImageSize] = useState(undefined);
  const [previewVideo, setPreviewVideo] = useState(undefined);
  const [previewVideoSize, setPreviewVideoSize] = useState(undefined);
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  const [tags, setTags] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [categorys, setCategorys] = React.useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [uploadFile, setUploadFile] = useState();
  const [extensions, setExtensions] = useState();
  const [videoExtension, setVideoExtension] = useState();

  const [autocomplete, setAutocomplete] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [markers, setMarker] = useState({
    lat: 24.742939291557942,
    lng: 46.684502644904775,
  });
  const [lat, setLat] = useState(undefined);
  const [lng, setLong] = useState(undefined);

  useEffect(() => {
    ApiService.getCity()
      .then((response) => {
        setCity(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    ApiService.getEventCategoryWeb()
      .then((response) => {
        setCategorys(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    ApiService.getTagsWeb()
      .then((response) => {
        setTags(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  // const handleSelect = (event, i) => {
  //   const value = event.target.value;
  //   const isChecked = event.target.checked;

  //   if (isChecked) {
  //     //Add checked item into checkList
  //     setCheckedList([...checkedList, value]);
  //     setChecked(true);
  //   } else {
  //     //Remove unchecked item from checkList
  //     const filteredList = checkedList.filter((item) => item !== value);
  //     setCheckedList(filteredList);
  //     setChecked(false);
  //   }
  // };

  const center = { lat: 24.742939291557942, lng: 46.684502644904775 };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD5onmfjofDOCSLAszkgGv7o7haIlseHtw",
    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  const mapContainerStyle = {
    height: "60vh",
    width: "100%",
    borderRadius: "18px",
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  };

  const handleMouseOver = (event) => {
    setMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLat(lat);
    setLong(lng);
  };

  // Creating schema
  const schema = Yup.object().shape({
    // creator: Yup.string().required("Please enter creator name"),
    // email: Yup.string()
    //   .required("Email is a required field")
    //   .email("Invalid email format"),
    // phone: Yup.string().required("Please enter your phone number"),
    // title: Yup.string().required("Please enter a title"),
    // date_time: Yup.string().required("Please enter a date and time"),
    // location: Yup.string().required("Please enter a location"),
    // // file: Yup.string().required("Please upload a file"),
    // category_id: Yup.string().required("Please select a category"),
  });

  const DatePickerField = ({ name, value, onChange }) => {
    return (
      <DatePicker
        showTimeSelect
        showIcon
        showDisabledMonthNavigation
        minDate={new Date()}
        timeClassName={handleColor}
        selected={value ? new Date(value) : new Date()}
        locale={ar}
        onChange={(val) => {
          moment.locale("en");
          const newDate = moment(val).format("YYYY-MM-DD HH:mm:ss");
          onChange(name, newDate);
        }}
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    );
  };

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      console.log();
      setMarker({
        lat: autocomplete.getPlace().geometry.location.lat(),
        lng: autocomplete.getPlace().geometry.location.lng(),
      });
      setLat(autocomplete.getPlace().geometry.location.lat());
      setLong(autocomplete.getPlace().geometry.location.lng());
      setLocation(autocomplete.getPlace().formatted_address);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        creator: "",
        phone: "",
        title: "",
        des: "",
        date_time: "",
        location: "",
        category_id: [],
        media_type: "image",
        extensions: "",
        photo: "",
        lat: "",
        lng: "",
        video: "",
        website: "",
        facebook: "",
        twitter: "",
        Instagram: "",
        tag_id: [],
        city_id: "",
      }}
      validationSchema={schema}
      onSubmit={async (values, e) => {
        setShow(true);
        const data = new FormData();
        data.append("photo", uploadFile[0]);

        const extension = extensions.replace("image/", "");
        let extensionVideo = videoExtension
          ? videoExtension.replace("video/", "")
          : "";

        let VideoExtension = "";
        if (extensionVideo && extensionVideo === "quicktime") {
          VideoExtension = "mov";
        } else {
          VideoExtension = extensionVideo;
        }

        ApiService.addEvents({
          email: values.email,
          creator: values.creator,
          phone: values.phone,
          title: values.title,
          des: values.des,
          date_time: values.date_time,
          location: location,
          category_id: values.category_id,
          media_type: "image",
          photo: values.photo,
          extensions: extension,
          video: values.video,
          videoExtension: VideoExtension,
          videoType: extensionVideo,
          lat: lat,
          lng: lng,
          website: values.website,
          facebook: values.facebook,
          twitter: values.twitter,
          Instagram: values.Instagram,
          tag_id: values.tag_id,
          city_id: values.city_id,
        })
          .then((response) => {
            setShow(false);
            console.log(response);
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
              setTimeout(() => {
                navigate("/events");
              }, 1000);
            }
          })
          .catch((err) => {
            if (err.data.status === false) {
              toast.error(err.data.message, {
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
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        formProps,
      }) => (
        <div className="hksa-add-event">
          <form
            noValidate
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="row">
              <div className="col-md-7 offset-md-1">
                <div className="input-group mb-4 w-100">
                  <label htmlFor="creator" className="form-label">
                    اسم المنشئ أو اسم الشركة
                  </label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      name="creator"
                      id="creator"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.creator}
                      placeholder="شركة ترفيه دوت كوم"
                      className="form-control inp_text"
                    />
                    <i className="icon-user"></i>
                  </div>
                </div>

                <div className="input-groups mb-4 w-100">
                  <div className="input-group mb-4 w-100">
                    <label htmlFor="email" className="form-label">
                    البريد الإلكتروني
                    </label>
                    <div className="input-with-icon">
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
                    {errors.email && touched.email ? (
                      <div className="input-error">{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="input-group mb-4 w-100">
                    <label htmlFor="phone" className="form-label">
                      رقم التواصل
                    </label>
                    <div className="input-with-icon">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        placeholder="996 2131 4323 4321"
                        className="form-control inp_text"
                      />
                      <i className="icon-phone"></i>
                    </div>
                    {errors.phone && touched.phone ? (
                      <div className="input-error">{errors.phone}</div>
                    ) : null}
                  </div>
                </div>

                <div className="input-group mb-4 w-100">
                  <label htmlFor="title" className="form-label">
                    عنوان الحدث
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    placeholder="المعرض السعودي للفعاليات"
                    className="form-control inp_text"
                  />
                  {errors.title && touched.title ? (
                    <div className="input-error">{errors.title}</div>
                  ) : null}
                </div>

                <div className="input-group mb-4 w-100">
                  <label htmlFor="title" className="form-label">
                    التصنيف
                  </label>
                  <Select
                      name="category_id"
                      id="category_id"
                      options={categorys}
                      placeholder="التصنيف"
                      className="w-100 select-custom"
                      isMulti
                      onChange={(value) => {
                        let categoryValue = [];
                        value.forEach((element) => {
                          categoryValue.push(element.value);
                        });
                        setFieldValue("category_id", categoryValue);
                      }}
                      onBlur={handleBlur}
                    />
                  {errors.category_id && touched.category_id ? (
                    <div className="input-error">{errors.category_id}</div>
                  ) : null}
                </div>

                <div className="input-group mb-4 w-100">
                  <label htmlFor="title" className="form-label">
                  وسم الحدث
                  </label>
                  <Select
                    name="tag_id"
                    id="tag_id"
                    placeholder='الوسوم'
                    options={tags}
                    className="w-100 select-custom"
                    isMulti
                    onChange={ (value) => {
                      let tagValue = []
                      value.forEach(element => {
                        tagValue.push(element.value)
                      });
                      setFieldValue('tag_id', tagValue)
                    }}
                    onBlur={handleBlur}
                  />
                  {errors.category_id && touched.category_id ? (
                    <div className="input-error">{errors.category_id}</div>
                  ) : null}
                </div>

                <div className="input-group mb-4 w-100">
                  <label htmlFor="title" className="form-label">
                    المدينة
                  </label>
                  <select
                    name="city_id"
                    id="city_id"
                    onChange={handleChange}
                    value={values.city_id}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>برجاء اختيار المدينة</option>
                    {city &&
                      city.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                  {errors.city_id && touched.city_id ? (
                    <div className="input-error">{errors.city_id}</div>
                  ) : null}
                </div>

                <div className="input-group mb-4 w-100">
                  <label htmlFor="des" className="form-label">
                    وصف الحدث
                  </label>
                  <textarea
                    className="form-control"
                    name="des"
                    id="des"
                    rows="3"
                    value={values.des}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="وصف الحدث"
                  />
                </div>

                <div className="input-group mb-4 w-100">
                  <label htmlFor="location" className="form-label">
                    التاريخ و الوقت
                  </label>
                  <div className="input-with-icon">
                    <DatePickerField
                      name="date_time"
                      value={values.date_time}
                      onChange={setFieldValue}
                    />
                    <i className="icon-date"></i>
                  </div>
                </div>

                <div className="input-group mb-4 w-100">
                  <label htmlFor="location" className="form-label">
                    الموقع على الخريطة
                  </label>
                  <GoogleMap
                    id="map"
                    mapContainerStyle={mapContainerStyle}
                    zoom={12}
                    center={markers}
                    options={options}
                    onLoad={onMapLoad}
                  >
                    <MarkerF
                      position={markers}
                      onDrag={handleMouseOver}
                      animation={window.google.maps.Animation.DROP}
                      draggable={true}
                      icon={{
                        url: require("../../../assets/img/pin.svg"),
                      }}
                    />
                    <Autocomplete
                      onLoad={onLoad}
                      onPlaceChanged={onPlaceChanged}
                    >
                      <div className="input-with-icon">
                        <input
                          type="text"
                          name="location"
                          id="location"
                          onChange={handleChange}
                          placeholder="الشيخ محمد بن إبراهيم،، الدرعية الجديدة، الدرعية 13734"
                          className="form-control inp_text"
                        />
                        <i className="icon-pin"></i>
                      </div>
                    </Autocomplete>
                  </GoogleMap>
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-upload mb-4 w-100">
                  <label className="form-label">أرفق صورة الحدث</label>
                  <div className="drag-file-area">
                    <label className="label">
                      <i className="icon-upload"></i>
                      <span className="browse-files">
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
                            if(e.target.files[0].size < 10000000) {
                              fileReader.readAsDataURL(e.target.files[0]);
                              setExtensions(e.currentTarget.files[0].type);
                              setPreviewImage(
                                e.target.files[0]
                                  ? URL.createObjectURL(e.target.files[0])
                                  : ""
                              );
                              setPreviewImageSize("")
                            } else {
                              setPreviewImageSize("حجم الملف يجب أن لا يتجاوز 10Mb")
                            }
                          }}
                          className="default-file-input"
                        />
                      </span>
                      {previewImageSize && (
                        <p>{previewImageSize}</p>
                      )}
                      {previewImage && (
                        <div className="hksa-preview-upload">
                          <img src={previewImage} alt="" />
                          <div className="modal-header">
                            <button
                              type="button"
                              className="btn-close"
                              disabled
                            ></button>
                          </div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
                <div className="input-upload mb-4 w-100">
                  <label className="form-label">ارفع فيديو</label>
                  <div className="drag-file-area">
                    <label className="label">
                      <i className="icon-upload"></i>
                      <span className="browse-files">
                        <input
                          type="file"
                          name="video"
                          id="video"
                          onChange={(e) => {
                            const fileReader = new FileReader();
                            fileReader.onload = () => {
                              if (fileReader.readyState === 2) {
                                setFieldValue("video", fileReader.result);
                                setUploadFile(fileReader.result);
                              }
                            };
                            if(e.target.files[0].size < 10000000) {
                              fileReader.readAsDataURL(e.target.files[0]);
                              setFieldValue("video", e.currentTarget.files[0]);
                              setVideoExtension(e.currentTarget.files[0].type);
                              setPreviewVideo(
                                e.target.files[0]
                                  ? URL.createObjectURL(e.target.files[0])
                                  : ""
                              );
                              setPreviewVideoSize("")
                            } else {
                              setPreviewVideoSize("حجم الملف يجب أن لا يتجاوز 10Mb")
                            }
                          }}
                          className="default-file-input"
                          accept="video/*"
                        />
                      </span>
                      {previewVideoSize && (
                        <p>{previewVideoSize}</p>
                      )}
                      {previewVideo && (
                        <div className="hksa-preview-upload">
                          <video width="320" height="240">
                            <source src={previewVideo} type="video/mp4" />
                            <source src={previewVideo} type="video/ogg" />
                          </video>
                          <p>{values.video.name}</p>
                          <div className="modal-header">
                            <button
                              type="button"
                              className="btn-close"
                              disabled
                            ></button>
                          </div>
                        </div>
                      )}
                        {errors.video && touched.video ? (
                          <div className="input-error">{errors.video}</div>
                        ) : null}
                    </label>
                  </div>
                </div>
                {/* <div className="form-group-tags mb-4">
                  <div className="form-group-title">
                    <h4>اختر وسومك المفضلة</h4>
                  </div>
                  <ul className="hksa-tags-list">
                    {tags &&
                      tags.map((item, index) => (
                        <label
                          key={index}
                          className="hksa-tags-item"
                          onClick={handleSelect}
                        >
                          <input
                            type="checkbox"
                            name="tag_id"
                            value={item.id}
                            onChange={handleChange}
                          />
                          <div
                            className={
                              checked
                                ? "checkbox-container active"
                                : "checkbox-container"
                            }
                          >
                            <p>{item.name}</p>
                          </div>
                        </label>
                      ))}
                  </ul>
                </div> */}
                <div className="form-group-social mb-4">
                  <div className="form-group-title">
                    <h4>اضف وسائل التواصل بالحدث (إختياري)</h4>
                  </div>
                  <div className="input-group mb-4 w-100">
                    <input
                      type="text"
                      name="website"
                      id="website"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.website}
                      placeholder="https://hashksa.co"
                      className="form-control inp_text"
                    />
                    <img src={Global} alt="website" />
                  </div>
                  <div className="input-group mb-4 w-100">
                    <input
                      type="text"
                      name="facebook"
                      id="facebook"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.facebook}
                      placeholder="https://facebook.com/hashksa"
                      className="form-control inp_text"
                    />
                    <i className="icon-fb-b"></i>
                  </div>
                  <div className="input-group mb-4 w-100">
                    <input
                      type="text"
                      name="Instagram"
                      id="Instagram"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Instagram}
                      placeholder="https://instagram.com/hashksa"
                      className="form-control inp_text"
                    />
                    <i className="icon-ins"></i>
                  </div>
                  <div className="input-group mb-4 w-100">
                    <input
                      type="text"
                      name="twitter"
                      id="twitter"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.twitter}
                      placeholder="https://twitter.com/hashksa"
                      className="form-control inp_text"
                    />
                    <i className="icon-tw"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <button className="add-submit" type="submit">
                  إضافة
                </button>
              </div>
              <div
                className={
                  show ? "hksa-overflow-submit active" : "hksa-overflow-submit"
                }
              >
                <div className="hksa-overflow-submit-text">
                  <span className="loader"></span>
                  <p>جاري إنشاء الحدث</p>
                </div>
              </div>
              {/* VALUES:
              <pre>{JSON.stringify(values, null, 2)}</pre>
              ERRORS:
              <pre>{JSON.stringify(errors, null, 2)}</pre>
              TOUCHED:
              <pre>{JSON.stringify(touched, null, 2)}</pre> */}
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default AddForm;
