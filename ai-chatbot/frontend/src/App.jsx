import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;
  }
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

  return (
    <div className="app">
      <h1>ChatGPT Clone</h1>

      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <strong>{message.role === "user" ? "You" : "Bot"}:</strong>{" "}
            {message.content}
          </div>
        ))}
      </div>

      <div className="input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;