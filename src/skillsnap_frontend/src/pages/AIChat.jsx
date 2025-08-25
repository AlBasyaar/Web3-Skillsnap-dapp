import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSend, FiPaperclip, FiGithub, FiMenu } from 'react-icons/fi';
import ChatHistorySidebar from '../components/ChatHistorySidebar';
import TypingAnimation from '../components/TypingAnimation';

const AIChat = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi there! 👋\n\nI'm here to help with your career development. You can ask me to analyze your CV, match your interests to companies, analyze your code skills, or help create a cover letter.`,
      sender: 'ai',
      timestamp: new Date(),
      showQuickActions: true,
      isTyping: false
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const [currentChatId, setCurrentChatId] = useState(null);

  const startNewChat = () => {
    const newChatId = Date.now();
    const newChat = {
      id: newChatId,
      title: `New Chat ${chatHistory.length + 1}`,
      messages: [
        {
          id: 1,
          text: `Hi, I'm here to help with your career development. You can ask me to analyze your CV, match your interests to companies, analyze your code skills, or help create a cover letter.`,
          sender: 'ai',
          timestamp: new Date(),
          showQuickActions: true
        }
      ]
    };
    
    setChatHistory([newChat, ...chatHistory]);
    setMessages(newChat.messages);
    setCurrentChatId(newChatId);
    setInputMessage('');
    setShowOptions(false);
  };

  const loadChat = (chatId) => {
    const chat = chatHistory.find(chat => chat.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);
    }
  };

  const handleSendMessage = (message = '') => {
    const userMessage = message || inputMessage.trim();
    if (!userMessage || !currentChatId) return;

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    
    // Update chat history with new message
    if (currentChatId) {
      setChatHistory(prev => 
        prev.map(chat => 
          chat.id === currentChatId 
            ? { ...chat, messages: updatedMessages }
            : chat
        )
      );
    }

    // Add typing indicator
    const typingIndicator = {
      id: Date.now() + 1,
      text: '',
      sender: 'ai',
      timestamp: new Date(),
      isTyping: true
    };

    setMessages(prev => [...prev, typingIndicator]);
    setIsTyping(true);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponses = {
        'CV Analyze': 'I can help analyze your CV. Please upload your CV and I\'ll provide feedback on how to improve it.',
        'Match my interest to company': 'Let me help you find companies that match your interests. Could you tell me what kind of work environment and values you\'re looking for?',
        'Analyze my code skills': 'I can analyze your code skills. You can share your GitHub profile or paste code snippets, and I\'ll provide feedback.',
        'Create cover letter': 'I can help you craft a compelling cover letter. Could you share the job description and your relevant experience?',
      };

      const defaultResponse = "I'm here to help with your career development. You can ask me to analyze your CV, match your interests to companies, analyze your code skills, or help create a cover letter.";
      
      const responseText = aiResponses[userMessage] || defaultResponse;
      
      // Remove typing indicator and add AI response
      setMessages(prev => {
        const withoutTyping = prev.filter(m => !m.isTyping);
        return [
          ...withoutTyping,
          {
            id: Date.now(),
            text: responseText,
            sender: 'ai',
            timestamp: new Date(),
            showQuickActions: !aiResponses[userMessage] // Show quick actions only for default response
          }
        ];
      });
      
      // Update chat history with AI response
      if (currentChatId) {
        setChatHistory(prev => 
          prev.map(chat => 
            chat.id === currentChatId 
              ? { 
                  ...chat, 
                  messages: [
                    ...chat.messages.filter(m => !m.isTyping),
                    {
                      id: Date.now(),
                      text: responseText,
                      sender: 'ai',
                      timestamp: new Date(),
                      showQuickActions: !aiResponses[userMessage]
                    }
                  ]
                }
              : chat
          )
        );
      }
      
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickAction = (action) => {
    setInputMessage(action);
    setShowOptions(false);
    handleSendMessage(action);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // In a real app, you would process the file content here
        const message = `File uploaded: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        handleSendMessage(message);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="relative max-w-4xl mx-auto h-screen flex flex-col">
      <button 
        onClick={() => setShowSidebar(true)}
        className="fixed right-4 top-4 bg-gray-700 p-2 rounded-lg text-white z-40 hover:bg-gray-600 transition-colors"
        aria-label="Open chat history"
      >
        <FiMenu className="w-5 h-5" />
      </button>
      
      <ChatHistorySidebar 
        isOpen={showSidebar} 
        onClose={() => setShowSidebar(false)}
        onNewChat={startNewChat}
        chatHistory={chatHistory}
        onSelectChat={loadChat}
        onDeleteChat={(chatId) => {
          setChatHistory(prev => {
            const updatedHistory = prev.filter(chat => chat.id !== chatId);
            if (updatedHistory.length === 0) {
              setCurrentChatId(null);
              setMessages([
                {
                  id: 1,
                  text: `Hi there! 👋\n\nI'm here to help with your career development. You can ask me to analyze your CV, match your interests to companies, analyze your code skills, or help create a cover letter.`,
                  sender: 'ai',
                  timestamp: new Date(),
                  showQuickActions: true,
                  isTyping: false
                },
              ]);
            } else if (currentChatId === chatId) {
              const nextChat = updatedHistory[0];
              setCurrentChatId(nextChat.id);
              setMessages(nextChat.messages);
            }
            return updatedHistory;
          });
          setShowSidebar(false);
        }}
      />
      {chatHistory.length === 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Welcome to SkillSnap AI! 👋</h3>
            <p className="mb-6 text-gray-300">Start by creating a new chat to get career advice, analyze your CV, or get help with job applications.</p>
            <button
              onClick={() => {
                startNewChat();
                setShowSidebar(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Start New Chat
            </button>
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 border-b border-gray-700">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3/4 rounded-lg p-4 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-700 text-white rounded-bl-none'
              }`}
            >
              {message.sender === 'ai' && message.isTyping ? (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">
                  {message.sender === 'ai' ? (
                    <TypingAnimation 
                      text={message.text} 
                      onComplete={() => {}}
                      speed={10}
                    />
                  ) : (
                    message.text
                  )}
                </p>
              )}
              {message.showQuickActions && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleQuickAction('CV Analyze')}
                    className="bg-white text-black border-2 border-black hover:bg-gray-100 p-3 rounded-lg text-sm transition-colors"
                  >
                    CV Analyze
                  </button>
                  <button
                    onClick={() => handleQuickAction('Match my interest to company')}
                    className="bg-white text-black border-2 border-black hover:bg-gray-100 p-3 rounded-lg text-sm transition-colors"
                  >
                    Match my interest to company
                  </button>
                  <button
                    onClick={() => handleQuickAction('Analyze my code skills')}
                    className="bg-white text-black border-2 border-black hover:bg-gray-100 p-3 rounded-lg text-sm transition-colors"
                  >
                    Analyze my code skills
                  </button>
                  <button
                    onClick={() => handleQuickAction('Create cover letter')}
                    className="bg-white text-black border-2 border-black hover:bg-gray-100 p-3 rounded-lg text-sm transition-colors"
                  >
                    Create cover letter
                  </button>
                </div>
              )}
              <p className="text-xs opacity-70 mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Area */}
      <div className="p-4 border-t border-gray-700 bg-gray-800 mt-auto">
        {showOptions && (
          <div className="bg-gray-700 rounded-lg p-3 mb-3 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickAction('CV Analyze')}
              className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded text-sm transition-colors"
            >
              CV Analyze
            </button>
            <button
              onClick={() => handleQuickAction('Match my interest to company')}
              className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded text-sm transition-colors"
            >
              Match Interests
            </button>
            <button
              onClick={() => handleQuickAction('Analyze my code skills')}
              className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded text-sm transition-colors"
            >
              Code Analysis
            </button>
            <button
              onClick={() => handleQuickAction('Create cover letter')}
              className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded text-sm transition-colors"
            >
              Cover Letter
            </button>
          </div>
        )}
        
        <div className="flex flex-col gap-2">
          <div className="relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="p-2 rounded-full hover:bg-gray-700 cursor-pointer flex items-center">
                <FiPaperclip className="w-5 h-5 text-gray-400 hover:text-white" />
                <span className="ml-1 text-sm text-gray-300">Attach</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                />
              </label>
              
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="p-2 rounded-full hover:bg-gray-700 flex items-center"
              >
                <FiGithub className="w-5 h-5 text-gray-400 hover:text-white" />
                <span className="ml-1 text-sm text-gray-300">Git</span>
              </button>
            </div>
            
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim()}
              className={`px-4 py-2 rounded-lg ${
                inputMessage.trim()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              } transition-colors flex items-center`}
            >
              <span className="mr-1">Send</span>
              <FiSend className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;