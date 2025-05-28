
import React, { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';

const FloatingAIBot = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Brainy, your AI assistant. How can I help you find the perfect student project today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');

  const toggleChat = () => {
    setIsExpanded(!isExpanded);
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    
    setMessages(prev => [...prev, { text: inputValue, isBot: false }]);
    setInputValue('');
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "That's a great question! I'd be happy to help you explore our amazing student projects. What specific technology or field interests you most?", 
        isBot: true 
      }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Bubble */}
      {isExpanded && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-3xl shadow-2xl border border-coral/20 animate-slide-up z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-coral to-raspberry text-white p-4 rounded-t-3xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="font-poppins font-semibold">Brainy Assistant</h3>
                <p className="text-xs opacity-90">Always here to help</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="p-1 hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-coral/10 text-charcoal'
                      : 'bg-coral text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-coral transition-colors duration-200"
              />
              <button
                onClick={sendMessage}
                className="bg-coral text-white p-3 rounded-xl hover:bg-coral/90 transition-colors duration-200"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bot Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-coral to-raspberry text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-heartbeat z-50 flex items-center justify-center"
      >
        {isExpanded ? <X size={24} /> : <Bot size={24} />}
      </button>
    </>
  );
};

export default FloatingAIBot;
