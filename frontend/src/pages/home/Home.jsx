import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { TbX, TbXboxX } from "react-icons/tb";

const Header = () => {};

const ClearChat = () => {
  return (
    <div className="tooltip-container">
      <TbXboxX size={25} style={{ cursor: "pointer" }} />
      <span className="tooltip">Clear Chat</span>
    </div>
  );
};

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useState(null);
  const [user, setUser] = useState(null);
  const handleSendMessage = async (message) => {
    if (message.trim() === "") return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chatbot/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages([...messages, { sender: "user", text: message }]);
        fetchAllChat();
      } else {
        console.error("Failed to fetch AI response.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //timestamp
  //content
  //role - assistant or user if you have anything else you ignore it

  const fetchAllChat = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/allchat/");
      if (response.ok) {
        const data = await response.json();
        setMessages(
          data.map((msg) => ({
            sender: msg.role,
            text: msg.content,
          }))
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="chat-window">
      <div className="chatbox" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          style={{
            width: "1000px",
            height: "40px",
            backgroundColor: "white",
            color: "black",
            borderRadius: "10px",
            border: "2px solid black",
            marginBottom: "20px",
            marginLeft: "-5%",
          }}
          type="text"
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage(e.target.value);
              e.target.value = "";
            }
          }}
        />
        <FiSend
          size={20}
          onClick={() => {
            const input = document.querySelector('input[type="text"]');
            if (input) {
              handleSendMessage(input.value);
              input.value = "";
            }
          }}
          style={{
            marginBottom: "-7px",
            marginRight: "-2%",
            cursor: "pointer",
            color: user ? "#4CAF50" : "#ccc",
            marginLeft: "10px",
          }}
        />
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      {/* <Router>
        <Routes>
          <Route path="/static/" element={<ChatWindow />} />
        </Routes>
      </Router> */}
    </>
  );
}

export default App;
