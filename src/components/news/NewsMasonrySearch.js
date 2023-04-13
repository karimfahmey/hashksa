import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-responsive-pagination";
import { useLocation } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { ApiService } from "../../services/data.service";
import NewsMasonryitem from "./NewsMasonryitem";
import { store } from "../../reducers";

const NewsMasonrySearch = ({ data, links, meta, currentPage, type }) => {
  const lang = localStorage.getItem("lang") || "ar";
  const getAuthHeader = () => ({
    "Accept-Language": lang,
    "X-Authorization": `${store.getState().authStoreState.token}`,
  });

  const [posts, setPosts] = useState(data);
  const [loading, setLoading] = useState(true);
  const [currentPageN, setCurrentPageN] = useState();
  const [dataLinks, setDataLinks] = useState();
  const [dataMeta, setDataMeta] = useState();
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setPosts(data);
    setCurrentPageN(currentPage);
    setDataLinks(links);
    setDataMeta(meta);
    setLoading(false);
  }, [data, meta, currentPage, links]);

  const handlePageClick = (event) => {
    const newOffset = (event * dataMeta.per_page) % dataMeta.last_page;
    const SearchValue = localStorage.getItem("SearchValue");
    setItemOffset(newOffset);
    setLoading(true);

    axios
      .post(
        `${dataMeta.path}?page=${event}`,
        { query: SearchValue },
        { headers: getAuthHeader() }
      )
      .then((response) => {
        setLoading(false);
        setPosts([]);
        setCurrentPageN(response.data.posts.meta.current_page);

        setTimeout(() => {
          setPosts(response.data.posts.data);
        }, 500);
        setDataLinks(response.data.posts.links);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="hksa-news-masonry-wrapper">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 2 }}>
        <Masonry gutter="28px">
          {posts.length > 0 &&
            posts.map((item, index) => (
              <NewsMasonryitem key={index} post={item} />
            ))}
        </Masonry>
        <div className={loading ? "loading active" : "loading"}>
          <div className="hksa-overflow-submit-text">
            <span className="loader"></span>
          </div>
        </div>
      </ResponsiveMasonry>
      {dataMeta && dataMeta.last_page > 1 && (
        <ReactPaginate
          current={currentPageN}
          className="hksa-pagination"
          total={dataMeta?.last_page}
          nextLabel="التالي"
          onPageChange={handlePageClick}
          previousLabel="السابق"
        />
      )}
    </div>
  );
};

export default NewsMasonrySearch;
