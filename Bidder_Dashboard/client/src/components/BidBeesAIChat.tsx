import { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend, FiCpu } from 'react-icons/fi';
import { apiRequest } from '@/lib/queryClient';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function BidBeesAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      content: "Hello! I'm your BidBees AI assistant. How can I help with your tenders today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isSubmitting) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsSubmitting(true);
    
    try {
      const response = await apiRequest('POST', '/api/chat', { message: inputValue });
      const data = await response.json();
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.reply,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I couldn't process your request. Please try again later.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-lg p-4 w-80">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800 flex items-center">
              <FiCpu className="mr-2 text-accent-orange" />
              BidBees Intelligence
            </h3>
            <button onClick={toggleChat} className="text-gray-500 hover:text-gray-700">
              <FiX />
            </button>
          </div>
          
          <div 
            ref={messageContainerRef}
            className="bg-gray-100 rounded-lg p-3 h-64 overflow-y-auto"
          >
            {messages.map(message => (
              <div key={message.id} className={`flex mb-2 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-accent-orange flex items-center justify-center text-white mr-2">
                    <FiCpu />
                  </div>
                )}
                <div className={`p-2 rounded-lg shadow max-w-[80%] ${
                  message.sender === 'user' 
                    ? 'bg-accent-blue text-white' 
                    : 'bg-white text-gray-800'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isSubmitting && (
              <div className="flex mb-2">
                <div className="w-8 h-8 rounded-full bg-accent-orange flex items-center justify-center text-white mr-2">
                  <FiCpu />
                </div>
                <div className="bg-white p-2 rounded-lg shadow max-w-[80%]">
                  <p className="text-gray-800 text-sm">Thinking...</p>
                </div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="mt-3 flex">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ask about tender opportunities..."
              className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent-blue text-gray-700"
            />
            <button 
              type="submit"
              disabled={isSubmitting || !inputValue.trim()}
              className="bg-accent-blue text-white px-4 py-2 rounded-r-lg disabled:opacity-50"
            >
              <FiSend />
            </button>
          </form>
        </div>
      )}
      
      <button 
        onClick={toggleChat} 
        className="bg-accent-orange hover:bg-accent-orange-dark text-white p-3 rounded-full shadow-lg float-right flex items-center justify-center w-14 h-14"
      >
        <FiMessageCircle className="text-xl" />
      </button>
    </div>
  );
}
