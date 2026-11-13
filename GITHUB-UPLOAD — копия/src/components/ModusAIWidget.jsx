import React, { useState } from 'react';
import { Sparkles, Send, Bot, CheckCircle, Search, Lightbulb } from 'lucide-react';
import { askGemini } from '../lib/gemini';

export default function ModusAIWidget({ onSelectTicket, openCreateModal }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Привет! Я официальный MODUS AI на базе Gemini 2.5 Flash. Помогу найти решение, составить обращение или выявить очаги проблем в ГК «Модус Трейд».',
      time: 'только что'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    { label: 'Найти похожие проблемы', action: 'similar' },
    { label: 'Предложить решение', action: 'solution' },
    { label: 'Узнать статус обращения', action: 'status' }
  ];

  const handleSend = async (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: 'сейчас'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const context = `В базе 20 обращений. Ключевые кластеры:
1. Спецификации и номенклатура (A-001, A-003, A-013) - разрыв Закупки и Проектирование.
2. Интеграции и IT (A-005, A-007, A-009, A-011, A-012) - повторный ввод в 1С, срывы сроков ответов смежников.
3. Обучение и адаптация (A-004, A-008, A-016) - семинары и онбординг.
4. Открытость (A-020) - публикация дайджеста успехов.`;

    const aiAnswer = await askGemini(text, context);

    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiAnswer,
        time: 'только что'
      }
    ]);
    setIsTyping(false);
  };

  const handleQuickPrompt = (action) => {
    if (action === 'similar') {
      handleSend('Покажи повторяющиеся проблемы по номенклатуре и артикулам');
    } else if (action === 'solution') {
      handleSend('Какое системное решение предлагается по ручному вводу в 1С?');
    } else if (action === 'status') {
      handleSend('Какой статус у обращения A-003 и кто назначен ответственным?');
    }
  };

  return (
    <div className="relative rounded-3xl p-5 bg-gradient-to-b from-[#101b3d] to-[#0c142c] border border-blue-500/30 shadow-[0_0_30px_rgba(37,99,235,0.18)] flex flex-col justify-between overflow-hidden h-[380px]">
      {/* Background glow orb */}
      <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-blue-500/20 blur-2xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shadow-glow-blue">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-white tracking-wider flex items-center gap-1.5">
              <span>MODUS AI</span>
              <span className="text-[9px] font-bold text-cyan-300 px-1.5 py-0.2 rounded bg-cyan-500/10 border border-cyan-500/20">Gemini 2.5</span>
            </div>
            <div className="text-[9px] text-slate-400">Нейро-ассистент компании</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Онлайн</span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="my-3 flex-1 overflow-y-auto space-y-2.5 pr-1 relative z-10 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[88%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-white/[0.07] text-slate-200 border border-white/5 rounded-tl-none shadow-md backdrop-blur-md'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[9px] text-slate-500 mt-1 px-1">{m.time}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/[0.04] w-20 text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" />
            <span className="text-[10px] text-blue-300 font-bold">Думает...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts Chips */}
      <div className="space-y-1.5 mb-3 relative z-10">
        {quickPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleQuickPrompt(p.action)}
            className="w-full text-left px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-blue-600/20 border border-white/5 hover:border-blue-500/30 text-[11px] text-slate-300 hover:text-white flex items-center justify-between transition-colors group"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:scale-125 transition-transform"></span>
              <span>{p.label}</span>
            </div>
            <span className="text-[10px] text-slate-500 group-hover:text-blue-400">→</span>
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <div className="relative z-10 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Спросите AI об обращении или идее..."
          className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50"
        />
        <button
          onClick={() => handleSend()}
          className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white shadow-glow-blue transition-colors flex-shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
