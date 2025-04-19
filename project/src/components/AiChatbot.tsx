import { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, ThumbsUp, ThumbsDown, Code, Smile, Sun, Moon, Copy, Check, Languages } from 'lucide-react';
import { Button } from './layout/ui/Button';
import { Input } from './layout/ui/Input';
import { Card, CardContent } from './layout/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../contexts/ThemeContext';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  reactions: {
    thumbsUp: number;
    thumbsDown: number;
  };
  codeBlock?: {
    language: string;
    code: string;
  };
}

interface User {
  name: string;
  avatar?: string;
}

const programmingLanguages = [
  { 
    name: 'JavaScript', 
    value: 'javascript', 
    icon: '💻',
    description: 'JavaScript is a versatile programming language used for web development, both on the client and server side.',
    features: [
      'Dynamic typing',
      'First-class functions',
      'Prototype-based inheritance',
      'Asynchronous programming',
      'Event-driven architecture'
    ],
    useCases: [
      'Web development',
      'Frontend frameworks (React, Vue, Angular)',
      'Backend development (Node.js)',
      'Mobile apps (React Native)',
      'Game development'
    ]
  },
  { 
    name: 'Python', 
    value: 'python', 
    icon: '🐍',
    description: 'Python is a high-level, interpreted programming language known for its simplicity and readability.',
    features: [
      'Easy to learn syntax',
      'Extensive standard library',
      'Dynamic typing',
      'Multiple programming paradigms',
      'Strong community support'
    ],
    useCases: [
      'Data science and analytics',
      'Machine learning',
      'Web development',
      'Automation scripts',
      'Scientific computing'
    ]
  },
  { 
    name: 'Java', 
    value: 'java', 
    icon: '☕',
    description: 'Java is a class-based, object-oriented programming language designed for portability and reliability.',
    features: [
      'Platform independence',
      'Strong type checking',
      'Automatic memory management',
      'Multi-threading support',
      'Rich API ecosystem'
    ],
    useCases: [
      'Enterprise applications',
      'Android development',
      'Web applications',
      'Big data processing',
      'Embedded systems'
    ]
  },
  { 
    name: 'C++', 
    value: 'cpp', 
    icon: '⚡',
    description: 'C++ is a powerful, high-performance programming language that extends C with object-oriented features.',
    features: [
      'Low-level memory manipulation',
      'Object-oriented programming',
      'Template metaprogramming',
      'Operator overloading',
      'Multiple inheritance'
    ],
    useCases: [
      'System programming',
      'Game development',
      'Real-time simulations',
      'High-performance applications',
      'Embedded systems'
    ]
  },
  { 
    name: 'TypeScript', 
    value: 'typescript', 
    icon: '📘',
    description: 'TypeScript is a typed superset of JavaScript that adds static type checking and other features.',
    features: [
      'Static typing',
      'Interface and type definitions',
      'Class-based object orientation',
      'Generics support',
      'Better IDE support'
    ],
    useCases: [
      'Large-scale applications',
      'Frontend development',
      'Backend development',
      'Full-stack applications',
      'Enterprise applications'
    ]
  }
];

const welcomeMessages = [
  "Hello! I'm your coding assistant. How can I help you today? 👋",
  "Hi there! Ready to tackle some coding challenges? 💻",
  "Hey! I'm here to help with your programming questions. What's on your mind? 🤔",
];

const commonResponses = {
  greeting: [
    "Hello! How can I assist you with your coding today?",
    "Hi there! What programming question can I help you with?",
    "Hey! Ready to solve some coding problems together?",
  ],
  help: [
    "I can help you with:\n- Code explanations\n- Debugging help\n- Algorithm design\n- Best practices\n- Code optimization\n- Language-specific questions",
    "I'm here to assist with:\n- Writing and reviewing code\n- Explaining concepts\n- Solving programming problems\n- Providing coding examples\n- Answering technical questions",
  ],
  error: [
    "I'm not sure I understand. Could you rephrase that?",
    "Could you provide more details about what you're trying to achieve?",
    "Let me know if you have a specific programming question!",
  ],
  aboutCodeCampus: [
    "CodeCampus is a comprehensive platform designed for educational institutions to host coding contests and foster programming skills among students. 🎓\n\nKey features include:\n- Coding contests and competitions\n- Real-time code editor\n- Problem-solving challenges\n- Student progress tracking\n- Community learning environment\n\nIt's a perfect platform for institutions to nurture coding talent and prepare students for technical careers! 💻",
    "CodeCampus is an innovative educational platform that brings coding competitions and learning to academic institutions. 🏫\n\nWhat makes it special?\n- Customizable coding contests\n- Multiple programming language support\n- Real-time code execution\n- Detailed performance analytics\n- Collaborative learning features\n\nIt's transforming how institutions teach and students learn programming! 🚀"
  ],
  siteFeatures: [
    "Our platform offers several powerful features:\n\n1. Coding Contests 🏆\n- Create and participate in coding competitions\n- Real-time leaderboard\n- Multiple difficulty levels\n\n2. Code Editor 💻\n- Syntax highlighting\n- Auto-completion\n- Multiple language support\n- Real-time compilation\n\n3. Problem Solving 📚\n- Curated problem sets\n- Detailed explanations\n- Test cases and solutions\n\n4. Learning Resources 📖\n- Tutorials and guides\n- Code examples\n- Best practices\n\n5. Community Features 👥\n- Discussion forums\n- Peer learning\n- Progress tracking\n\nStart exploring these features to enhance your coding journey!",
    "Here's what you can do on CodeCampus:\n\n🎯 Contests & Challenges\n- Participate in coding competitions\n- Solve practice problems\n- Track your progress\n\n💡 Learning Tools\n- Interactive code editor\n- Multiple programming languages\n- Real-time feedback\n\n📊 Analytics\n- Performance tracking\n- Skill assessment\n- Progress reports\n\n👥 Community\n- Connect with peers\n- Share solutions\n- Learn together\n\nReady to start your coding journey? Let me know how I can help! 😊"
  ],
  uses: [
    "CodeCampus is used for various educational purposes:\n\n🎓 For Educational Institutions:\n- Conduct coding competitions\n- Track student progress\n- Create custom problem sets\n- Foster programming skills\n\n👨‍💻 For Students:\n- Practice coding problems\n- Participate in contests\n- Learn from peers\n- Build a coding portfolio\n\n👨‍🏫 For Teachers:\n- Create assignments\n- Monitor student performance\n- Provide feedback\n- Organize coding events\n\n💼 For Career Development:\n- Prepare for technical interviews\n- Build problem-solving skills\n- Learn industry best practices\n- Network with peers\n\nStart using CodeCampus today to enhance your coding journey! 🚀",
    "Here are the main uses of CodeCampus:\n\n1. Learning & Education 📚\n- Self-paced coding practice\n- Structured learning paths\n- Real-world problem solving\n- Skill development\n\n2. Competition & Assessment 🏆\n- Coding competitions\n- Skill assessments\n- Performance tracking\n- Progress evaluation\n\n3. Community & Collaboration 👥\n- Peer learning\n- Code sharing\n- Discussion forums\n- Team projects\n\n4. Career Preparation 💼\n- Interview preparation\n- Portfolio building\n- Skill showcasing\n- Industry readiness\n\n5. Institutional Use 🏫\n- Course management\n- Student evaluation\n- Curriculum support\n- Event organization\n\nHow would you like to use CodeCampus? I can help you get started! 😊"
  ],
  howToUse: [
    "Here's a step-by-step guide to using CodeCampus:\n\n1. Getting Started 🚀\n- Create your account\n- Complete your profile\n- Choose your programming languages\n- Set your skill level\n\n2. Learning Path 📚\n- Start with beginner tutorials\n- Practice with coding exercises\n- Take skill assessments\n- Track your progress\n\n3. Contests & Challenges 🏆\n- Join coding competitions\n- Solve practice problems\n- Participate in team contests\n- Check leaderboard rankings\n\n4. Community Features 👥\n- Join discussion forums\n- Connect with peers\n- Share your solutions\n- Get feedback on your code\n\n5. Advanced Features 💡\n- Use the code editor\n- Test your solutions\n- Get real-time feedback\n- Build your coding portfolio\n\nReady to start your coding journey? Let me know if you need help with any specific feature! 😊",
    "Let me show you how to make the most of CodeCampus:\n\n🎯 For Beginners:\n- Start with basic tutorials\n- Practice simple coding problems\n- Join beginner-friendly contests\n- Get help from the community\n\n💻 For Intermediate Users:\n- Solve medium-level problems\n- Participate in weekly contests\n- Join coding clubs\n- Work on team projects\n\n🚀 For Advanced Users:\n- Compete in advanced contests\n- Create custom problem sets\n- Mentor other students\n- Build complex projects\n\n📊 For Teachers:\n- Create assignments\n- Monitor student progress\n- Organize coding events\n- Provide feedback\n\n🏫 For Institutions:\n- Set up coding competitions\n- Track student performance\n- Create custom curriculum\n- Manage multiple classes\n\nWhat would you like to try first? I can help you get started! 😊"
  ],
  gettingStarted: [
    "Let's get you started with CodeCampus:\n\n1. First Steps 📝\n- Sign up for an account\n- Complete your profile\n- Choose your interests\n- Set your goals\n\n2. Explore Features 🔍\n- Browse tutorials\n- Check out contests\n- Join discussions\n- Try the code editor\n\n3. Start Learning 📚\n- Begin with basics\n- Practice daily\n- Join beginner contests\n- Ask questions\n\n4. Track Progress 📈\n- Monitor your scores\n- Check your rankings\n- Review your solutions\n- Set new goals\n\n5. Get Help 🤝\n- Use the help center\n- Join community forums\n- Ask mentors\n- Watch tutorials\n\nWould you like to know more about any of these steps? 😊",
    "Here's your quick start guide to CodeCampus:\n\n🎯 Day 1:\n- Create your account\n- Complete your profile\n- Take the skill assessment\n- Explore the dashboard\n\n📚 Week 1:\n- Start with tutorials\n- Solve practice problems\n- Join a beginner contest\n- Connect with peers\n\n🏆 Month 1:\n- Regular practice\n- Participate in contests\n- Build your portfolio\n- Track your progress\n\n🚀 Long Term:\n- Advanced challenges\n- Team competitions\n- Mentor others\n- Build projects\n\nNeed help with any specific step? Just ask! 😊"
  ]
};

const AiChatbot: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User>({ name: 'User' });
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
      setMessages([
        {
          id: '1',
          content: randomWelcome,
          sender: 'bot',
          timestamp: new Date(),
          reactions: {
            thumbsUp: 0,
            thumbsDown: 0
          }
        }
      ]);
    }
  }, [user.name]);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
      reactions: {
        thumbsUp: 0,
        thumbsDown: 0
      }
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setShowEmojiPicker(false);
    setShowLanguagePicker(false);

    // Simulate AI response
    setTimeout(() => {
      let botResponse = generateBotResponse(input);
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponse.content,
        sender: 'bot',
        timestamp: new Date(),
        codeBlock: botResponse.codeBlock,
        reactions: {
          thumbsUp: 0,
          thumbsDown: 0
        }
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    
    // Check for greetings
    if (lowerInput.match(/^(hi|hello|hey|greetings)/i)) {
      return {
        content: commonResponses.greeting[Math.floor(Math.random() * commonResponses.greeting.length)],
      };
    }

    // Check for help requests
    if (lowerInput.match(/help|what can you do|capabilities/i)) {
      return {
        content: commonResponses.help[Math.floor(Math.random() * commonResponses.help.length)],
      };
    }

    // Check for CodeCampus related questions
    if (lowerInput.match(/what is codecampus|about codecampus|tell me about codecampus/i)) {
      return {
        content: commonResponses.aboutCodeCampus[Math.floor(Math.random() * commonResponses.aboutCodeCampus.length)],
      };
    }

    // Check for site features questions
    if (lowerInput.match(/features|what can i do|what does it offer|capabilities of the site/i)) {
      return {
        content: commonResponses.siteFeatures[Math.floor(Math.random() * commonResponses.siteFeatures.length)],
      };
    }

    // Check for uses questions
    if (lowerInput.match(/uses|how to use|what can i use it for|purpose|benefits/i)) {
      return {
        content: commonResponses.uses[Math.floor(Math.random() * commonResponses.uses.length)],
      };
    }

    // Check for how to use questions
    if (lowerInput.match(/how to use|how do i use|getting started|start using|begin using/i)) {
      return {
        content: commonResponses.howToUse[Math.floor(Math.random() * commonResponses.howToUse.length)],
      };
    }

    // Check for getting started questions
    if (lowerInput.match(/getting started|first steps|begin|start|new user/i)) {
      return {
        content: commonResponses.gettingStarted[Math.floor(Math.random() * commonResponses.gettingStarted.length)],
      };
    }

    // Check for programming language specific questions
    const languageMatch = programmingLanguages.find(lang => 
      lowerInput.includes(lang.name.toLowerCase()) || lowerInput.includes(lang.value)
    );

    if (languageMatch) {
      if (lowerInput.match(/what is|tell me about|explain|describe/i)) {
        return {
          content: `${languageMatch.name} ${languageMatch.icon}\n\n${languageMatch.description}\n\nKey Features:\n${languageMatch.features.map(f => `- ${f}`).join('\n')}\n\nCommon Use Cases:\n${languageMatch.useCases.map(u => `- ${u}`).join('\n')}\n\nWould you like to know more about ${languageMatch.name} programming?`,
          codeBlock: {
            language: languageMatch.value,
            code: getLanguageExample(languageMatch.value)
          }
        };
      }
      
      return {
        content: `I can help you with ${languageMatch.name} programming! ${languageMatch.icon}\nWhat specific ${languageMatch.name} question do you have?\n\nSome topics I can help with:\n- Syntax and basics\n- Best practices\n- Common patterns\n- Problem solving\n- Debugging tips`,
        codeBlock: {
          language: languageMatch.value,
          code: getLanguageExample(languageMatch.value)
        }
      };
    }

    // Default response for unrecognized input
    return {
      content: commonResponses.error[Math.floor(Math.random() * commonResponses.error.length)],
    };
  };

  const getLanguageExample = (language: string) => {
    const examples = {
      javascript: `// JavaScript example
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Arrow function
const add = (a, b) => a + b;

// Async/await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}`,
      python: `# Python example
def greet(name):
    return f'Hello, {name}!'

# List comprehension
numbers = [x for x in range(10) if x % 2 == 0]

# Context manager
with open('file.txt', 'r') as file:
    content = file.read()

# Class example
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hi, I'm {self.name} and I'm {self.age} years old."`,
      java: `// Java example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}

// Class with constructor
class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void greet() {
        System.out.println("Hi, I'm " + name + " and I'm " + age + " years old.");
    }
}`,
      cpp: `// C++ example
#include <iostream>
#include <string>

class Person {
private:
    std::string name;
    int age;

public:
    Person(std::string name, int age) : name(name), age(age) {}

    void greet() {
        std::cout << "Hi, I'm " << name << " and I'm " << age << " years old." << std::endl;
    }
};

int main() {
    Person person("John", 30);
    person.greet();
    return 0;
}`,
      typescript: `// TypeScript example
interface Person {
    name: string;
    age: number;
    greet(): string;
}

class Student implements Person {
    constructor(
        public name: string,
        public age: number,
        private studentId: string
    ) {}

    greet(): string {
        return \`Hello, I'm \${this.name} and I'm \${this.age} years old.\`;
    }

    getStudentId(): string {
        return this.studentId;
    }
}

// Generic function
function identity<T>(arg: T): T {
    return arg;
}`
    };
    return examples[language as keyof typeof examples] || examples.javascript;
  };

  const handleEmojiSelect = (emoji: any) => {
    setInput(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleLanguageSelect = (language: string) => {
    setInput(prev => prev + ` ${language} `);
    setShowLanguagePicker(false);
  };

  const handleReaction = (messageId: string, reaction: 'thumbsUp' | 'thumbsDown') => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          reactions: {
            ...msg.reactions,
            [reaction]: msg.reactions[reaction] + 1
          }
        };
      }
      return msg;
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          className="fixed bottom-6 right-6 rounded-full h-16 w-16 p-0 shadow-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 transform hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Bot size={32} className="text-primary-foreground" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="fixed bottom-24 right-6 w-96 h-[600px] flex flex-col shadow-2xl border-0 bg-gradient-to-b from-background to-background/95 backdrop-blur-sm">
              <div className="flex items-center justify-between bg-gradient-to-r from-primary to-primary/90 text-primary-foreground p-4 rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="h-6 w-6" />
                  <h3 className="font-semibold text-lg">CodeCampus Assistant</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-primary-foreground hover:bg-primary/80"
                    onClick={toggleTheme}
                  >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-primary-foreground hover:bg-primary/80"
                    onClick={() => setIsOpen(false)}
                  >
                    <X size={18} />
                  </Button>
                </div>
              </div>

              <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground'
                          : 'bg-secondary/50 text-secondary-foreground backdrop-blur-sm'
                      }`}
                    >
                      <div className="text-xs opacity-80 mb-1">
                        {format(message.timestamp, 'h:mm a')}
                      </div>
                      <div className="prose dark:prose-invert max-w-none">
                        {message.content}
                      </div>
                      {message.codeBlock && (
                        <div className="mt-3 rounded-lg overflow-hidden relative group">
                          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-primary"
                              onClick={() => handleCopyCode(message.codeBlock!.code)}
                            >
                              {copiedCode === message.codeBlock!.code ? (
                                <Check size={16} className="text-green-500" />
                              ) : (
                                <Copy size={16} />
                              )}
                            </Button>
                          </div>
                          <SyntaxHighlighter
                            language={message.codeBlock.language}
                            style={theme === 'dark' ? vscDarkPlus : vs}
                            customStyle={{
                              margin: 0,
                              borderRadius: '0.5rem',
                              backgroundColor: 'hsl(var(--muted))',
                            }}
                          >
                            {message.codeBlock.code}
                          </SyntaxHighlighter>
                        </div>
                      )}
                      {message.sender === 'bot' && (
                        <div className="flex items-center space-x-2 mt-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10"
                            onClick={() => handleReaction(message.id, 'thumbsUp')}
                          >
                            <ThumbsUp size={14} />
                            {message.reactions.thumbsUp > 0 && (
                              <span className="ml-1 text-xs">{message.reactions.thumbsUp}</span>
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10"
                            onClick={() => handleReaction(message.id, 'thumbsDown')}
                          >
                            <ThumbsDown size={14} />
                            {message.reactions.thumbsDown > 0 && (
                              <span className="ml-1 text-xs">{message.reactions.thumbsDown}</span>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-secondary/50 text-secondary-foreground rounded-2xl px-4 py-3 backdrop-blur-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              <div className="p-4 border-t border-border/50">
                <div className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask a question..."
                    className="flex-grow rounded-xl bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary"
                  />
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <Smile size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10"
                      onClick={() => setShowLanguagePicker(!showLanguagePicker)}
                    >
                      <Languages size={20} />
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      className="h-10 w-10 p-0 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
                      disabled={!input.trim() || isTyping}
                    >
                      <Send size={20} className="text-primary-foreground" />
                    </Button>
                  </div>
                </div>
                {showEmojiPicker && (
                  <div className="absolute bottom-24 right-6">
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} theme={theme} />
                  </div>
                )}
                {showLanguagePicker && (
                  <div className="absolute bottom-24 right-6 bg-background/95 border border-border/50 rounded-xl p-2 shadow-xl backdrop-blur-sm">
                    {programmingLanguages.map((lang) => (
                      <Button
                        key={lang.value}
                        variant="ghost"
                        className="w-full justify-start rounded-lg hover:bg-primary/10"
                        onClick={() => handleLanguageSelect(lang.name)}
                      >
                        <span className="mr-2">{lang.icon}</span>
                        {lang.name}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiChatbot;