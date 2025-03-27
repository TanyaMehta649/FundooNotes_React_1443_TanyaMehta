import React, { useState } from "react";
import { addNoteApiCall, editNotesApiCall } from "../../utils/Api";
import "./AddNotes.scss";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import PersonAddIcon from "@mui/icons-material/PersonAdd"; 
import PaletteIcon from "@mui/icons-material/Palette"; 
import ImageIcon from "@mui/icons-material/Image"; 
import ArchiveIcon from "@mui/icons-material/Archive"; 
import MoreVertIcon from "@mui/icons-material/MoreVert"; 
import DeleteIcon from "@mui/icons-material/Delete"; 
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined"; 
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined"; 
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import UndoIcon from "@mui/icons-material/Undo"; 
import RedoIcon from "@mui/icons-material/Redo"; 

export default function AddNotes({ updateList, expanded = false, noteDetails = null }) {
  const [title, setTitle] = useState(noteDetails ? noteDetails.title : "");
  const [description, setDescription] = useState(noteDetails ? noteDetails.description : "");
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAddNote = () => {
    if (isExpanded && (title || description)) {
      if (!noteDetails) {
  
        addNoteApiCall({ title, description })
          .then((response) => {
            updateList({ data: response.status.details, action: "add" });
            setTitle("");
            setDescription("");
          })
          .catch((error) => console.log("Add Note Error:", error));
      } else {
        console.log("noteDetails",noteDetails)
        
        const editNotePayload = {
          ...noteDetails,
          title,
          description,
          noteId: noteDetails?.id
        }
        editNotesApiCall(editNotePayload)
          .then(() =>
            updateList({ ...noteDetails, title, description }, "edit")
          )
          .catch((error) => console.log("Edit Note Error:", error));
      }
    }
    setIsExpanded(!isExpanded);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="add-note-container">
      {isExpanded ? (
        <div className="expanded-note-box">
          <div className="note-header">
            <input
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <textarea
            value={description}
            placeholder="Take a note..."
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="note-icons-close">
            <div className="note-icons">
              <AddAlertIcon className="icon" fontSize="small"/>
              <PersonAddIcon className="icon" fontSize="small" />
              <PaletteIcon className="icon" fontSize="small"/>
              <ImageIcon className="icon" fontSize="small"/>
              <ArchiveIcon className="icon" fontSize="small"/>
            
              <DeleteIcon className="icon" fontSize="small"/>
              <MoreVertIcon className="icon" onClick={handleMenuClick} />
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                <MenuItem onClick={handleMenuClose}>Make a Copy</MenuItem>
                <MenuItem onClick={handleMenuClose}>Labels</MenuItem>
              </Menu>

              <UndoIcon className="icon" />
              <RedoIcon className="icon" />

            </div>
            <button className="close-button" onClick={handleAddNote}>
              Close
            </button>
          </div>
        </div>
      ) : (
        <div className="note-box" onClick={() => setIsExpanded(true)}>
          <span>Take a note...</span>
          <div className="take-note-icons">
          <IconButton>
          <CheckBoxOutlinedIcon />
        
      </IconButton>
      <IconButton>
      <BrushOutlinedIcon />
      </IconButton>
      <IconButton>
      <ImageOutlinedIcon />
      </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}