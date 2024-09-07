import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import {
  FaPaperPlane,
  FaUserCircle,
  FaSearch,
  FaPaperclip,
  FaImage,
  FaCheck,
  FaCheckDouble,
  FaBell,
  FaTrashAlt,
} from "react-icons/fa";
import "./Chat.css";

const socket = io("http://localhost:5001");

// Mock data for demo
const currentUsername = "User2"; // Assume the logged-in user
const initialChats = [
  {
    username: "User1",
    lastMessage: "How are you?",
    timestamp: new Date(),
    avatarUrl: "https://api.dicebear.com/6.x/bottts/svg?seed=User1",
    status: "online",
  },
  {
    username: "User2",
    lastMessage: "Meeting at 5?",
    timestamp: new Date(),
    avatarUrl: "https://api.dicebear.com/6.x/bottts/svg?seed=User2",
    status: "offline",
  },
];

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState(["User2", "User3"]); // Mock active users
  const [selectedChat, setSelectedChat] = useState(initialChats[0]);
  const [attachment, setAttachment] = useState(null); // For file upload
  const [searchQuery, setSearchQuery] = useState(""); // For search functionality
  const [showNotification, setShowNotification] = useState(false); // For new message notifications
  const [confirmDelete, setConfirmDelete] = useState(null); // For delete confirmation
  const messageEndRef = useRef(null);
  const fileInputRef = useRef(null); // For file input

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      setShowNotification(true);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() || attachment) {
      const newMessage = {
        text: message,
        sender: currentUsername,
        timestamp: new Date(),
        avatarUrl: `https://api.dicebear.com/6.x/bottts/svg?seed=${currentUsername}`,
        file: attachment ? URL.createObjectURL(attachment) : null,
        seen: false,
      };
      socket.emit("send-message", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage(""); // Clear input field
      setAttachment(null); // Clear file attachment
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setAttachment(file); // Store file temporarily for preview
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat); // Set selected chat
    // Fetch chat history or other actions can be added here
  };

  const handleDeleteMessage = (index) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setMessages((prevMessages) => prevMessages.filter((_, i) => i !== index));
      setConfirmDelete(null);
    }
  };

  const filteredChats = initialChats.filter((chat) =>
    chat.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen sidebar text-white">
      {/* Sidebar */}
      <aside className="w-1/4 p-6 flex flex-col border-r border-gray-700">
        <div className="flex items-center mb-6">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input w-full p-2 rounded-lg focus:outline-none text-white"
          />
        </div>

        {/* Recent Chats */}
        <div className="mb-6">
          <h3 className="text-gray-300 mb-3">Recent Chats</h3>
          <ul className="space-y-4">
            {filteredChats.map((chat) => (
              <li
                key={chat.username}
                onClick={() => handleChatSelect(chat)}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition duration-200 ${
                  selectedChat.username === chat.username
                    ? "bg-gray-600"
                    : "hover:bg-gray-700"
                }`}
              >
                <img
                  src={chat.avatarUrl}
                  alt={chat.username}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-semibold">{chat.username}</span>
                    <small className="text-gray-400 text-xs">
                      {new Date(chat.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
                  </div>
                  <p className="text-gray-400 text-sm">{chat.lastMessage}</p>
                </div>
                <span
                  className={`w-3 h-3 rounded-full ${
                    chat.status === "online" ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Active Users */}
        <div>
          <h3 className="text-gray-300 mb-3">Active Users</h3>
          <ul className="space-y-4">
            {activeUsers.map((user) => (
              <li
                key={user}
                className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg cursor-pointer"
              >
                <FaUserCircle className="text-3xl text-gray-500" />
                <span>{user}</span>
                <span className="ml-auto w-3 h-3 rounded-full bg-green-500"></span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Chat Header */}
        <header className="header p-4 border-b border-gray-700 flex items-center">
          <img
            src={selectedChat.avatarUrl}
            alt={selectedChat.username}
            className="w-10 h-10 rounded-full mr-4"
          />
          <div className="flex-1">
            <h2 className="text-gray-100 font-semibold">{selectedChat.username}</h2>
            <p className="text-gray-400 text-sm">
              {selectedChat.status === "online"
                ? "Active now"
                : "Last seen recently"}
            </p>
          </div>
          {showNotification && (
            <button
              onClick={() => setShowNotification(false)}
              className="notification-button ml-4"
            >
              <FaBell />
            </button>
          )}
        </header>

        {/* Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-900">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === currentUsername ? "justify-end" : "justify-start"
              } mb-4`}
            >
              {msg.sender !== currentUsername && (
                <img
                  src={msg.avatarUrl}
                  alt={msg.sender}
                  className="w-10 h-10 rounded-full mr-3"
                />
              )}
              <div
                className={`p-4 rounded-lg max-w-xs ${
                  msg.sender === currentUsername
                    ? "message-sent"
                    : "message-received"
                } shadow-lg relative`}
              >
                {msg.file ? (
                  <a
                    href={msg.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img
                      src={msg.file}
                      alt="uploaded-file"
                      className="rounded-lg max-w-full h-auto"
                    />
                  </a>
                ) : (
                  <p className="font-semibold">{msg.text}</p>
                )}
                <small className="block text-gray-400 text-xs mt-2">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {msg.sender === currentUsername && (
                    <span className="ml-2">
                      {msg.seen ? (
                        <FaCheckDouble className="inline text-blue-400" />
                      ) : (
                        <FaCheck className="inline text-gray-400" />
                      )}
                    </span>
                  )}
                </small>
                {msg.sender === currentUsername && (
                  <button
                    onClick={() => handleDeleteMessage(index)}
                    className="delete-button absolute top-2 right-2"
                  >
                    <FaTrashAlt />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        {/* Message Input Area */}
        <footer className="footer p-4 border-t border-gray-700 flex items-center space-x-4">
          {attachment && (
            <div className="relative">
              <img
                src={URL.createObjectURL(attachment)}
                alt="attachment-preview"
                className="attachment-preview w-20 h-20 rounded-lg mr-4"
              />
              <button
                onClick={() => setAttachment(null)}
                className="absolute top-0 right-0 p-1 bg-gray-600 rounded-full"
              >
                <FaTrashAlt className="text-white" />
              </button>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="text-gray-400 hover:text-gray-300"
          >
            <FaPaperclip />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="text-blue-400 hover:text-blue-300"
          >
            <FaPaperPlane />
          </button>
        </footer>
      </main>
    </div>
  );
};

export default ChatPage;
