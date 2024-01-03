const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPage,
  postPerPage,
}) => {
  const showPagination = totalPage >= 4;
  if (!showPagination) {
    return null;
  }
  const handlePreviousBtn = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="">
      <button
        onClick={handlePreviousBtn}
        disabled={currentPage === 1}
        className={`text-sm transition duration-150 py-2 px-4 rounded-l ${
          currentPage === 1
            ? 'bg-gray-400'
            : 'bg-indigo-600 hover:bg-indigo-500 text-indigo-50'
        }`}
      >
        Prev
      </button>

      <button
        onClick={handleNextBtn}
        disabled={currentPage === Math.ceil(totalPage / postPerPage)}
        className={`text-sm transition duration-150 py-2 px-4 rounded-r ${
          currentPage === Math.ceil(totalPage / postPerPage)
            ? 'bg-gray-400'
            : 'bg-indigo-600 hover:bg-indigo-500 text-indigo-50'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
