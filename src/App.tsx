
import './App.css';
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  

  const sendMessage = async () => {
  if (!message.trim()) return;

  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'deepseek-r1:1.5b',
      prompt: message,
      stream: false,
    }),
  });

  const data = await response.json();

  console.log('AI response:', data.response);
};


  return (
    <div className="app">
      <header className="header">
        <img src="/favicon.svg" alt="NYRA Logo" className="logo" />
        <span>Your AI Assistant</span>
      </header>

      <main className="chat-container">
        <div className="welcome">
          <h2>Hello! I'm NYRA 👋</h2>
          <p>How can I help you today?</p>
        </div>
      </main>

      <footer className="chat-footer">
        <input
          type="text"
          placeholder="Message NYRA..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </footer>
    </div>
  );
}

export default App;