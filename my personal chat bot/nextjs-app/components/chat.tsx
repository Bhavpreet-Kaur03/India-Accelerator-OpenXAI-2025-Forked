"use client";

import { useState } from "react";

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
}

export function Chat() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "👋 Hi! Welcome to your personal chatbot. How can I help you today?",
    },
  ]);
  const [error, setError] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);
    setMessage("");

    fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    })
      .then(async (res) => {
        if (res.ok) {
          await res.json().then((data) => {
            setError("");
            setMessages((prev) => [
              ...prev,
              { id: Date.now(), sender: "bot", text: data.message },
            ]);
          });
        } else {
          await res.json().then((data) => {
            setError(data.error);
          });
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col w-full max-w-lg h-[85vh] bg-gradient-to-br from-blue-50 to-indigo-100 shadow-xl rounded-2xl overflow-hidden border">
      {/* Header */}
      <div className="bg-indigo-600 text-white text-lg font-semibold px-4 py-3 shadow flex items-center">
        💬 Personal Chatbot
      </div>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-md ${
                msg.sender === "user"
                  ? "bg-indigo-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none border"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-500 text-sm italic">🤖 Bot is typing...</div>
        )}

        {error && (
          <div className="text-red-500 text-sm font-medium">{error}</div>
        )}
      </div>

      {/* Input Box (Search style) */}
      <div className="p-3 border-t bg-white">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-inner">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
            className="flex-1 bg-transparent focus:outline-none px-2 text-gray-700"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
