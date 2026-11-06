import './App.css';
import { useState } from 'react';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>NYRA</h1>
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
        />
        <button>Send</button>
      </footer>
    </div>
  );
}

export default App;