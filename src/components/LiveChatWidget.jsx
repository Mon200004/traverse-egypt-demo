import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, Phone } from 'lucide-react';

export default function LiveChatWidget({ onOpenCustomBuilder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Marhaban & Welcome to Traverse Egypt! I am Amina, Senior Egyptologist Concierge. How may I assist in orchestrating your voyage to Egypt today?',
      time: 'Just now'
    }
  ]);

  const quickQuestions = [
    'When is the best season for Nile cruises?',
    'What is included in the Royal Dahabiya package?',
    'How do we obtain the Egypt Tourist Visa?',
    'Can we request private access between the Sphinx paws?'
  ];

  const botResponses = {
    'When is the best season for Nile cruises?': 'The golden months from October through April offer idyllic weather with warm daytime sun (22°C–26°C) and crisp starlit evenings along the Nile. Winter (Dec–Feb) is our most celebrated season.',
    'What is included in the Royal Dahabiya package?': 'Our Royal Dahabiya package includes 7 nights aboard our private wind-powered wooden sailboat, master Egyptologist guide, full-board gourmet chef dining, private island moorings, and all VIP temple permits.',
    'How do we obtain the Egypt Tourist Visa?': 'Citizens of USA, UK, Canada, Australia, and the EU can obtain an instant eVisa online for $25 USD, or purchase a Visa-on-Arrival stamp directly at Cairo Airport before passport control. Our airport concierge assists on arrival.',
    'Can we request private access between the Sphinx paws?': 'Yes! Traverse Egypt holds exclusive Antiquities Ministry permits allowing our private guests to step between the monumental paws of the Great Sphinx outside normal opening hours, accompanied by a senior archaeologist.'
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = { sender: 'user', text, time: 'Just now' };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');

    setTimeout(() => {
      let reply = "Thank you for inquiring! Our bespoke travel designers specialize in handcrafted pharaonic journeys. Would you like to design a tailor-made expedition with custom dates and private guides?";
      
      if (botResponses[text]) {
        reply = botResponses[text];
      } else if (text.toLowerCase().includes('price') || text.toLowerCase().includes('cost')) {
        reply = "Our curated expeditions range from $1,150 for boutique Cairo stays to $3,200 for all-inclusive 8-day Royal Dahabiya sails. All include 5-star heritage hotels and private Egyptologists.";
      } else if (text.toLowerCase().includes('safe') || text.toLowerCase().includes('security')) {
        reply = "Egypt is exceptionally hospitable and welcoming to travelers. Traverse Egypt provides 24/7 chauffeured Mercedes vehicles, vetted personnel, and direct coordination with Tourism Police.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply, time: 'Just now' }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide shadow-xl shadow-amber-500/30 hover:scale-105 transition-all"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950" />
          </span>
          <MessageSquare className="w-4 h-4 text-slate-950" />
          <span className="hidden sm:inline">24/7 Egyptologist Concierge</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[390px] h-[520px] rounded-2xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden text-slate-800 animate-fadeIn">
          
          {/* Header in Deep Nile Navy */}
          <div className="px-4 py-3 bg-[#05233e] border-b border-sky-900 flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                  alt="Amina Concierge"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-400"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-1 ring-[#05233e]" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs text-white">Dr. Amina El-Sayed</h4>
                <p className="text-[10px] text-amber-300 font-medium">Senior Egyptologist • Traverse Concierge</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-[#fbf9f5]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-2xl leading-relaxed font-normal ${
                    m.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-bold rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Question Buttons */}
          <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex gap-1.5 overflow-x-auto scrollbar-none">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-[10px] font-semibold border border-slate-200 transition-colors shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Dr. Amina anything about Egypt..."
              className="flex-1 bg-[#fbf9f5] text-slate-900 text-xs rounded-xl px-3 py-2 border border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
