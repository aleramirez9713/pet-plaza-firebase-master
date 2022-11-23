import React from "react";
import InfiniteScroll from "react-infinite-scroller";

const InfiniteScroller = ({ children, ...rest }) => {
  return <InfiniteScroll {...rest}>{children}</InfiniteScroll>;
};

export default InfiniteScroller;
