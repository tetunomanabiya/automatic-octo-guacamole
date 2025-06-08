import React, { useState } from 'react';

export default function HormoneCycle() {
  const [gender, setGender] = useState('male');
  const [cycle, setCycle] = useState('');

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-2">Hormone Cycle</h2>
      <div className="space-x-4 mb-2">
        <label>
          <input
            type="radio"
            value="male"
            checked={gender === 'male'}
            onChange={(e) => setGender(e.target.value)}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            value="female"
            checked={gender === 'female'}
            onChange={(e) => setGender(e.target.value)}
          />
          Female
        </label>
      </div>
      {gender === 'female' && (
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Enter cycle info"
          value={cycle}
          onChange={(e) => setCycle(e.target.value)}
        />
      )}
    </div>
  );
}
