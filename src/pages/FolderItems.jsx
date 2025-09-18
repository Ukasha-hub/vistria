
import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import FolderCard from '../components/FolderCard';
import MoveFileFolderModal from '../components/MoveFileFolderModal';

import DeleteFileFolderModal from '../components/DeleteFileFolderModal';

import useFileFolderManager from '../hooks/useFileFolderManager';
import { Link, useLocation } from 'react-router-dom'

import PaginationComponent from '../components/PaginationComponent';
import Breadcrumb from '../components/Breadcrumb';
import RenameFolderModal from '../components/RenameFolderModal';
import TopbarInsideTabs from '../components/TopbarInsideTabs';


const FolderItems = () => {


  const {createFolderInFolders,handleDrop ,itemToRename, setItemToRename, showRenameModal, setShowRenameModal, handleSelectAll, pasteClipboardItems, clipboard, setClipboard, handleItemsPerPageChangeinFiles , changePageinFiles ,paginatedTopLevelItemsinFiles,currentItemsinFiles,totalPagesinFiles,itemsPerPageinFiles, setItemsPerPageinFiles, currentPageinFiles, setCurrentPageinFiles,handleSortinFiles,sortOrderinFiles, setSortOrderinFiles, sortByinFiles, setSortByinFiles,sortedItemsinFiles,items, setItems, itemsPerPage,handleItemsPerPageChange ,handleSort,sortBy, sortOrder,currentPage, setCurrentPage, changePage,totalPages,currentItems,paginatedTopLevelItems, activeTab, setActiveTab, contextMenu, setContextMenu, showMoveModal, setShowMoveModal, showCopyModal, setShowCopyModal, 
    itemToCopy, setItemToCopy, itemToMove, setItemToMove, selectedItems, setSelectedItems, showDeleteModal, setShowDeleteModal, 
    itemToDelete, setItemToDelete, cards, setCards,  handleSelectItem, navigate, handleRightClick, handleOpenMetadata,
    handleOpenFileItems, folders,  confirmDelete, handleDelete, handleMoveInFolders, cancelDelete, handleCopy} = useFileFolderManager();

  const { id } = useParams();
  const [folder, setFolder] = useState(null);

  
  
  
    
  const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
 
    const handleRenameFolders = (item, newName) => {
      const data = JSON.parse(localStorage.getItem("cards")) || [];
      const index = data.findIndex(i => i.id === item.id);
      if (index !== -1) {
        data[index].title = newName;
        localStorage.setItem("cards", JSON.stringify(data));
        setCards(data);
    
        // Optional: update items in current folder
        const parentFolderIndex = data.findIndex(i => i.id === parseInt(id));
        const updatedChildItems = data.filter(i =>
          data[parentFolderIndex]?.folderItems.includes(i.id)
        );
        setItems(updatedChildItems);
      }
    };

    



   

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cards")) || [];
    const targetFolder = data.find(item => item.id === parseInt(id) && item.folderORfile === "folder");
    setFolder(targetFolder);

    if (targetFolder) {
        const childItems = data.filter(item =>
            targetFolder.folderItems.includes(item.id) || 
            targetFolder.folderItems.includes(String(item.id))
          )
      setItems(childItems);
    }
  }, [id]);

  if (!folder) return <div className="p-4">Folder not found.</div>;



  if (items.length === 0) return( 
    <>
               {/* Page Header */}
     <div className="content-header">
     <div className="container-fluid">
       <div className="row mb-2">
         <div className="col-sm-6">
           <h1 className="m-0">Dashboard</h1>
         </div>
         <div className="col-sm-6">
           <ol className="breadcrumb float-sm-right">
           <Breadcrumb className="breadcrumb-item text-2xl" location={location} pathnames={pathnames}></Breadcrumb>
           </ol>
         </div>
       </div>
     </div>
   </div>
  
                <div className="p-4" onContextMenu={(e) => {
                  e.preventDefault();
                  setContextMenu({
                    visible: true,
                    x: e.clientX,
                    y: e.clientY,
                    type: 'blank',
                    item: null,
                  });
                }}
              > 
                
                <div className=' h-20 '>
                          {/* name of each tab group should be unique */}
                          <div className="tabs tabs-lift">
                          <input  name="" className="tab" aria-label="Folder Content" checked={activeTab === "folder-content"} onChange={() => setActiveTab("folder-content")}/>
                          <div className='tab-content bg-base-100 border-base-300 p-4'>

                          <TopbarInsideTabs location={location} pathnames={pathnames} navigate={navigate} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} handleSort={handleSort} sortBy={sortBy} sortOrder={sortOrder} handleItemsPerPageChange={handleItemsPerPageChange } itemsPerPage={itemsPerPage} handleSelectAll={handleSelectAll}></TopbarInsideTabs>

              {/*buttons and paginations */}
              <div className='border-2 '>

                <div className='flex justify-center border-2 pb-50'><div className='pb-30'>Folder is empty</div></div>
                {/* Context menu */}
                {contextMenu.visible && (
                                                  <ul
                                                    className="fixed bg-white border  flex flex-col  rounded shadow-lg text-sm z-50"
                                                    style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
                                                  >
                                                    {contextMenu.type === 'blank' ? (
                                                      <>
                                                      <li
                                                        className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                                        onClick={()=>{createFolderInFolders(id)}}
                                                        
                                                      >
                                                        ➕ Create New Folder
                                                        <hr className='text-gray-300'/>
                                                      </li>
                                                      {clipboard && clipboard.length > 0 && (
                                                        <li
                                                          className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                                          onClick={() => pasteClipboardItems(id)}
                                                        >
                                                          Paste
                                                        </li>
                                                      )}

                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </ul>
                                                )}


              </div>



                            </div>
                           
                
              </div>
              </div>
              </div>
              </>
  )

 

  return (
    <div>

               {/* Page Header */}
     <div className="content-header">
     <div className="container-fluid">
       <div className="row mb-2">
         <div className="col-sm-6">
           <h1 className="m-0">Dashboard</h1>
         </div>
         <div className="col-sm-6">
           <ol className="breadcrumb float-sm-right">
           <Breadcrumb className="breadcrumb-item text-2xl" location={location} pathnames={pathnames}></Breadcrumb>
           </ol>
         </div>
       </div>
     </div>
   </div>

       {/*tab */}
       <div className=' h-20 '>
            {/* name of each tab group should be unique */}
            {/* Tabs Header (like Homepage) */}
            <div className="nav navbar navbar-expand navbar-white navbar-light border-bottom p-0">
              <ul className="navbar-nav overflow-hidden" role="tablist">
                <li className={`nav-item ${activeTab === "folder-content" ? "active" : ""}`}>
                  <a
                    className={`nav-link ${activeTab === "folder-content" ? "active" : ""}`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("folder-content");
                    }}
                  >
                    Folder Content
                  </a>
                </li>
                <li className={`nav-item ${activeTab === "videos" ? "active" : ""}`}>
                  <a
                    className={`nav-link ${activeTab === "videos" ? "active" : ""}`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("videos");
                    }}
                  >
                    Videos
                  </a>
                </li>
              </ul>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === "folder-content" && (
                <div className="tab-pane fade show active p-4">
                  {/* Your Folder Content Grid */}
                  <TopbarInsideTabs
                    location={location}
                    pathnames={pathnames}
                    navigate={navigate}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    handleSort={handleSort}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    handleItemsPerPageChange={handleItemsPerPageChange}
                    itemsPerPage={itemsPerPage}
                    handleSelectAll={handleSelectAll}
                  />
                  <div
                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-10"
                    onContextMenu={(e) => {
                      if (e.target === e.currentTarget) {
                        e.preventDefault();
                        setContextMenu({
                          visible: true,
                          x: e.clientX,
                          y: e.clientY,
                          type: "blank",
                          item: null,
                        });
                      }
                    }}
                  >
                    {currentItemsinFiles.map(item => (
                        <FolderCard key={item.id} item={item} onRightClick={handleRightClick} onSelect={handleSelectItem}
                        isSelected={selectedItems.some(i => i.id === item.id)}  onDrop={handleDrop}/>
                      ))}
                  </div>
                </div>
              )}
               {/* Context menu */}
               {contextMenu.visible && (
                                    <ul
                                      className="fixed bg-white border  flex flex-col  rounded shadow-lg text-sm z-50"
                                      style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
                                    >
                                      {contextMenu.type === 'blank' ? (
                                        <>
                                        <li
                                          className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                          onClick={()=>{createFolderInFolders(id)}}
                                          
                                        >
                                          ➕ Create New Folder
                                        </li>
                                        <hr className='text-gray-300'/>
                                        {clipboard && clipboard.length > 0 && (
                                            <li
                                              className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                              onClick={() => pasteClipboardItems(id)}
                                            >
                                              Paste
                                            </li>
                                          )}

                                        </>
                                      ) : (
                                        <>
                                          {contextMenu.type === 'folder' && (
                                            <li
                                              className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                              onClick={handleOpenFileItems}
                                            >
                                              Open Folder
                                              <hr className='text-gray-300'/>
                                            </li>
                                          )}
                                          {contextMenu.type === 'file' && (
                                            <li
                                              className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                              onClick={handleOpenMetadata}
                                            >
                                              Open Meta
                                              <hr className='text-gray-300'/>
                                            </li>
                                          )}
                                          <li
                                            className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                            onClick={() => {
                                              const items = selectedItems.length ? selectedItems : [contextMenu.item];
                                              setItemToMove(items);
                                              setShowMoveModal(true);
                                            }}
                                          >
                                            Move {contextMenu.type === 'folder' ? 'Folder' : 'File'}
                                            <hr className='text-gray-300'/>
                                          </li>
                                         
                                          <li
                                            className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                            onClick={() => {
                                              setItemToCopy(selectedItems.length ? selectedItems : [contextMenu.item]);
                                              setClipboard(selectedItems.length ? selectedItems : [contextMenu.item]);
                                              setContextMenu(prev => ({ ...prev, visible: false }));
                                            }}
                                          >
                                            Copy
                                            <hr className='text-gray-300'/>
                                          </li>
                                          <li
                                            className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                            onClick={() => {
                                              const item = selectedItems.length ? selectedItems[0] : contextMenu.item;
                                              setItemToRename(item);
                                              setShowRenameModal(true);
                                              setContextMenu(prev => ({ ...prev, visible: false }));
                                            }}
                                          >
                                            Rename
                                            <hr className='text-gray-300'/>
                                          </li>

                                          <li
                                            className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                            onClick={() => confirmDelete(selectedItems)}
                                          >
                                            Delete
                                          </li>
                                        </>
                                      )}
                                    </ul>
                                  )}

              {activeTab === "videos" && (
                <div className="tab-pane fade show active p-4">
                  <div
                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-10"
                    onContextMenu={(e) => {
                      if (e.target === e.currentTarget) {
                        e.preventDefault();
                        setContextMenu({
                          visible: true,
                          x: e.clientX,
                          y: e.clientY,
                          type: "blank",
                          item: null,
                        });
                      }
                    }}
                  >
                    {items
                      .filter((item) => item.folderORfile === "file")
                      .map((item) => (
                        <FolderCard
                          key={item.id}
                          item={item}
                          onRightClick={handleRightClick}
                          onSelect={handleSelectItem}
                          isSelected={selectedItems.some((i) => i.id === item.id)}
                        />
                      ))}

                      {/* Context Menu */}
                  {contextMenu.visible && (
                    <ul
                      className="fixed bg-white border p-1 flex flex-col rounded shadow-lg text-sm z-[9999]"
                      style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
                    >
                      {/* Context menu */}
                      {contextMenu.visible && (
                                    <ul
                                      className="fixed bg-white border p-1 flex flex-col  rounded shadow-lg text-sm z-[9999]"
                                      style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
                                    >
                                      {contextMenu.type === 'blank' ? (
                                        <>
                                        <li
                                                        className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                                        onClick={()=>{createFolderInFolders(id)}}
                                                        
                                                      >
                                                        ➕ Create New Folder
                                                        <hr className='text-gray-300'/>
                                                      </li>
                                                      {clipboard && clipboard.length > 0 && (
                                                        <li
                                                          className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                                          onClick={() => pasteClipboardItems(id)}
                                                        >
                                                          Paste
                                                        </li>
                                                      )}

                                        </>
                                      ) : (
                                        <>
                                          {contextMenu.type === 'folder' && (
                                            <li
                                              className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                              onClick={handleOpenFileItems}
                                            >
                                              Open Folder
                                              <hr className='text-gray-300'/>
                                            </li>
                                          )}
                                          
                                          {contextMenu.type === 'file' && (
                                            <li
                                              className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                              onClick={handleOpenMetadata}
                                            >
                                              Open Meta
                                              <hr className='text-gray-300'/>
                                            </li>
                                          )}
                                          
                                          <li
                                            className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                            onClick={() => {
                                              const items = selectedItems.length ? selectedItems : [contextMenu.item];
                                              setItemToMove(items);
                                              setShowMoveModal(true);
                                            }}
                                          >
                                            Move {contextMenu.type === 'folder' ? 'Folder' : 'File'}
                                          </li>
                                          <hr className='text-gray-300'/>
                                         
                                          <li
                                            className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                            onClick={() => {
                                              setItemToCopy(selectedItems.length ? selectedItems : [contextMenu.item]);
                                              setClipboard(selectedItems.length ? selectedItems : [contextMenu.item]);
                                              setContextMenu(prev => ({ ...prev, visible: false }));
                                            }}
                                          >
                                            Copy
                                          </li>
                                          <hr className='text-gray-300'/>
                                          <li
                                              className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                              onClick={() => {
                                                const item = selectedItems.length ? selectedItems[0] : contextMenu.item;
                                                setItemToRename(item);
                                                setShowRenameModal(true);
                                                setContextMenu(prev => ({ ...prev, visible: false }));
                                              }}
                                            >
                                              Rename
                                            </li>
                                            <hr className='text-gray-300'/>
                                          <li
                                            className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                            onClick={() => confirmDelete(selectedItems)}
                                          >
                                            Delete
                                          </li>
                                        </>
                                      )}
                                    </ul>
                                  )}

                    </ul>
                  )}
                  </div>
                </div>
              )}
            </div>
 

          

            <MoveFileFolderModal
                        isOpen={showMoveModal}
                        onClose={() => setShowMoveModal(false)}
                        onMove={handleMoveInFolders}
                        folders={folders}
                        item={itemToMove}></MoveFileFolderModal>

            

            <DeleteFileFolderModal
              show={showDeleteModal}
              item={itemToDelete?.length === 1 ? itemToDelete[0] : { title: `${itemToDelete?.length} items` }}
              onDelete={handleDelete}
              onCancel={cancelDelete}
            /> 
            <RenameFolderModal
            isOpen={showRenameModal}
            item={itemToRename}
            onClose={() => setShowRenameModal(false)}
            onRename={handleRenameFolders} // pass current item and folder ID
          />


      </div>
    </div>  

     
  )
}

export default FolderItems
