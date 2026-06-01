import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");

    try {
      const response = await axios.post("http://localhost:5001/chat", {
        messages: updatedMessages,
      });

      const botMessage = {
        role: "assistant",
        content: response.data.reply,
      };

      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "Error: backend request failed." },
      ]);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>ChatGPT Clone</h1>
      </header>

      <main className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message-row ${message.role}`}>
            <div className="message-bubble">
              {message.content}
            </div>
          </div>
        ))}
      </main>

      <footer className="input-area">
        <div className="input-wrapper">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message ChatGPT Clone"
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </footer>
    </div>
  );
}

export default App;