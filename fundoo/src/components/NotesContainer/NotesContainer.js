import React, { useEffect, useState } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { getNotesApiCall } from "../../utils/Api";
import AddNotes from "../AddNotes/AddNotes";
import styles from "./NotesContainer.module.scss";
import { useOutletContext } from "react-router-dom";
import { Box } from "@mui/material";
import Masonry from "@mui/lab/Masonry";

export default function NotesContainer() {[]
  const [notesList, setNotesList] = useState([]);

  const { searchQuery, isSidebarOpen, isListView } = useOutletContext() || {};


  useEffect(() => {
    getNotesApiCall().then((res) => {
      console.log("API Response:------------>", res);
      const filteredNotes = res?.data?.data?.filter(
        (note) => !note.isArchived && !note.isDeleted
      );
      setNotesList(filteredNotes || []);
    });
  }, []);

  const handleNotesList = (response) => {
    console.log("response", response);
    let { action, data } = response;

    if (action === "add") {
      setNotesList((prevNotes) => [data, ...prevNotes]);
    }
    if (action === "archive" || action === "deleteForever") {
      setNotesList((notesList) => notesList.filter((note) => note.id !== data.id));
    }
    if (action === "unarchive" || action === "restore") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) =>
          note.id === data.id ? { ...note, isArchived: false, isDeleted: false } : note
        )
      );
    }
    if (action === "delete") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) =>
          note.id === data.id ? { ...note, isDeleted: true } : note
        )
      );
    }
    if (action === "edit" || action === "colorChange") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) => (note.id === data.id ? { ...note, ...data } : note))
      );
    }
  };

  const filteredNotes = notesList.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      className={`${styles.notesContainer} ${isSidebarOpen ? styles.expanded : styles.collapsed}`}
    >
      <div className="add-notes">
        <AddNotes updateList={handleNotesList} />
      </div>
      {isListView ? (
        <div
          className="list-view"
          style={{ width: "50rem", marginLeft: isSidebarOpen ? "200px" : "50px", marginTop: "50px", gap: "5rem" }}
        >
          {filteredNotes.map((note) => (
            <div key={note.id} className="list-item">
              <NoteCard noteDetails={note} updateList={handleNotesList} container="notes" />
            </div>
          ))}
        </div>
      ) : (
        <Masonry
          columns={{ xs: 1, sm: isSidebarOpen ? 1 : 2, md: isSidebarOpen ? 3 : 4 }}
          spacing={2}
          className="masonry-grid"
          style={{ width: "80%", marginLeft: isSidebarOpen ? "100px" : "50px", marginTop: "50px" }}
        >
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} noteDetails={note} updateList={handleNotesList} />
          ))}
        </Masonry>
      )}
    </Box>
  );
}