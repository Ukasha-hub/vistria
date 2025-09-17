import React from 'react'
import { useNavigate } from 'react-router-dom';

const FolderCard = ({ item, onRightClick, onSelect, isSelected, onDrop }) => {
  const navigate = useNavigate();

  const handleDoubleClick = () => {
    if (item.folderORfile === 'file') {
      navigate(`/metadata/${item.id}`);
    } else {
      navigate(`/folderitem/${item.id}`);
    }
  };

  return (
    <>
    <div   draggable
  onDragStart={(e) => {e.dataTransfer.setData("application/json", JSON.stringify(item)); console.log("Dragging:", item);}}
  
  onDragOver={(e) => e.preventDefault()}
  onDrop={(e) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData("application/json"));
    if (onDrop) onDrop(draggedItem, item); // call passed handler
    console.log("Dropped on:", item);
  }}>
    <div className='relative'>
      {/* Selection checkbox */}
      <input
        type="checkbox"
        className="absolute top-2 left-2 z-10 w-4 h-4"
        checked={isSelected}
        onChange={() => onSelect(item)}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Folder/file card */}
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          onRightClick(e, item);
        }}
        onClick={() => onSelect(item)} // single click for selecting
        onDoubleClick={handleDoubleClick} // double click to go inside
        className="max-w-xs rounded-md shadow-md border relative cursor-pointer"
      >
        <img src={item.image} alt="" className="object-cover object-center w-full rounded-t-md h-30" />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2">
            <p className="text-sm dark:text-gray-800">{item.title}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
    
    </>
  )
}

export default FolderCard;
