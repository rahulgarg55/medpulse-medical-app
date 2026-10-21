import React, { useState } from 'react';
import { ChatMessage } from '../types';
import { Bot, Send, Sparkles, AlertTriangle, ShieldCheck, User } from 'lucide-react';

export const ClaudeAITab: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'claude',
      text: 'Hello Rahul! I am your MedPulse Claude Clinical Assistant. You can ask me to review symptoms, check drug-to-drug interactions, or explain lab parameters.',
      timestamp: '9:40 AM'
    }
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);

  const quickPrompts = [
    'Can I take Ibuprofen with Metformin?',
    'Fasting blood glucose 124 mg/dL interpretation',
    'Dry persistent cough with 100°F fever'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setThinking(true);

    setTimeout(() => {
      let reply: ChatMessage;
      const lower = text.toLowerCase();

      if (lower.includes('ibuprofen') && lower.includes('metformin')) {
        reply = {
          id: `cld-${Date.now()}`,
          sender: 'claude',
          text: 'Ibuprofen (NSAID) and Metformin can be used concurrently with caution. However, high-dose or prolonged NSAID use can transiently reduce renal blood flow, which may decrease metformin excretion and increase the rare risk of lactic acidosis. Always consult your prescribing physician before combining NSAIDs with antidiabetics.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          urgencyTag: 'Moderate Concern',
          interactionWarning: 'Renal Clearance & Lactic Acidosis Caution',
          specialistReferral: 'Dr. Arun Varma, MD (Endocrinologist)'
        };
      } else if (lower.includes('glucose') || lower.includes('124')) {
        reply = {
          id: `cld-${Date.now()}`,
          sender: 'claude',
          text: 'A fasting blood glucose of 124 mg/dL falls within the impaired fasting glucose (prediabetes) threshold (100–125 mg/dL) per American Diabetes Association guidelines. Normal fasting levels are below 100 mg/dL, and diabetes is typically diagnosed at ≥ 126 mg/dL on two separate occasions.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          urgencyTag: 'Moderate Concern',
          specialistReferral: 'Dr. Arun Varma, MD (Endocrinologist)'
        };
      } else {
        reply = {
          id: `cld-${Date.now()}`,
          sender: 'claude',
          text: 'Based on your reported symptoms, this may indicate an acute upper respiratory infection or seasonal bronchitis. Monitor your oxygen saturation (SpO2) using the Vitals tab. If fever exceeds 102°F or you experience shortness of breath, please seek emergency medical attention immediately.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          urgencyTag: 'Moderate Concern',
          specialistReferral: 'Dr. Elena Rostova, PhD, MD (Pulmonologist)'
        };
      }

      setMessages(prev => [...prev, reply]);
      setThinking(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[740px] p-4">
      {/* Header */}
      <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-teal-400 flex items-center justify-center text-slate-950 font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Claude Medical Triage</span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Claude 3.5 Sonnet
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">Context-Aware Clinical Decision Support</p>
          </div>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      </div>

      {/* Quick Suggestion Chips */}
      <div className="py-2.5 flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-[10px] text-teal-300 border border-teal-500/20 whitespace-nowrap transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-2.5 h-2.5" />
            <span>{p}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl p-3 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-teal-600 text-white rounded-br-none shadow-md'
                  : 'bg-slate-800/90 text-slate-200 border border-slate-700/70 rounded-bl-none shadow-sm'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[10px] font-bold text-slate-400">
                {msg.sender === 'user' ? (
                  <>
                    <User className="w-3 h-3" />
                    <span>You</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-3 h-3 text-amber-400" />
                    <span className="text-amber-300">Claude Clinical AI</span>
                  </>
                )}
                <span>• {msg.timestamp}</span>
              </div>

              <p className="text-slate-100">{msg.text}</p>

              {/* Urgency & Warnings */}
              {msg.urgencyTag && (
                <div className="mt-2.5 pt-2 border-t border-slate-700/60 space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      {msg.urgencyTag}
                    </span>
                    {msg.specialistReferral && (
                      <span className="text-[10px] text-teal-300 font-semibold">
                        Referral: {msg.specialistReferral}
                      </span>
                    )}
                  </div>

                  {msg.interactionWarning && (
                    <div className="flex items-center gap-1 text-[10px] text-rose-300 bg-rose-950/40 border border-rose-500/30 p-1.5 rounded-lg">
                      <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
                      <span>{msg.interactionWarning}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex items-center gap-2 p-3 bg-slate-800/60 rounded-2xl max-w-[60%] border border-slate-700/50">
            <Bot className="w-4 h-4 text-amber-400 animate-spin" />
            <span className="text-xs text-slate-400">Claude is reviewing clinical safety guidelines...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="pt-3 border-t border-slate-800 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask Claude about symptoms or dosages..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 bg-slate-800 text-xs text-white rounded-xl border border-slate-700 placeholder-slate-500 focus:outline-none focus:border-teal-500"
        />
        <button
          type="submit"
          className="p-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-all shadow-md shadow-teal-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
