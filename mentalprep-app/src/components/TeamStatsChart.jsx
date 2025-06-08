import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import dayjs from 'dayjs';

export default function TeamStatsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const col = collection(db, 'mentalEntries');
    const unsub = onSnapshot(col, (snap) => {
      const grouped = {};
      snap.docs.forEach((doc) => {
        const d = doc.data();
        const date = dayjs(d.date).format('YYYY-MM-DD');
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(d.satisfaction);
      });
      const res = Object.entries(grouped).map(([date, arr]) => ({
        date,
        satisfaction: arr.reduce((a, b) => a + b, 0) / arr.length,
      }));
      setData(res);
    });
    return unsub;
  }, []);

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-2">Team Satisfaction</h2>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, 5]} />
        <Tooltip />
        <Line type="monotone" dataKey="satisfaction" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
