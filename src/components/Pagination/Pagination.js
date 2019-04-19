import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = props => {
  return (
    <ReactPaginate
      previousLabel={"previous"}
      nextLabel={"next"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={10}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={props.handlePageChange}
      containerClassName={"pagination"}
      // subContainerClassName={"pages pagination"}
      activeClassName={"active"}
      forcePage={props.forcePage}
    />
  );
};

export default Pagination;
