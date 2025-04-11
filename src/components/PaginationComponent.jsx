import React from "react";
import "./PaginationComponent.css";

const PaginationComponent = ({
  currentPage,
  totalNumberOfPages,
  setCurrentPage,
}) => {
  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalNumberOfPages));
  };

  const onPageChange = (e) => {
    const newPage = Number(e.target.value);
    if (newPage >= 1 && newPage <= totalNumberOfPages) {
      setCurrentPage(newPage);
    }
  };

  const onPageBlur = () => {
    const pageNumber = Number(currentPage);
    if (isNaN(pageNumber) || pageNumber < 1) {
      setCurrentPage(1);
    } else if (pageNumber > totalNumberOfPages) {
      setCurrentPage(totalNumberOfPages);
    }
  };

  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
        First
      </button>
      <button disabled={currentPage === 1} onClick={prevPage}>
        Prev
      </button>
      <input
        type="number"
        value={currentPage}
        onBlur={onPageBlur}
        onChange={onPageChange}
      />
      <button disabled={currentPage === totalNumberOfPages} onClick={nextPage}>
        Next
      </button>
      <button
        disabled={currentPage === totalNumberOfPages}
        onClick={() => setCurrentPage(totalNumberOfPages)}
      >
        Last
      </button>
    </div>
  );
};

export default PaginationComponent;
