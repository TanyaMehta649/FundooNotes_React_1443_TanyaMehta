import React, { useEffect, useState } from 'react';
import NoteCard from '../NoteCard/NoteCard';
import { getArchiveNotesApiCall } from '../../utils/Api';
import styles from './ArchiveContainer.module.scss';


export default function ArchiveContainer() {
  const [archivedNotesList, setArchivedNotesList] = useState([]);

  useEffect(() => {
    getArchiveNotesApiCall().then((res) => {
      setArchivedNotesList(res.data.data);
    });
  }, []);

  const handleNotesList = (revicedata) => {
    const { action, data } = revicedata;
    if (action === 'unarchive' || action === 'delete') {
      const newUpdatedList = archivedNotesList.filter((note) => note.id !== data.id);
      setArchivedNotesList(newUpdatedList);
    }
  };
  return (
    <div className={styles.notesContainer} >
    <div className={styles.notesGrid}>
      {archivedNotesList.map((note) => (
        <NoteCard key={note.id} noteDetails={note} updateList={handleNotesList} />
      ))}
    </div>
    </div>
  )
}
