import React, { useState } from 'react'


const PaginationComponent = ({ currentPage, totalPages, onPageChange, handleSort, sortBy, sortOrder ,handleItemsPerPageChange, itemsPerPage }) => {

  return (
    <div>
      <ul className="flex flex-row gap-3">
      <div>
      <ul className="flex flex-row gap-3">
      <div className="join">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="join-item btn btn-lg"
                >
                    «
                </button>

                {/* Current Page Number */}
                <button className="join-item btn btn-xs btn-active" >
                    {currentPage}
                </button>

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="join-item btn btn-lg"
                >
                    »
                </button>
                </div>

      </ul>
    </div>

        <div className="flex flex-row gap-1">
          
          <div className="dropdown">
            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                <li><button onClick={() => handleSort("name")}>Name {sortBy === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}</button></li>
                {/* Add more sort options here */}
            </ul>
          </div >

          

              <div className="form-group">
              
                <select
                  className="form-control w-40 h-8 text-sm border rounded-md px-2"
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                >
                  {[5, 10, 15].map((count) => (
                    <option key={count} value={count}>
                      {count} per page
                    </option>
                  ))}
                </select>
              </div>
        </div>
      </ul>

      {/* Display the files/folders for the current page */}
      
    </div>
  )
}

export default PaginationComponent