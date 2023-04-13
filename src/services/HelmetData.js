import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import placeholder from "../assets/img/hashksa-placeholder.jpg";

export default function HelmetMetaData(props) {
  let location = useLocation();
  let currentUrl = "https://hashksa.co" + location.pathname;
  let quote = props.quote !== undefined ? props.quote : "";
  let title =
    props.title !== undefined
      ? props.title
      : "هاشتاق السعودية - ما يحدث في مواقع التواصل الاجتماعي في منصة واحدة";
  let image = props.image !== undefined ? props.image : placeholder;
  let description =
    props.description !== undefined
      ? props.description
      : "يقدم لك آخر الأحداث في السعودية عبر تغطية مستمرة لما يتم تداوله عبر وسائل التواصل الاجتماعي على مدار الساعة";
  return (
    <Helmet>
    <meta charset="utf-8" />
    <meta property="type" content="website" />
    <meta property="url" content={currentUrl} />
    <link rel="canonical" href={currentUrl} />
    <title>{title}</title>
    <meta name="title" content="" />
    <meta name="description" content={description} />
    <meta property="og:url" content={currentUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={currentUrl} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={image} />
    <meta name="robots" content="noindex" />
    <meta property="title" content={title} />
    <meta property="quote" content={quote} />
    <meta name="description" content={description} />
    <meta property="og:locale" content="ar_SA" />
    <meta property="og:type" content="website" />
    <meta property="og:quote" content={quote} />
    <meta property="og:image:secure" content={image} />
    <meta property="og:site_name" content={title} />
  </Helmet>
  );
}
