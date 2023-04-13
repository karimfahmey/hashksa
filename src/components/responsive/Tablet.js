import { Fragment, useRef } from "react";

const Tablet = ({ children, className }) => {
  const windowSize = useRef(window.innerWidth);

  return (
    <Fragment>
      {windowSize.current >= 768 ? (
        <div className={className}>
            {children}
        </div>
      ) : null}
    </Fragment>
  );
};

export default Tablet;
