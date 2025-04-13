import { useState, useRef, useEffect } from 'react';
import { Send, Bot, X } from 'lucide-react';
import { Button } from './layout/ui/Button';
import { Input } from './layout/ui/Input';
import { Card, CardContent } from './layout/ui/Card';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your coding assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const botResponses = [
        "I can help you with that! Let's break down the problem step by step.",
        "That's a common issue in algorithms. Have you considered using a different data structure?",
        "Your approach seems correct. You might want to optimize the time complexity though.",
        "I'd recommend checking for edge cases in your solution.",
        "Here's a hint: try using a hash map to store intermediate results.",
        "That's a great question! The key insight is understanding the problem constraints."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      <Button
        className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-0 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bot size={24} />
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 sm:w-96 h-96 flex flex-col shadow-xl border border-border">
          <div className="flex items-center justify-between bg-primary text-primary-foreground p-3 rounded-t-lg">
            <div className="flex items-center">
              <Bot className="mr-2" size={20} />
              <h3 className="font-medium">Coding Assistant</h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </Button>
          </div>
          
          <CardContent className="flex-grow overflow-y-auto p-3 space-y-3">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-secondary text-secondary-foreground rounded-lg px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          
          <div className="p-3 border-t">
            <div className="flex">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question..."
                className="flex-grow"
              />
              <Button 
                onClick={handleSendMessage} 
                className="ml-2"
                disabled={!input.trim() || isTyping}
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default AiChatbot;