"use client";

import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

export default function ChatComponent({ chatId, userId, userName }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Connect to WebSocket server
    const newSocket = io("http://localhost:5000", {
      reconnectionAttempts: 5, // Try reconnecting up to 5 times
      transports: ["websocket"], // Use WebSockets only for better performance
    });

    setSocket(newSocket);

    newSocket.emit("join", { chat_id: chatId });

    newSocket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    newSocket.on("disconnect", () => {
      console.warn("Disconnected from chat server.");
    });

    return () => {
      newSocket.emit("leave", { chat_id: chatId });
      newSocket.disconnect();
    };
  }, [chatId]);

  // Scroll to the latest message automatically
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (socket && message.trim()) {
      const msgData = {
        chat_id: chatId,
        sender_id: userId,
        sender_name: userName, // Pass user name instead of just ID
        content: message,
        timestamp: new Date().toISOString(),
      };

      socket.emit("send_message", msgData);
      setMessages((prev) => [...prev, msgData]); // Optimistic UI update
      setMessage("");
    }
  };

  return (
    <div className="border p-4 mt-4 w-96 bg-white shadow-lg rounded-lg">
      <div className="h-64 overflow-y-auto border-b p-2">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`p-1 ${msg.sender_id === userId ? "text-blue-600 text-right" : "text-gray-800 text-left"}`}>
              <p className="text-sm font-semibold">{msg.sender_id === userId ? "You" : msg.sender_name}</p>
              <p>{msg.content}</p>
              <p className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</p>
            </div>
          ))
        )}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 flex-1 rounded-l-lg"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
}
