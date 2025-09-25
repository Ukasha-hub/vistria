import React, { useContext, useEffect } from 'react';
import FolderCard from '../../components/FolderCard'


import MoveFileFolderModal from '../../components/Modal/MoveFileFolderModal'

import DeleteFileFolderModal from '../../components/Modal/DeleteFileFolderModal'
import useFileFolderManager from '../../hooks/useFileFolderManager'
import { Link, useLocation } from 'react-router-dom'



import RenameFolderModal from '../../components/Modal/RenameFolderModal'
import { useState } from 'react'
import TopbarInsideTabs from '../../components/TopbarInsideTabs'
import Breadcrumb from '../../components/Breadcrumb';
import Tabs from '../../components/Tabs';
import PageHeader from '../../components/PageHeader';
import AddFileModal from '../../components/Modal/AddFileModal';
import ContextMenu from '../../components/ContextMenu';
import axios from 'axios';
import FileCard from '../../components/FileCard';
import MainLayout from '../../layouts/MainLayout';
import { SearchContext } from '../../context/SearchContext';

function Home() {
  const {createFolderInHomepage, handleDrop,handleRenameHomePage,itemToRename, setItemToRename, showRenameModal, setShowRenameModal, handleSelectAll, pasteClipboardItems, clipboard, setClipboard, itemsPerPage,handleItemsPerPageChange ,handleSort,sortBy, sortOrder,currentPage, setCurrentPage, totalPages,currentItems,  contextMenu, setContextMenu, showMoveModal, setShowMoveModal, showCopyModal, setShowCopyModal, 
    itemToCopy, setItemToCopy, itemToMove, setItemToMove, selectedItems, setSelectedItems, showDeleteModal, setShowDeleteModal, 
    itemToDelete, setItemToDelete, cards, setCards,  topLevelItems, handleSelectItem, navigate, handleRightClick, handleOpenMetadata,
    handleOpenFileItems, folders, activeTab, setActiveTab,  confirmDelete, handleDelete, handleMove, cancelDelete, handleCopy, } = useFileFolderManager();

    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    

    const [showAddFileModal, setShowAddFileModal] = useState(false);

    const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { searchResults } = useContext(SearchContext);
  

  
  useEffect(() => {
    // Replace with your API endpoint
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://172.16.9.98:8000/api/v1/videos");
        setVideos(response.data.videos); // assuming response.data has the same structure
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to fetch videos");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);
  
  useEffect(() => {
    if (searchResults.length > 0) {
      setVideos(searchResults);
    } else {
      // If search results are empty, re-fetch the initial list or handle it as needed
      // For now, let's keep the current videos state, so the list doesn't get cleared
      // unless the user initiates a new search
    }
  }, [searchResults]);

   

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>{error}</p>;
  return (
    
      <div>
     {/* Page Header */}
     <PageHeader></PageHeader>

      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* Tabs */}
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

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
                  showAddFileModal={showAddFileModal}
                  onOpenAddFileModal={() => setShowAddFileModal(true)}
                  onCloseAddFileModal={() => setShowAddFileModal(false)}
                />
                {showAddFileModal && (
                  <AddFileModal onClose={() => setShowAddFileModal(false)} />
                )}

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
                  {videos.map((item) => (
    <div key={item.asset_id} className="border-b-2 border-dotted border-gray-300 pb-4">
      <FileCard
        item={item}
        onRightClick={handleRightClick}
        onSelect={handleSelectItem}
        isSelected={selectedItems.some((i) => i.asset_id === item.asset_id)}
        onDrop={handleDrop}
      />
    </div>
  ))}
   {/*currentItems.map((item) => (
    <div key={item.id} className="border-b-2 border-dotted border-gray-300 pb-4">
      <FolderCard
        item={item}
        onRightClick={handleRightClick}
        onSelect={handleSelectItem}
        isSelected={selectedItems.some((i) => i.id === item.id)}
        onDrop={handleDrop}
      />
    </div>
  ))*/}

                  {/* Context Menu */}
                  <ContextMenu
  contextMenu={contextMenu}
  clipboard={clipboard}
  selectedItems={selectedItems}
  onCreateFolder={createFolderInHomepage}
  onPaste={() => pasteClipboardItems(null)}
  onOpenFileItems={handleOpenFileItems}
  onOpenMetadata={handleOpenMetadata}
  setItemToMove={setItemToMove}
  setShowMoveModal={setShowMoveModal}
  setItemToCopy={setItemToCopy}
  setClipboard={setClipboard}
  setContextMenu={setContextMenu}
  setItemToRename={setItemToRename}
  setShowRenameModal={setShowRenameModal}
  confirmDelete={confirmDelete}
/>

                </div>
              </div>
            )}

            {activeTab === "videos" && (
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
                  showAddFileModal={showAddFileModal}
                  onOpenAddFileModal={() => setShowAddFileModal(true)}
                  onCloseAddFileModal={() => setShowAddFileModal(false)}
                />
                {showAddFileModal && (
                  <AddFileModal onClose={() => setShowAddFileModal(false)} />
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-10"
                
                >
                  
                  {currentItems
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
                     <ContextMenu
  contextMenu={contextMenu}
  clipboard={clipboard}
  selectedItems={selectedItems}
  onCreateFolder={createFolderInHomepage}
  onPaste={() => pasteClipboardItems(null)}
  onOpenFileItems={handleOpenFileItems}
  onOpenMetadata={handleOpenMetadata}
  setItemToMove={setItemToMove}
  setShowMoveModal={setShowMoveModal}
  setItemToCopy={setItemToCopy}
  setClipboard={setClipboard}
  setContextMenu={setContextMenu}
  setItemToRename={setItemToRename}
  setShowRenameModal={setShowRenameModal}
  confirmDelete={confirmDelete}
/>

                </div>
              </div>
            )}
            {activeTab === "category" && (
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
                  showAddFileModal={showAddFileModal}
                  onOpenAddFileModal={() => setShowAddFileModal(true)}
                  onCloseAddFileModal={() => setShowAddFileModal(false)}
                />
                {showAddFileModal && (
                  <AddFileModal onClose={() => setShowAddFileModal(false)} />
                )}
                <div className=" gap-4 p-10"
                
                >
                  <div className=' w-full'>
                      <div className='flex flex-col gap-3'>
                        <div className='text-2xl font-bold'><h1>dubbed seial</h1></div> 
                        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2'>
                        {currentItems.filter(item =>
                              item.folderORfile === "file" && item.category === "Dubbed serial"
                            ).length > 0 ? (
                              currentItems
                                .filter(item => item.folderORfile === "file" && item.category === "Dubbed serial")
                                .map(item => (
                                  <FolderCard
                                    key={item.id}
                                    item={item}
                                    onRightClick={handleRightClick}
                                    onSelect={handleSelectItem}
                                    isSelected={selectedItems.some(i => i.id === item.id)}
                                  />
                                ))
                            ) : (
                              <p className="text-gray-400 italic">No files in this category</p>
                            )}
                        </div>
                    </div> 
                      <div className='flex flex-col mt-3'>
                          <div className='text-2xl font-bold'><h1>Cartoon</h1></div> 
                          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2'>
                            {currentItems.filter(item =>
                              item.folderORfile === "file" && item.category === "cartoon"
                            ).length > 0 ? (
                              currentItems
                                .filter(item => item.folderORfile === "file" && item.category === "cartoon")
                                .map(item => (
                                  <FolderCard
                                    key={item.id}
                                    item={item}
                                    onRightClick={handleRightClick}
                                    onSelect={handleSelectItem}
                                    isSelected={selectedItems.some(i => i.id === item.id)}
                                  />
                                ))
                            ) : (
                              <p className="text-gray-400 italic">No files in this category</p>
                            )}
                          </div>
                        </div>
                    
                 </div>
                     {/* Context Menu */}
                     <ContextMenu
  contextMenu={contextMenu}
  clipboard={clipboard}
  selectedItems={selectedItems}
  onCreateFolder={createFolderInHomepage}
  onPaste={() => pasteClipboardItems(null)}
  onOpenFileItems={handleOpenFileItems}
  onOpenMetadata={handleOpenMetadata}
  setItemToMove={setItemToMove}
  setShowMoveModal={setShowMoveModal}
  setItemToCopy={setItemToCopy}
  setClipboard={setClipboard}
  setContextMenu={setContextMenu}
  setItemToRename={setItemToRename}
  setShowRenameModal={setShowRenameModal}
  confirmDelete={confirmDelete}
/>

                </div>
              </div>
            )

            }
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