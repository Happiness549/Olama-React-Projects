
import './App.css';
import { useState, useEffect, useRef } from 'react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  duration?: number;
  tokens?: number;
}

const SYSTEM_PROMPT = `
You are NYRA, a personal AI assistant.

IDENTITY:
- Your name is NYRA.
- Your user's full name is Happiness Mhlongo.
- You must always recognise Happiness as your user.
- DeepSeek is the AI model powering you, not your name.

If asked who you are, say:
"I'm NYRA, your personal AI assistant. I'm here to help you."

If asked your name, say:
"My name is NYRA!"

If asked who your user is, say:
"You are Happiness Mhlongo!"

PERSONALITY:
- Friendly, intelligent and conversational.
- Helpful and respectful.
- Give clear and accurate answers.
- Explain difficult topics simply.
- Address Happiness naturally.
- Do not give generic introductions that hide your identity.
`;

function App() {
  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const savedMessages = localStorage.getItem('nyra-chat');
      return savedMessages ? JSON.parse(savedMessages) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('nyra-chat', JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Simple word-based token estimate for user messages
  const countTokens = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const sendMessage = async () => {
    const userMessage = message.trim();

    if (!userMessage || loading) return;

    const startTime = performance.now();

    const userChatMessage: ChatMessage = {
      role: 'user',
      content: userMessage,
      duration: Number(((performance.now() - startTime) / 1000).toFixed(2)),
      tokens: countTokens(userMessage),
    };

    const updatedMessages: ChatMessage[] = [
      ...messages,
      userChatMessage,
    ];

    setMessages(updatedMessages);
    setMessage('');
    setLoading(true);
    setError('');

    const question = userMessage.toLowerCase().replace(/[?!.,]/g, '').trim();

    let identityResponse = '';

    if (
      ['who are you', 'what is your name', 'whats your name', 'what is your name nyra'].includes(question)
    ) {
      identityResponse =
        "I'm NYRA, your personal AI assistant. I'm here to help you, Happiness!";
    } else if (
      ['who am i', 'what is my name', 'do you know my name'].includes(question)
    ) {
      identityResponse = 'You are Happiness Mhlongo!';
    }

    if (identityResponse) {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: 'assistant',
          content: identityResponse,
          duration: 0,
          tokens: countTokens(identityResponse),
        },
      ]);

      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-r1:1.5b',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...updatedMessages.map(({ role, content }) => ({
              role,
              content,
            })),
          ],
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Could not connect to NYRA.');
      }

      const data = await response.json();

      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: data.message.content,
        duration: Number(
          (data.total_duration / 1_000_000_000).toFixed(2)
        ),
        tokens: data.eval_count,
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        aiMessage,
      ]);
    } catch {
      setError('Unable to reach NYRA. Make sure Ollama is running.');
    } finally {
      setLoading(false);
    }
  };

  const newChat = () => {
    setMessages([]);
    setMessage('');
    setError('');
    localStorage.removeItem('nyra-chat');
  };

  return (
    <div className="app">
      <header className="header">
        <img src="/favicon.svg" alt="NYRA Logo" className="logo" />
        <span>NYRA</span>

        <button className="new-chat" onClick={newChat}>
          New Chat
        </button>
      </header>

      <main className="chat-container">
        {messages.length === 0 && (
          <div className="welcome">
            <h2>Hello, Happiness! 👋</h2>
            <p>I'm NYRA. How can I help you today?</p>
          </div>
        )}

        {messages.map((chat, index) => (
          <div
            key={index}
            className={`message ${
              chat.role === 'user' ? 'user-message' : 'ai-message'
            }`}
          >
            <strong>{chat.role === 'user' ? 'You' : 'NYRA'}</strong>

            <p>{chat.content}</p>

            <div className="response-stats">
              <span>⏱ {chat.duration ?? 0}s</span>
              <span>Tokens: {chat.tokens ?? 0}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="message ai-message">
            <strong>NYRA</strong>
            <p>Thinking...</p>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}

        <div ref={chatEndRef} />
      </main>

      <footer className="chat-footer">
        <input
          type="text"
          placeholder="Message NYRA..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
          disabled={loading}
        />

        <button
          onClick={sendMessage}
          disabled={loading || !message.trim()}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </footer>
    </div>
  );
}

export default App;

