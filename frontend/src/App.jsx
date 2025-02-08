import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import Scrollbar from "react-scrollbars-custom";
import viteLogo from "/vite.svg";
import { FiSend } from "react-icons/fi";
import "./App.css";

const Header = () => {};

const SignupComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    setError(""); // Clear errors if validation passes
    console.log("Logging in with:", { email, password });

    // Simulate login logic (replace with API call)
    alert("Login successful!");
  };

  return (
    <div className="login-container">
      <h2 style={{ color: "black" }}>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            style={{
              width: "200px",
              backgroundColor: "white",
              color: "black",
              borderRadius: "5px",
              border: "2px solid transparent",
              outline: "none",
            }}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <input
            style={{
              width: "200px",
              backgroundColor: "white",
              color: "black",
              borderRadius: "5px",
              border: "2px solid transparent",
              outline: "none",
              marginTop: 10,
            }}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ marginTop: 20, width: "160px" }}>
          Signup
        </button>
      </form>
    </div>
  );
};
const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    setError(""); // Clear errors if validation passes
    console.log("Logging in with:", { email, password });

    // Simulate login logic (replace with API call)
    alert("Login successful!");
  };

  return (
    <div className="login-container">
      <h2 style={{ color: "black" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            style={{
              width: "200px",
              backgroundColor: "white",
              color: "black",
              borderRadius: "5px",
              border: "2px solid transparent",
              outline: "none",
            }}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <input
            style={{
              width: "200px",
              backgroundColor: "white",
              color: "black",
              borderRadius: "5px",
              border: "2px solid transparent",
              outline: "none",
              marginTop: 10,
            }}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ marginTop: 20, width: "160px" }}>
          Login
        </button>
      </form>

      <p style={{ marginTop: 15, color: "black" }}>
        Don't have an account yet?{" "}
        <a
          href="/static/register" // Replace with your actual registration page path
          style={{
            color: "black",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Register here
        </a>
      </p>
    </div>
  );
};

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null); // Simulate logged-in user
  const chatBoxRef = useState(null);
  const handleSendMessage = async (message) => {
    if (message.trim() === "") return;

    try {
      // Send the message to Django backend
      const response = await fetch("http://127.0.0.1:8000/chatbot/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        const data = await response.json();
        fetchAllChat();
        // Add AI's response to chat
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
      const response = await fetch("http:/127.0.0.1:8000/allchat/");
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
      {/* Message input */}
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
            cursor: "pointer", // To indicate it can be clicked
            color: user ? "#4CAF50" : "#ccc", // Green if logged in, grey if not
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
      <Router>
        <Routes>
          <Route path="/static/" element={<ChatWindow />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
