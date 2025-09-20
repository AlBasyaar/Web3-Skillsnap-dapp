import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiSend,
  FiPaperclip,
  FiGithub,
  FiMenu,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import ChatHistorySidebar from "../components/ChatHistorySidebar";
import TypingAnimation from "../components/TypingAnimation";
import PersonalityAssessmentForm from "../components/PersonalityAssessmentForm";

const AIChat = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' or 'assessment'
  const [chatHistory, setChatHistory] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi there! 👋\n\nI'm here to help with your career development. You can ask me to analyze your CV, match your interests to companies, analyze your code skills, or help create a cover letter.`,
      sender: "ai",
      timestamp: new Date(),
      showQuickActions: true,
      isTyping: false,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const [currentChatId, setCurrentChatId] = useState(null);

  const startNewChat = () => {
    setChatHistory((prev) => {
      const newChatId = Date.now();
      const newChat = {
        id: newChatId,
        title: `New Chat ${prev.length + 1}`,
        messages: [
          {
            id: 1,
            text: `Hi there! 👋\n\nI'm here to help with your career development. You can ask me to analyze your CV, match your interests to companies, analyze your code skills, or help create a cover letter.`,
            sender: "ai",
            timestamp: new Date(),
            showQuickActions: true,
          },
        ],
      };
      setMessages(newChat.messages);
      setCurrentChatId(newChatId);
      setInputMessage("");
      setShowOptions(false);
      return [newChat, ...prev];
    });
  };

  const loadChat = (chatId) => {
    const chat = chatHistory.find((chat) => chat.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);
    }
  };

  const handleSendMessage = (message = "") => {
    const userMessage = message || inputMessage.trim();
    if (!userMessage) return;

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      text: userMessage,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputMessage("");

    // Update chat history with new message
    if (currentChatId) {
      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: updatedMessages }
            : chat
        )
      );
    }

    // Add typing indicator
    const typingIndicator = {
      id: Date.now() + 1,
      text: "",
      sender: "ai",
      timestamp: new Date(),
      isTyping: true,
    };

    setMessages((prev) => [...prev, typingIndicator]);
    setIsTyping(true);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponses = {
        "CV Analyze":
          "I can help analyze your CV. Please upload your CV and I'll provide feedback on how to improve it.",
        "Match my interest to company":
          "Let me help you find companies that match your interests. Could you tell me what kind of work environment and values you're looking for?",
        "Analyze my code skills":
          "I can analyze your code skills. You can share your GitHub profile or paste code snippets, and I'll provide feedback.",
        "Create cover letter":
          "I can help you craft a compelling cover letter. Could you share the job description and your relevant experience?",
      };

      const defaultResponse =
        "I'm here to help with your career development. You can ask me to analyze your CV, match your interests to companies, analyze your code skills, or help create a cover letter.";

      const responseText = aiResponses[userMessage] || defaultResponse;

      // Remove typing indicator and add AI response
      setMessages((prev) => {
        const withoutTyping = prev.filter((m) => !m.isTyping);
        return [
          ...withoutTyping,
          {
            id: Date.now(),
            text: responseText,
            sender: "ai",
            timestamp: new Date(),
            showQuickActions: !aiResponses[userMessage], // Show quick actions only for default response
          },
        ];
      });

      // Update chat history with AI response
      if (currentChatId) {
        setChatHistory((prev) =>
          prev.map((chat) =>
            chat.id === currentChatId
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages.filter((m) => !m.isTyping),
                    {
                      id: Date.now(),
                      text: responseText,
                      sender: "ai",
                      timestamp: new Date(),
                      showQuickActions: !aiResponses[userMessage],
                    },
                  ],
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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Tambahkan pesan user: info file
    handleSendMessage(`📄 Uploading certificate: ${file.name}...`);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:5000/ai/upload_certificate", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "ai",
          type: "analysis",
          analysis: {
            skill: data.skill,
            issuer: data.issuer,
            confidence: data.confidence,
            status: data.status,
          },
          timestamp: new Date(),
        },
      ]);

      // Kalau verified, lanjutkan mint NFT
      // if (data.status === "verified") {
      //   setMessages((prev) => [
      //     ...prev,
      //     {
      //       id: Date.now() + 2,
      //       sender: "ai",
      //       type: "text",
      //       text: "🎉 NFT certificate minted successfully on ICP!",
      //       timestamp: new Date(),
      //     },
      //   ]);
      // }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "ai",
          type: "text",
          text: "❌ Error uploading/processing certificate.",
          timestamp: new Date(),
        },
      ]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Check URL for tab parameter
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab === "assessment") {
      setActiveTab("assessment");
    } else {
      setActiveTab("chat");
    }
  }, [location.search]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.history.pushState({}, "", `?tab=${tab}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700 bg-gray-800">
        <button
          onClick={() => handleTabChange("chat")}
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
            activeTab === "chat"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <FiMessageSquare className="w-5 h-5" />
            <span>AI Chat</span>
          </div>
        </button>
        <button
          onClick={() => handleTabChange("assessment")}
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
            activeTab === "assessment"
              ? "text-purple-400 border-b-2 border-purple-400"
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <FiUser className="w-5 h-5" />
            <span>Personality Assessment</span>
          </div>
        </button>
      </div>

      {activeTab === "chat" ? (
        <div className="flex-1 overflow-hidden">
          <div className="relative max-w-4xl mx-auto h-full flex flex-col">
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
                setChatHistory((prev) => {
                  const filtered = prev.filter((chat) => chat.id !== chatId);
                  if (currentChatId === chatId) {
                    setInputMessage("");
                    setShowOptions(false);
                    if (filtered.length > 0) {
                      const nextChat = filtered[0];
                      setMessages(nextChat.messages);
                      setCurrentChatId(nextChat.id);
                    } else {
                      setMessages([
                        {
                          id: 1,
                          text: `Hi there! 👋\n\nI'm here to help with your career development. You can ask me to analyze your CV, match your interests to companies, analyze your code skills, or help create a cover letter.`,
                          sender: "ai",
                          timestamp: new Date(),
                          showQuickActions: true,
                          isTyping: false,
                        },
                      ]);
                      setCurrentChatId(null);
                    }
                  }
                  return filtered;
                });
              }}
            />
            {chatHistory.length === 0 && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
                <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
                  <h3 className="text-xl font-semibold mb-4">
                    Welcome to SkillSnap AI! 👋
                  </h3>
                  <p className="mb-6 text-gray-300">
                    Start by creating a new chat to get career advice, analyze
                    your CV, or get help with job applications.
                  </p>
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-3/4 rounded-lg p-4 ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-700 text-white rounded-bl-none"
                    }`}
                  >
                    {/* 🔹 Jika message type analysis → render tabel */}
                    {message.type === "analysis" ? (
                      <div>
                        <h4 className="font-bold mb-2">
                          ✅ Certificate Analysis Result
                        </h4>
                        <table className="text-sm w-full border-collapse">
                          <tbody>
                            <tr>
                              <td className="pr-2 font-semibold">Skill</td>
                              <td>{message.analysis.skill}</td>
                            </tr>
                            <tr>
                              <td className="pr-2 font-semibold">Issuer</td>
                              <td>{message.analysis.issuer}</td>
                            </tr>
                            <tr>
                              <td className="pr-2 font-semibold">Confidence</td>
                              <td>
                                {(message.analysis.confidence * 100).toFixed(1)}
                                %
                              </td>
                            </tr>
                            <tr>
                              <td className="pr-2 font-semibold">Status</td>
                              <td
                                className={
                                  message.analysis.status === "verified"
                                    ? "text-green-400"
                                    : "text-red-400"
                                }
                              >
                                {message.analysis.status}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      // 🔹 default: pesan normal
                      <p className="whitespace-pre-wrap">
                        {message.sender === "ai" && message.isTyping ? (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        ) : (
                          message.text
                        )}
                      </p>
                    )}

                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Area */}
            <div className="p-4 border-t border-gray-700 bg-gray-800">
              {showOptions && (
                <div className="bg-gray-700 rounded-lg p-3 mb-3 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleQuickAction("CV Analyze")}
                    className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded text-sm transition-colors"
                  >
                    CV Analyze
                  </button>
                  <button
                    onClick={() =>
                      handleQuickAction("Match my interest to company")
                    }
                    className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded text-sm transition-colors"
                  >
                    Match Interests
                  </button>
                  <button
                    onClick={() => handleQuickAction("Analyze my code skills")}
                    className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded text-sm transition-colors"
                  >
                    Code Analysis
                  </button>
                  <button
                    onClick={() => handleQuickAction("Create cover letter")}
                    className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded text-sm transition-colors"
                  >
                    Cover Letter
                  </button>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <div className="relative flex items-center gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="flex items-center p-2 rounded-full hover:bg-gray-700 cursor-pointer">
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
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-700 text-gray-500 cursor-not-allowed"
                  } transition-colors flex items-center`}
                >
                  <span className="mr-1">Send</span>
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Personality Assessment
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Complete this assessment to discover your personality traits and
                career matches
              </p>
            </div>
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700/50 shadow-xl">
              <PersonalityAssessmentForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;
