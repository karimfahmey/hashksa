import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import ReactPaginate from "react-responsive-pagination";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { ApiService } from "../../services/data.service";
import NewsMasonryitem from "./NewsMasonryitem";
import { Field, Formik } from "formik";
import NotFound from "../../pages/search/NotFound";

const NewsMasonry = () => {
  const [posts, setPosts] = useState([]);
  const [links, setLinks] = useState();
  const [meta, setMeta] = useState();
  const [categorys, setCategorys] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    ApiService.posts()
      .then((response) => {
        setPosts(response.data.data);
        setLinks(response.data.links);
        setMeta(response.data.meta);
        setCurrentPage(response.data.meta.current_page);
      })
      .catch((err) => {
        console.log(err);
      });
    ApiService.getCategoryWeb()
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

  const handlePageClick = (event) => {
    const newOffset = (event * meta.per_page) % meta.last_page;
    setItemOffset(newOffset);

    axios
      .post(`${meta.path}?page=${event}`)
      .then((response) => {
        setPosts([]);
        setCurrentPage(response.data.meta.current_page);
        setTimeout(() => {
          setPosts(response.data.data);
        }, 500);
        setLinks(response.data.links);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="hksa-news-masonry-wrapper">
      <div className="hksa-news-filter">
        <Formik
          initialValues={{ category_id: [], tag_id: [] }}
          onSubmit={(values, { setSubmitting }) => {
            ApiService.posts({
              category_id: values.category_id,
              tag_id: values.tag_id,
            })
              .then((response) => {
                setPosts([]);
                setTimeout(() => {
                  setPosts(response.data.data);
                }, 500);
                setLinks(response.data.links);
                setMeta(response.data.meta);
                setCurrentPage(response.data.meta.current_page);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          {(formikProps, setFieldValue) => (
            <form onSubmit={formikProps.handleSubmit}>
              <div className="input-groups mb-4 w-100">
                <div className="input-group mb-4 w-100">
                  <Select
                    name="category_id"
                    id="category_id"
                    options={categorys}
                    placeholder='التصنيف'
                    className="w-100 select-custom"
                    isMulti
                    onChange={ (value) => {
                      let categoryValue = []
                      value.forEach(element => {
                        categoryValue.push(element.value)
                      });
                      formikProps.setFieldValue('category_id', categoryValue)
                    }}
                    onBlur={formikProps.handleBlur}
                  />
                  {formikProps.errors.category_id &&
                  formikProps.touched.category_id ? (
                    <div className="input-error">
                      {formikProps.errors.category_id}
                    </div>
                  ) : null}
                </div>
                <div className="input-group mb-4 w-100">
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
                      formikProps.setFieldValue('tag_id', tagValue)
                    }}
                    onBlur={formikProps.handleBlur}
                  />
                  {formikProps.errors.tag_id && formikProps.touched.tag_id ? (
                    <div className="input-error">
                      {formikProps.errors.tag_id}
                    </div>
                  ) : null}
                </div>
                <div className="input-group mb-4 w-100 align-self-end">
                  <button className="add-submit" type="submit">
                    تصفية
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
      {posts.length > 0 ? (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 2 }}>
          <Masonry gutter="28px">
            {posts.length > 0 &&
              posts.map((item, index) => (
                <NewsMasonryitem key={index} post={item} />
              ))}
          </Masonry>
        </ResponsiveMasonry>
      ) : (
        <NotFound />
      )}

      {meta && meta.last_page > 1 && (
        <ReactPaginate
          current={currentPage}
          className="hksa-pagination"
          total={meta?.last_page}
          nextLabel="التالي"
          onPageChange={handlePageClick}
          previousLabel="السابق"
        />
      )}
    </div>
  );
};

export default NewsMasonry;
