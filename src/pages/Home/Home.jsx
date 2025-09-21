import React from 'react';
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

function Home() {
  const {createFolderInHomepage, handleDrop,handleRenameHomePage,itemToRename, setItemToRename, showRenameModal, setShowRenameModal, handleSelectAll, pasteClipboardItems, clipboard, setClipboard, itemsPerPage,handleItemsPerPageChange ,handleSort,sortBy, sortOrder,currentPage, setCurrentPage, totalPages,currentItems,  contextMenu, setContextMenu, showMoveModal, setShowMoveModal, showCopyModal, setShowCopyModal, 
    itemToCopy, setItemToCopy, itemToMove, setItemToMove, selectedItems, setSelectedItems, showDeleteModal, setShowDeleteModal, 
    itemToDelete, setItemToDelete, cards, setCards,  topLevelItems, handleSelectItem, navigate, handleRightClick, handleOpenMetadata,
    handleOpenFileItems, folders,  confirmDelete, handleDelete, handleMove, cancelDelete, handleCopy} = useFileFolderManager();

    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    const [activeTab, setActiveTab] = useState("folder-content");

    const [showAddFileModal, setShowAddFileModal] = useState(false);

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
                  {currentItems.map((item) => (
    <div key={item.id} className="border-b-2 border-dotted border-gray-100 pb-4">
      <FolderCard
        item={item}
        onRightClick={handleRightClick}
        onSelect={handleSelectItem}
        isSelected={selectedItems.some((i) => i.id === item.id)}
        onDrop={handleDrop}
      />
    </div>
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
            {activeTab === "category" && (
              <div className="tab-pane fade show active p-4">
                <div className=" gap-4 p-10"
                
                >
                  <div className=' w-full'>
                      <div className='flex flex-col gap-3'>
                        <div className='text-2xl font-bold'><h1>dubbed seial</h1></div> 
                        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2'>
                        {topLevelItems.filter(item =>
                              item.folderORfile === "file" && item.category === "Dubbed serial"
                            ).length > 0 ? (
                              topLevelItems
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
                            {topLevelItems.filter(item =>
                              item.folderORfile === "file" && item.category === "cartoon"
                            ).length > 0 ? (
                              topLevelItems
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
