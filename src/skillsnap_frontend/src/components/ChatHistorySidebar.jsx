import React, { useState } from 'react';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';

const ChatHistorySidebar = ({ isOpen, onClose, onNewChat, chatHistory = [], onSelectChat, onDeleteChat }) => {
  const [hoveredChat, setHoveredChat] = useState(null);
  if (!isOpen) return null;

  const handleNewChat = () => {
    onNewChat();
    onClose();
  };

  const handleChatSelect = (chat) => {
    if (onSelectChat) {
      onSelectChat(chat.id);
    } else if (chat.messages) {
      onNewChat();
    }
    onClose();
  };

  return (
    <div className="fixed inset-y-0 right-0 w-64 bg-gray-800 text-white p-4 shadow-lg z-50 flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Chat History</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-700 transition-colors"
            aria-label="Close sidebar"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <button 
          onClick={handleNewChat}
          className="w-full mb-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors"
        >
          <FiPlus className="mr-2" />
          New Chat
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chatHistory.length === 0 ? (
          <div className="text-center text-gray-400 mt-8">
            <p>No chat history yet</p>
            <p className="text-sm mt-2">Start a new chat to see it here</p>
          </div>
        ) : (
          chatHistory.map((chat) => (
            <div 
              key={chat.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors group relative ${
                chat.id === chatHistory[0]?.id ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleChatSelect(chat)}
              onMouseEnter={() => setHoveredChat(chat.id)}
              onMouseLeave={() => setHoveredChat(null)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium">{chat.title || 'New Chat'}</div>
                  {chat.messages?.[0]?.text && (
                    <div className="text-sm text-gray-400 truncate">
                      {chat.messages[0].text.substring(0, 30)}...
                    </div>
                  )}
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onDeleteChat) onDeleteChat(chat.id);
                  }}
                  className={`ml-2 p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-600 transition-colors ${
                    hoveredChat === chat.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  aria-label="Delete chat"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatHistorySidebar;
