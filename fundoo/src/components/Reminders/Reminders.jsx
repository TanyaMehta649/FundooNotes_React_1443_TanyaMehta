import React, { useEffect, useState } from "react";
import NoteCard from "../NoteCard/NoteCard";
import {setReminderApiNotes } from "../../utils/Api";
import styles from "./Reminders.module.scss";
import { useOutletContext } from "react-router-dom";

export default function ReminderContainer() {
  const [reminderNotesList, setReminderNotesList] = useState([]);
  const {isSidebarOpen } = useOutletContext();

  useEffect(() => {
    setReminderApiNotes().then((res) => {
      const filteredNotes = res?.data?.data?.filter((note) => note.reminder);
      setReminderNotesList(filteredNotes || []);
    });
  }, []);
  

  const handleNotesList = (receivedData) => {
    console.log("receivedData", receivedData);
    const { action, data } = receivedData;

    if (action === "reminderRemove") {
      setReminderNotesList((prevNotes) =>
        prevNotes.filter((note) => note.id !== data.id)
      );
    }
  };

  return (
    <div className={`${styles.notesContainer} ${isSidebarOpen ? styles.expanded : styles.collapsed}`}>
      <div className={styles.notesGrid}>
        {reminderNotesList.map((note) => (
          <NoteCard key={note.id} noteDetails={note} updateList={handleNotesList} />
        ))}
      </div>
    </div>
  );
}