import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageClick, 
  usersPerPage, 
  onPageSizeChange 
}) => {
  const renderPageNumbers = Array.from({ length: totalPages }, (_, i) => (
    <li
      key={i + 1}
      id={i + 1}
      onClick={() => onPageClick(i + 1)}
      className={`inline-block px-3 py-1 mx-1 border rounded cursor-pointer ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
    >
      {i + 1}
    </li>
  ));

  return (
    <div className="py-2 px-4 border-t text-sm text-gray-700 flex justify-between items-center">
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <ul className="flex">
        {renderPageNumbers}
      </ul>
      <div className="flex items-center ml-auto space-x-4">
        <div>
          <label className="mr-2">เลือกจำนวนรายการต่อหน้า:</label>
          <select 
            value={usersPerPage} 
            onChange={onPageSizeChange} 
            className="px-4 py-2 border rounded"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
