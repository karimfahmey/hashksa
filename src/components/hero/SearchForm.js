import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";

const SearchForm = () => {
  let navigate = useNavigate();
  const location = useLocation();
  let SearchValue = ''
  if(location.pathname === '/search') {
    SearchValue = localStorage.getItem("SearchValue");
  } else {
    localStorage.removeItem("SearchValue");
  }

  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, { setSubmitting }) => {
        localStorage.setItem("SearchValue", values.query);
        navigate(`/search?${values.query}`, {state: {  loading: true } });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }}
    >
      {(formikProps) => (
        <form onSubmit={formikProps.handleSubmit}>
          <div className="input-group">
            <Field
              type="text"
              className="form-control"
              name="query"
              placeholder={SearchValue ? SearchValue : "إبحث..."}
              onChange={formikProps.handleChange}
              value={formikProps.values.query}
              defultevalue={formikProps.values.query ? formikProps.values.query : SearchValue}
              aria-label="search"
              aria-describedby="addon-wrapping"
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SearchForm;
