import React, { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase.js';

export default function MentalDiary() {
  const [form, setForm] = useState({
    focus: '',
    anxiety: '',
    mood: '',
    sleep: '',
    comment: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'mentalEntries'), {
      ...form,
      date: Timestamp.now(),
      satisfaction: Number(form.mood || 0),
    });
    setForm({ focus: '', anxiety: '', mood: '', sleep: '', comment: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="my-6 space-y-2">
      <h2 className="text-xl font-semibold">Mental Diary</h2>
      {['focus', 'anxiety', 'mood', 'sleep', 'comment'].map((field) => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder={field}
        />
      ))}
      <button className="px-4 py-2 bg-blue-500 text-white rounded" type="submit">
        Save
      </button>
    </form>
  );
}
