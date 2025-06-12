import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase.js';
import dayjs from 'dayjs';

export default function CalendarView() {
  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const col = collection(db, 'mentalEntries');
    const unsub = onSnapshot(col, (snap) => {
      setEntries(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const tileContent = ({ date }) => {
    const found = entries.find((e) => dayjs(e.date.toDate()).isSame(date, 'day'));
    return found ? <span className="text-red-500">●</span> : null;
  };

  const handleClick = (date) => {
    const found = entries.find((e) => dayjs(e.date.toDate()).isSame(date, 'day'));
    setSelected(found || null);
  };

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-2">Diary Calendar</h2>
      <Calendar tileContent={tileContent} onClickDay={handleClick} />
      {selected && (
        <div className="mt-2 p-2 border bg-white dark:bg-gray-800">
          <div>Focus: {selected.focus}</div>
          <div>Anxiety: {selected.anxiety}</div>
          <div>Mood: {selected.mood}</div>
          <div>Sleep: {selected.sleep}</div>
          <div>{selected.comment}</div>
        </div>
      )}
    </div>
  );
}
