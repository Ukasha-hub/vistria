import React from 'react'
import useFileFolderManager from '../hooks/useFileFolderManager';
import Breadcrumb from './Breadcrumb';
import PaginationComponent from './PaginationComponent';
import { useNavigate } from "react-router-dom";

const TopbarInsideTabs = ({location, pathnames, currentPage ,totalPages, setCurrentPage,handleSort, sortBy ,sortOrder, handleItemsPerPageChange ,itemsPerPage, handleSelectAll}) => {
    const {cards, setCards
        } = useFileFolderManager();

    const navigate = useNavigate();    
  return (
    <div>
        {/*breadcrump */}
        <div className='flex flex-col lg:flex-row lg:justify-between'>

            <Breadcrumb location={location} pathnames={pathnames}></Breadcrumb>

                <div>
                <ul className='flex flex-row gap-7 lg:justify-around text-xs'>
                    <li><a href="">Folder Subscribe</a></li>
                    <li><a href="">Folder Settings</a></li>
                </ul>
                </div>
               
            </div>

            {/*buttons and paginations */}
            <div>
            <div className=" text-xs mt-1 lg:text-sm flex flex-col gap-1 lg:flex-row justify-evenly lg:justify-between">
                    <ul className='flex flex-row gap-2 lg:gap-3 '>
                        
                        <li><button onClick={() => navigate("/add-files")} className="btn btn-xs bg-red-300 p-1 rounded-sm">Add Files</button></li>
                        <li><button className='btn btn-xs' onClick={()=>{handleSelectAll(cards)}}>Select all</button></li>
                        
                        
                        
                        <li>
                        <div class="form-group">
                        
                        <select class="form-control" className='w-40 h-8 text-sm border rounded-md'>
                          <option>--More Action--</option>
                          <option>option 2</option>
                          <option>option 3</option>
                          <option>option 4</option>
                          <option>option 5</option>
                        </select>
                      </div>
                        </li>
                    </ul>
                    <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} handleSort={handleSort} sortBy={sortBy} sortOrder={sortOrder} handleItemsPerPageChange={handleItemsPerPageChange } itemsPerPage={itemsPerPage}></PaginationComponent>
                </div>
                

            </div>
    </div>
  )
}

export default TopbarInsideTabs