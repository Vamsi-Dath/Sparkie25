import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { TbX, TbXboxX } from "react-icons/tb";
import { useSession } from "../../components/sessionProvider/SessionProvider";
import { chatbot, allchat, clearchat } from "../../api/apiService";


const ChatWindow = () => {
  const {session, updateSession}= useSession();
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef(null);
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
      <button onClick={handleClear} id="clearbutton"> Clear Chat</button>
      <div className="chatbox" ref={chatBoxRef}>
      {messages?.map((message, index) => (
        <div key={index} className={message.sender}>
            {message.sender === "assistant" ? (
              <>
              <strong>{"Green Pal"}:</strong> <span dangerouslySetInnerHTML={{ __html: message.text }} /> 
              </>) : ( <>
                <strong>{message.sender}: </strong><span dangerouslySetInnerHTML={{ __html: message.text}} />
              </>)
            }
        </div>
      ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage(e.target.value);
              e.target.value = "";
            }
          }}
          id="inputarea"
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
          className="send-button"
        />
      </div>
      <style>{
        `
        .chatbox {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 10px;
          width: 80%;
          padding-bottom: 20px;
        }
        .chat-window {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          // height: 85vh;
          bottom:100px;
          width: 100%;
          background: #f2f2f2;
        }
        #inputarea {
          width: 90%;
          height: 40px;
          background-color: white;
          text-align: center;
          color: black;
          border-radius: 10px;
          border: 2px solid black;
          margin-bottom: 20px;
          margin-left: -5%;
        }
        .send-button{
          cursor: pointer;  
          align-items: center;
          margin-left:-50px;
        }
        .message-input {
              display: flex; 
              flex-direction: column;
              justify-content: flex-end;
              align-items: center;
              position: fixed;
              bottom: 0;
              width: 80%;
              background: white;
              display: flex;
              margin: 10px;
              align-items: center;
              padding: 10px;
              border-top: 2px solid black;
        }
        .user {
          text-align: right;
          margin-bottom: 10px;
          border-radius: 10px;
          padding: 10px;
          background-color: greylight;
          width: 90%;
        }
        .assistant {
          text-align: left;
          margin-bottom: 10px;
          border-radius: 10px;
          padding: 10px;
          background-color: greylight;
          width: 80%;
        }
        .send-button {
          height: 40px;
          width: 40px;
          cursor: pointer;
        }
        #clearbutton {
          position: fixed;
          
          top: 10vh;
          right: 10px;
          width: 100px;
          height: 40px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 10px;
          margin: 10px;
          cursor: pointer;
        }
        #clearbutton:hover {
          background-color:rgb(200, 78, 51);
        }

        `}
        
      </style>
    </div>
  );
};

export default ChatWindow;
