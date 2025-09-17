import React from 'react';
import FolderCard from '../../components/FolderCard'


import MoveFileFolderModal from '../../components/MoveFileFolderModal'

import DeleteFileFolderModal from '../../components/DeleteFileFolderModal'
import useFileFolderManager from '../../hooks/useFileFolderManager'
import { Link, useLocation } from 'react-router-dom'



import RenameFolderModal from '../../components/RenameFolderModal'
import { useState } from 'react'
import TopbarInsideTabs from '../../components/TopbarInsideTabs'

function Home() {
  const {createFolderInHomepage, handleDrop,handleRenameHomePage,itemToRename, setItemToRename, showRenameModal, setShowRenameModal, handleSelectAll, pasteClipboardItems, clipboard, setClipboard, itemsPerPage,handleItemsPerPageChange ,handleSort,sortBy, sortOrder,currentPage, setCurrentPage, totalPages,currentItems, activeTab, setActiveTab, contextMenu, setContextMenu, showMoveModal, setShowMoveModal, showCopyModal, setShowCopyModal, 
    itemToCopy, setItemToCopy, itemToMove, setItemToMove, selectedItems, setSelectedItems, showDeleteModal, setShowDeleteModal, 
    itemToDelete, setItemToDelete, cards, setCards,  topLevelItems, handleSelectItem, navigate, handleRightClick, handleOpenMetadata,
    handleOpenFileItems, folders,  confirmDelete, handleDelete, handleMove, cancelDelete, handleCopy} = useFileFolderManager();

    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <div>
      <div>
  {/* Content Header (Page header) */}
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0">Dashboard</h1>
        </div>{/* /.col */}
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Dashboard vvvvv1</li>
          </ol>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* /.content-header */}
  {/* Main content */}
  <section className="content">
    {/*tab */}
  <div className=' h-20 '>
            {/* name of each tab group should be unique */}
            <div className="tabs tabs-lift">
            <input type="radio" name="" className="tab" aria-label="Folder Content" checked={activeTab === "folder-content"} onChange={() => setActiveTab("folder-content")}/>
            <div className="tab-content bg-base-100 border-base-300 p-6">
              <button className='bg-red-500 text-white px-4 py-2 rounded'>red buton</button>
            <TopbarInsideTabs location={location} pathnames={pathnames} navigate={navigate} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} handleSort={handleSort} sortBy={sortBy} sortOrder={sortOrder} handleItemsPerPageChange={handleItemsPerPageChange } itemsPerPage={itemsPerPage} handleSelectAll={handleSelectAll}></TopbarInsideTabs>
                        
                        {/*cards of folders */}
                       <div
                            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-10 "
                            onContextMenu={(e) => {
                                // Only show blank menu if clicked outside item
                                if (e.target === e.currentTarget) {
                                e.preventDefault();
                                setContextMenu({
                                    visible: true,
                                    x: e.clientX,
                                    y: e.clientY,
                                    type: 'blank',
                                    item: null,
                                });
                                }
                            }}
                            >
                            {/* Grid inside */}
                            
                                {currentItems.map((item) => (
                                <FolderCard key={item.id} item={item} onRightClick={handleRightClick} onSelect={handleSelectItem}
                                isSelected={selectedItems.some(i => i.id === item.id)}  onDrop={handleDrop} />
                                ))}
                           

                              {/* Context menu */}
                              {contextMenu.visible && (
                                    <ul
                                      className="fixed bg-white border p-1 flex flex-col  rounded shadow-lg text-sm z-50"
                                      style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
                                    >
                                      {contextMenu.type === 'blank' ? (
                                        <>
                                        <li
                                          className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                          onClick={createFolderInHomepage}
                                          
                                        >
                                          ➕ Create New Folder
                                        </li>
                                        <hr className='text-gray-300'/>
                                        {clipboard && clipboard.length > 0 && (
                                        <li
                                          className="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"
                                          onClick={() => pasteClipboardItems(null)}
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

                        </div>
                    </div>

            <input type="radio" name="my_tabs_3" className="tab" aria-label="Videos"  checked={activeTab === "videos"} onChange={() => setActiveTab("videos")}/>
            <div className="tab-content bg-base-100 border-base-300 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-10">
                    {topLevelItems
                      .filter(item => item.folderORfile === "file")
                      .map(item => (
                        <FolderCard
                          key={item.id}
                          item={item}
                          onRightClick={handleRightClick}
                          onSelect={handleSelectItem}
                          isSelected={selectedItems.some(i => i.id === item.id)}
                        />
                      ))}
                  </div>
            </div>

            </div>

            
            
            <MoveFileFolderModal
            isOpen={showMoveModal}
            onClose={() => setShowMoveModal(false)}
            onMove={handleMove}
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
              onRename={handleRenameHomePage}
            />
        </div>
  </section>
  {/* /.content */}
</div>

<div class="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen="750">
  <div class="nav navbar navbar-expand navbar-white navbar-light border-bottom p-0">
    <div class="nav-item dropdown">
      <a class="nav-link bg-danger dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Close</a>
      <div class="dropdown-menu mt-0">
        <a class="dropdown-item" href="#" data-widget="iframe-close" data-type="all">Close All</a>
        <a class="dropdown-item" href="#" data-widget="iframe-close" data-type="all-other">Close All Other</a>
      </div>
    </div>
    <a class="nav-link bg-light" href="#" data-widget="iframe-scrollleft"><i class="fas fa-angle-double-left"></i></a>
    <ul class="navbar-nav overflow-hidden" role="tablist"><li class="nav-item active" role="presentation"><a href="#"  data-type="only-this"><i class="fas fa-times"></i></a><a class="nav-link active" data-toggle="row" id="tab-index-html" href="#panel-index-html" role="tab" aria-controls="panel-index-html" aria-selected="true">Dashboard v1</a></li></ul>
 
  </div>
  <div class="tab-content">
    <div class="tab-empty">
      <h2 class="display-4">No tab selected!</h2>
    </div>
    <div class="tab-loading">
      <div>
        <h2 class="display-4">Tab is loading <i class="fa fa-sync fa-spin"></i></h2>
      </div>
    </div>
    <div class="tab-pane fade" id="panel-index-html" role="tabpanel" aria-labelledby="tab-index-html"><iframe src="./index.html"></iframe></div>
  </div>
</div>

    </div>
  );
}
 
export default Home;
