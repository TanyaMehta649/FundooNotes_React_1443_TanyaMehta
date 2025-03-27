import React, { useEffect, useState } from 'react';
import NoteCard from '../NoteCard/NoteCard';
import { getTrashNotesApiCall } from '../../utils/Api';
import styles from './TrashContainer.module.scss';

export default function TrashContainer() {
  const [trashedNotesList, setTrashedNotesList] = useState([]);

  useEffect(() => {
    getTrashNotesApiCall().then((res) => {
      setTrashedNotesList(res.data.data);
    });
  }, []);

  const handleNotesList = (revicedata) => {
    console.log("revicedata",revicedata)
    const { action, data } = revicedata;
    if (action === 'restore' || action === 'delete') {
      const newUpdatedList = trashedNotesList.filter((note) => note.id !== data.id);
      setTrashedNotesList(newUpdatedList);
    }
  };

  return (
    <div className={styles.notesContainer}>
      <div className={styles.notesGrid}>
        {trashedNotesList.map((note) => (
          <NoteCard key={note.id} noteDetails={note} updateList={handleNotesList} />
        ))}
      </div>
    </div>
  );
}