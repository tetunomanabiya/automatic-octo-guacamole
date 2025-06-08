import React, { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from '../lib/auth.js';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(setUser);
    return unsub;
  }, []);

  return (
    <header className="mb-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">MentalPrep</h1>
      {user ? (
        <div className="flex items-center space-x-2">
          <span>{user.email}</span>
          <button
            onClick={signOut}
            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <span>Not logged in</span>
      )}
    </header>
  );
}
