import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { TbX, TbXboxX } from "react-icons/tb";
import { useSession } from "../../components/sessionProvider/SessionProvider";
import { chatbot, allchat, clearchat } from "../../api/apiService";


const ChatWindow = () => {
  const {session, updateSession}= useSession();
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useState(null);
  const [user, setUser] = useState(null);

  const handleSendMessage = async (message) => {
    if (message.trim() === "") return;

    try {
      if (!session.email) {
        alert("Please sign in to chat");
        return;
      }
      await chatbot({"message": message, "mail": session.email});
      fetchAllChat();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClear = async () => {
    try {
      await clearchat();
      fetchAllChat();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const fetchAllChat = async () => {
    try {
      const response = await allchat();
      setMessages(
          response.allchat.map((msg) => ({
            mail: msg.mail,
            sender: msg.role,
            text: msg.content,
          }))
        );
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    fetchAllChat();
  }, []);
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="chat-window">
      <button onClick={handleClear}> Clear Chat</button>
      <div className="chatbox" ref={chatBoxRef}>
      {messages?.map((message, index) => (
        <div key={index}>
            <strong>{message.sender}:</strong> <span dangerouslySetInnerHTML={{ __html: message.text }} />
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

export default ChatWindow;
