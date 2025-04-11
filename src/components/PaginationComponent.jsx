import React from "react";

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
    let newPage = Number(e.target.value);
    if (newPage >= 1 && newPage <= totalNumberOfPages) {
      setCurrentPage(newPage);
    }
  };

  const onPageBlur = () => {
    let pageNumber = Number(currentPage);
    if (isNaN(pageNumber) || pageNumber < 1) {
      setCurrentPage(1);
    } else if (isNaN(pageNumber) || pageNumber > totalNumberOfPages) {
      setCurrentPage(totalNumberOfPages);
    } else {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div
      className="pagination"
      style={{
        marginTop: "20px",
        gap: "4px",
      }}
    >
      <button
        style={{
          margin: "5px",
        }}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(1)}
      >
        First
      </button>
      <button
        style={{
          margin: "5px",
        }}
        disabled={currentPage === 1}
        onClick={prevPage}
      >
        Prev
      </button>
      <input
        type="number"
        value={currentPage}
        onBlur={onPageBlur}
        onChange={onPageChange}
        style={{
          width: "15px",
          padding: "0.6em 1.2em",
          margin: "5px",
        }}
      />
      <button
        style={{
          margin: "5px",
        }}
        disabled={currentPage === totalNumberOfPages}
        onClick={nextPage}
      >
        Next
      </button>
      <button
        style={{
          margin: "5px",
        }}
        disabled={currentPage === totalNumberOfPages}
        onClick={() => setCurrentPage(totalNumberOfPages)}
      >
        Last
      </button>
    </div>
  );
};

export default PaginationComponent;
