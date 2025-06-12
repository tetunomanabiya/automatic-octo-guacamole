import React, { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase.js';
import { sendChatMessage } from '../api/chat.js';

export default function AiChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;
    const userMsg = { role: 'user', content: input };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    const res = await sendChatMessage(input);
    const botMsg = { role: 'assistant', content: res.reply };
    setMessages((m) => [...m, botMsg]);
    await addDoc(collection(db, 'userChats'), {
      messages: [userMsg, botMsg],
      createdAt: Timestamp.now(),
    });
  };

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-2">AI Mental Coach</h2>
      <div className="border p-2 h-40 overflow-y-auto mb-2 bg-white dark:bg-gray-800">
        {messages.map((m, i) => (
          <div key={i} className="mb-1">
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          className="border flex-1 p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button className="px-4 py-2 bg-green-500 text-white rounded" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
