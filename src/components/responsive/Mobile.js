import { Fragment, useRef } from "react";

const Mobile = ({ children, className }) => {
  const windowSize = useRef(window.innerWidth);

  return (
    <Fragment>
      {windowSize.current <= 960 ? (
        <div className={className}>{children}</div>
      ) : null}
    </Fragment>
  );
};

export default Mobile;
