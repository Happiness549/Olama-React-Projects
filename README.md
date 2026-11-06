
# NYRA AI Chat 

**Your Intelligent AI Companion**

NYRA is a simple AI-powered chatbot built with React and Ollama. It allows users to interact with a locally running AI language model through a clean and user-friendly chat interface.

The project explores how to integrate locally hosted AI models into a React application using the Ollama API.

##  Features

- AI-powered conversations using Ollama.
- Clean and responsive chat interface.
- User and AI message display.
- Loading indicator while the AI generates responses.
- Response generation duration.
- Tokens-per-second performance display.
- Custom AI personality using a system message.
- Conversation history saved in LocalStorage.
- Chat history restored after refreshing the page.

##  Technologies

- React
- TypeScript
- Ollama
- CSS
- LocalStorage

##  AI Model

This project uses a locally installed Ollama language model.

The selected model will be documented here once installed.

##  Getting Started

### 1. Install Ollama

Download and install Ollama for Windows:

https://ollama.com/download/windows

### 2. Download an AI Model

Open your terminal and run the appropriate Ollama pull command.

Example:

```bash
ollama pull gemma:2b
```

### 3. Verify Installation

```bash
ollama list
```

### 4. Start Ollama

Ensure Ollama is running locally.

### 5. Run the React Application

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate into the project:

```bash
cd nyra-ai-chat
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## 🔌 Ollama API

NYRA communicates with Ollama through its local API:

```text
http://localhost:11434/api/generate
```

The application sends prompts to the selected model and displays the generated responses.

##  Data Persistence

NYRA uses browser LocalStorage to save conversation history, allowing users to continue viewing previous messages after refreshing the application.

## Project Goals

- Understand how locally hosted AI models work.
- Integrate an AI API into a React application.
- Build an interactive chatbot interface.
- Learn how to customize AI behaviour using system messages.
- Work with browser LocalStorage.
- Display AI response performance metrics.

##  Developer

**Happiness Mhlongo**

Full-Stack Developer

---

*Built with curiosity, creativity and a passion for technology.*