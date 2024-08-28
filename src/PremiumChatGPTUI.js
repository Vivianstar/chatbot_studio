import React, { useState, useRef, useEffect } from "react";
import {
  PlusIcon,
  SendIcon,
  UserIcon,
  BotIcon,
  ChevronDownIcon,
} from "lucide-react";

const PremiumChatBotUI = () => {
  const [conversations, setConversations] = useState([
    { id: 1, title: "New Conversation" },
    { id: 2, title: "Professional Bio Summary" },
    { id: 3, title: "Create a travel plan" },
    { id: 4, title: "Recommend a great book" },
  ]);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { text: inputMessage, sender: "user" }]);
      setInputMessage("");

      // Simulate bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: `Here's a response to "${inputMessage}".`,
            sender: "bot",
          },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-80 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 flex flex-col border-r border-gray-800">
        <button className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full py-3 px-6 flex items-center justify-center mb-8 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg transform hover:scale-105">
          <PlusIcon className="w-5 h-5 mr-2" />
          <span className="font-semibold">New Chat</span>
        </button>
        <div className="flex-grow overflow-y-auto space-y-2 custom-scrollbar">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className="py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 cursor-pointer transition-all duration-200 flex items-center group"
            >
              <UserIcon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-purple-400" />
              <span className="text-sm font-medium group-hover:text-purple-300">
                {conv.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-black bg-opacity-50 backdrop-filter backdrop-blur-md">
        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-8 space-y-6 custom-scrollbar">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } animate-fadeIn`}
            >
              <div
                className={`max-w-2xl p-4 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-gray-800 bg-opacity-50 text-gray-100"
                } shadow-xl flex items-start`}
              >
                {message.sender === "bot" && (
                  <BotIcon className="w-5 h-5 mr-3 mt-1 text-purple-400" />
                )}
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-800 p-6">
          <div className="flex items-center bg-gray-800 bg-opacity-50 rounded-full shadow-inner backdrop-filter backdrop-blur-sm">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-grow px-6 py-4 bg-transparent outline-none text-gray-100 placeholder-gray-400"
              placeholder="Message ChatBot..."
            />
            <button
              onClick={handleSendMessage}
              className="p-3 rounded-full text-gray-400 hover:text-purple-400 transition-colors duration-200 mr-2"
            >
              <SendIcon className="w-5 h-5 transform rotate-45" />
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-3 text-center flex items-center justify-center">
            <ChevronDownIcon className="w-4 h-4 mr-1" />
            ChatBot may produce inaccurate information about people, places, or
            facts.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumChatBotUI;
