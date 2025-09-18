import React from 'react';
import FolderCard from '../../components/FolderCard'


import MoveFileFolderModal from '../../components/MoveFileFolderModal'

import DeleteFileFolderModal from '../../components/DeleteFileFolderModal'
import useFileFolderManager from '../../hooks/useFileFolderManager'
import { Link, useLocation } from 'react-router-dom'



import RenameFolderModal from '../../components/RenameFolderModal'
import { useState } from 'react'
import TopbarInsideTabs from '../../components/TopbarInsideTabs'
import Breadcrumb from '../../components/Breadcrumb';

function Home() {
  const {createFolderInHomepage, handleDrop,handleRenameHomePage,itemToRename, setItemToRename, showRenameModal, setShowRenameModal, handleSelectAll, pasteClipboardItems, clipboard, setClipboard, itemsPerPage,handleItemsPerPageChange ,handleSort,sortBy, sortOrder,currentPage, setCurrentPage, totalPages,currentItems,  contextMenu, setContextMenu, showMoveModal, setShowMoveModal, showCopyModal, setShowCopyModal, 
    itemToCopy, setItemToCopy, itemToMove, setItemToMove, selectedItems, setSelectedItems, showDeleteModal, setShowDeleteModal, 
    itemToDelete, setItemToDelete, cards, setCards,  topLevelItems, handleSelectItem, navigate, handleRightClick, handleOpenMetadata,
    handleOpenFileItems, folders,  confirmDelete, handleDelete, handleMove, cancelDelete, handleCopy} = useFileFolderManager();

    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    const [activeTab, setActiveTab] = useState("folder-content");

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
              <ol className="breadcrumb float-lg-right">
              <Breadcrumb className="breadcrumb-item text-2xl" location={location} pathnames={pathnames}></Breadcrumb>
                
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* Tabs */}
          <div className="nav navbar navbar-expand navbar-white navbar-light border-bottom p-0">
            <ul className="navbar-nav overflow-hidden" role="tablist">
              <li className={`nav-item ${activeTab === "folder-content" ? "active" : ""}`}>
                <a className={`nav-link ${activeTab === "folder-content" ? "active" : ""}`}
                   href="#"
                   onClick={() => setActiveTab("folder-content")}>
                  Folder Content
                </a>
              </li>
              <li className={`nav-item ${activeTab === "videos" ? "active" : ""}`}>
                <a className={`nav-link ${activeTab === "videos" ? "active" : ""}`}
                   href="#"
                   onClick={() => setActiveTab("videos")}>
                  Videos
                </a>
              </li>
            </ul>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === "folder-content" && (
              <div className="tab-pane fade show active p-4">
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

                {/* Folder grid + context menu */}
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
                  {currentItems.map((item) => (
                    <FolderCard
                      key={item.id}
                      item={item}
                      onRightClick={handleRightClick}
                      onSelect={handleSelectItem}
                      isSelected={selectedItems.some((i) => i.id === item.id)}
                      onDrop={handleDrop}
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

                    </ul>
                  )}
                </div>
              </div>
            )}

            {activeTab === "videos" && (
              <div className="tab-pane fade show active p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-10"
                
                >
                  {topLevelItems
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

                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        <MoveFileFolderModal
          isOpen={showMoveModal}
          onClose={() => setShowMoveModal(false)}
          onMove={handleMove}
          folders={folders}
          item={itemToMove}
        />
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
      </section>


    </div>
  );
}
 
export default Home;
