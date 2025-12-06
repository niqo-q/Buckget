import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Sparkles, TrendingUp, PiggyBank } from 'lucide-react';
import { useWallet } from '../../App';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  action?: {
    type: 'split';
    get: number;
    save: number;
  };
}

export function AIAgent() {
  const { wallet, buckets } = useWallet();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm Axel, your AI financial advisor 🦎 \n\nYou have $${wallet.currentAvailable.toFixed(2)} available. Would you like me to suggest an optimal split?`,
      sender: 'ai',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('split') || lowerMessage.includes('suggest')) {
      const emergencyBucket = buckets.find(b => b.name === 'Emergency Fund');
      const needAmount = emergencyBucket ? emergencyBucket.target - emergencyBucket.current : 0;
      const suggestedSave = Math.min(needAmount, wallet.currentAvailable * 0.3);
      const suggestedGet = wallet.currentAvailable - suggestedSave;

      return {
        id: Date.now().toString(),
        text: `Based on your goals, I recommend:\n\n💰 Get: $${suggestedGet.toFixed(2)}\n🐷 Save: $${suggestedSave.toFixed(2)}\n\nThis will help you reach your Emergency Fund goal faster!`,
        sender: 'ai',
        action: {
          type: 'split',
          get: suggestedGet,
          save: suggestedSave,
        },
      };
    }

    if (lowerMessage.includes('bucket') || lowerMessage.includes('goal')) {
      const topBucket = buckets[0];
      return {
        id: Date.now().toString(),
        text: `Your top priority is "${topBucket.name}" ${topBucket.emoji}\n\nYou've saved $${topBucket.current} out of $${topBucket.target}. Keep it up!`,
        sender: 'ai',
      };
    }

    if (lowerMessage.includes('spend') || lowerMessage.includes('budget')) {
      return {
        id: Date.now().toString(),
        text: `Here's a smart budgeting tip: Follow the 50/30/20 rule!\n\n• 50% for needs\n• 30% for wants\n• 20% for savings\n\nYou're doing great! 🎯`,
        sender: 'ai',
      };
    }

    return {
      id: Date.now().toString(),
      text: `I can help you with:\n\n✨ Optimal wage splits\n💰 Savings strategies\n📊 Budget planning\n🎯 Goal tracking\n\nWhat would you like to know?`,
      sender: 'ai',
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const quickActions = [
    'Suggest a split',
    'Show my goals',
    'Budget tips',
  ];

  return (
    <div className="min-h-screen flex flex-col text-white">
      {/* Header */}
      <motion.div
        className="p-6 pb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="text-4xl">🦎</div>
          <div>
            <h1
              className="text-3xl"
              style={{ fontFamily: '"Momo Trust Display", sans-serif', fontWeight: 800 }}
            >
              Axel AI
            </h1>
            <p className="text-white/70 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              Your financial copilot
            </p>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 pb-48">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                className={`max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-[#FEFF09] text-[#0F172A] rounded-3xl rounded-br-md'
                    : 'bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-3xl rounded-bl-md'
                } p-4`}
              >
                <p
                  className="whitespace-pre-line"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {message.text}
                </p>
                
                {message.action && (
                  <motion.button
                    className="w-full bg-[#0F172A] text-[#FEFF09] mt-3 py-3 rounded-full text-sm"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Apply This Split
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl rounded-bl-md p-4">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Stats */}
      <motion.div
        className="fixed bottom-32 left-0 right-0 max-w-md mx-auto px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#FEFF09]" />
              <div>
                <p className="text-white/70 text-xs">Available</p>
                <p className="text-sm" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
                  ${wallet.currentAvailable}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-[#FF44EC]" />
              <div>
                <p className="text-white/70 text-xs">Saved</p>
                <p className="text-sm" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
                  ${wallet.totalSaved}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto px-6">
        {/* Quick Actions */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
          {quickActions.map((action, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setInput(action);
              }}
              className="flex-shrink-0 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm rounded-full hover:bg-white/20 transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {action}
            </motion.button>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white/20 backdrop-blur-md border border-white/20 rounded-full p-2 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Axel anything..."
            className="flex-1 px-4 py-2 bg-transparent text-white placeholder-white/50 focus:outline-none"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
          <motion.button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 bg-[#FEFF09] text-[#0F172A] rounded-full flex items-center justify-center disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}