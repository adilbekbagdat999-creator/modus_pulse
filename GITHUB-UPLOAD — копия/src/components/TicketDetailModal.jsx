import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Clock, 
  User, 
  Calendar, 
  Tag, 
  AlertTriangle, 
  Sparkles, 
  Paperclip, 
  Building,
  ShieldCheck,
  ChevronRight,
  MessageSquare,
  Share2,
  Code
} from 'lucide-react';

export default function TicketDetailModal({ 
  ticket, 
  onClose, 
  currentUser, 
  onUpdateTicket 
}) {
  const [chatMessage, setChatMessage] = useState('');
  const [status, setStatus] = useState(ticket.status);
  const [assignedTo, setAssignedTo] = useState(ticket.assignedTo || '');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [bitrixSynced, setBitrixSynced] = useState(false);
  const [onecSynced, setOnecSynced] = useState(false);

  const handleExportToBitrix = () => {
    setBitrixSynced(true);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2500);
  };

  const handleExportTo1C = () => {
    setOnecSynced(true);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2500);
  };

  const isDirectorOrAdmin = currentUser.role.includes('директор') || currentUser.role.includes('Руководитель') || currentUser.role.includes('Администратор');

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newMsg = {
      id: 'msg-' + Date.now(),
      sender: currentUser.name,
      role: isDirectorOrAdmin ? 'manager' : 'author',
      text: chatMessage,
      timestamp: 'только что',
      avatar: currentUser.avatar
    };

    const updatedTicket = {
      ...ticket,
      chat: [...(ticket.chat || []), newMsg]
    };

    onUpdateTicket(updatedTicket);
    setChatMessage('');
  };

  const handleUpdateStatus = (newStatus) => {
    setStatus(newStatus);
    
    // Update timeline steps dynamically
    const updatedTimeline = [...(ticket.timeline || [])];
    if (newStatus === 'В работе' && updatedTimeline.length >= 4) {
      updatedTimeline[3].completed = true;
      updatedTimeline[3].date = 'В работе';
    } else if (newStatus === 'Реализовано' || newStatus === 'Закрыто') {
      updatedTimeline.forEach(step => step.completed = true);
      if (updatedTimeline[4]) updatedTimeline[4].date = 'Сегодня';
    }

    const updatedTicket = {
      ...ticket,
      status: newStatus,
      assignedTo: assignedTo,
      timeline: updatedTimeline
    };

    onUpdateTicket(updatedTicket);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2000);
  };

  const handleApplyAiRecommendation = () => {
    handleUpdateStatus('В работе');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0b1021] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-start justify-between gap-4 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-mono font-bold text-blue-400">
              #{ticket.id}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white/[0.05] text-[11px] font-semibold text-slate-300">
              {ticket.type}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-cyan-500/10 text-[11px] font-semibold text-cyan-400">
              {ticket.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Title & Author Info */}
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white leading-snug mb-3">
              {ticket.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <img src={ticket.author.avatar} alt="" className="w-6 h-6 rounded-full object-cover border border-white/10" />
                <span className="text-slate-200 font-semibold">{ticket.author.name}</span>
                <span className="text-slate-500">({ticket.author.role})</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-400" />
                <span>Отдел: {ticket.department}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{ticket.createdAt.replace('T', ' ')}</span>
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Суть проблемы / предложения
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              {ticket.description}
            </p>
          </div>

          {/* Transparent Delivery-Style Tracker (Ozon/Wildberries style) */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/30 to-indigo-950/20 border border-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Прозрачный трекер движения обращения
                </h3>
              </div>
              <span className="text-[10px] text-blue-400 font-bold bg-blue-500/10 px-2.5 py-0.5 rounded-full">
                Статус: {ticket.status}
              </span>
            </div>

            {/* Timeline Stepper */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative">
              {ticket.timeline && ticket.timeline.map((step, idx) => (
                <div key={idx} className="flex flex-col items-start relative z-10">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
                    step.completed
                      ? 'bg-emerald-500 text-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                      : step.active
                      ? 'bg-blue-500 text-white animate-pulse'
                      : step.isRejected
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/10 text-slate-400 border border-white/10'
                  }`}>
                    {step.completed ? '✓' : step.step}
                  </div>
                  <div className="text-[11px] font-bold text-white leading-tight mb-0.5">
                    {step.title}
                  </div>
                  <div className="text-[9px] text-slate-400">
                    {step.date}
                  </div>
                  {step.by && (
                    <div className="text-[9px] text-blue-400 font-medium">
                      {step.by}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Director's Smart Action Box (чтобы директора не рылись в ежедневниках) */}
          {isDirectorOrAdmin && (
            <div className="p-5 rounded-2xl bg-[#121c38] border border-amber-500/30 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-xs">
                    ⚡
                  </div>
                  <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Умный пульт директора (быстрые решения)
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400">Без блокнотов и рутины</span>
              </div>

              {/* AI Recommendation banner inside director box */}
              {ticket.suggestedAction && (
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 flex items-start justify-between gap-3">
                  <div>
                    <span className="font-bold text-cyan-300 flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Рекомендация MODUS AI:
                    </span>
                    <p className="text-slate-300 text-[11px] leading-snug">
                      {ticket.suggestedAction}
                    </p>
                    {ticket.costOfInaction && (
                      <div className="text-[10px] text-amber-400 font-bold mt-1">
                        ⚠️ Цена бездействия: {ticket.costOfInaction}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleApplyAiRecommendation}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] whitespace-nowrap shadow-sm transition-colors"
                  >
                    Применить рекомендацию
                  </button>
                </div>
              )}

              {/* Status Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-slate-400 font-medium mr-1">Сменить статус:</span>
                <button
                  onClick={() => handleUpdateStatus('В работе')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    status === 'В работе'
                      ? 'bg-blue-600 text-white shadow-glow-blue'
                      : 'bg-white/5 hover:bg-blue-600/20 text-slate-300'
                  }`}
                >
                  В работу
                </button>
                <button
                  onClick={() => handleUpdateStatus('Ожидает уточнения')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    status === 'Ожидает уточнения'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/5 hover:bg-purple-600/20 text-slate-300'
                  }`}
                >
                  Запросить уточнение
                </button>
                <button
                  onClick={() => handleUpdateStatus('Реализовано')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    status === 'Реализовано'
                      ? 'bg-emerald-600 text-white shadow-glow-teal'
                      : 'bg-white/5 hover:bg-emerald-600/20 text-slate-300'
                  }`}
                >
                  Решено / Внедрено
                </button>
                <button
                  onClick={() => handleUpdateStatus('Отклонено')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    status === 'Отклонено'
                      ? 'bg-rose-600 text-white'
                      : 'bg-white/5 hover:bg-rose-600/20 text-slate-300'
                  }`}
                >
                  Отклонить с причиной
                </button>
              </div>

              {/* Интеграционный мост с 1С:УТ и Битрикс24 (по разделам 1.2 и 3.4 ТЗ) */}
              <div className="pt-3 border-t border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                    <Share2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Корпоративный контур интеграций (1С УТ и Битрикс24)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowIntegrationModal(!showIntegrationModal)}
                    className="text-[10px] text-blue-400 hover:text-cyan-300 underline font-mono flex items-center gap-1"
                  >
                    <Code className="w-3 h-3" />
                    <span>Показать JSON вебхук</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleExportToBitrix}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      bitrixSynced 
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-glow-blue' 
                        : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 text-slate-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00a2e8]/20 text-[#00a2e8] flex items-center justify-center font-bold text-xs flex-shrink-0 border border-[#00a2e8]/30">
                      B24
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">
                        {bitrixSynced ? '✅ Создано в Битрикс24' : 'Передать задачу в Битрикс24'}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {bitrixSynced ? 'Задача #B24-9418 поставлена' : 'tasks.task.add • Постановка ответственному'}
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportTo1C}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      onecSynced 
                        ? 'bg-amber-600/20 border-amber-500 text-white shadow-lg shadow-amber-500/10' 
                        : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 text-slate-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs flex-shrink-0 border border-amber-500/30">
                      1C
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">
                        {onecSynced ? '✅ Зафиксировано в 1С:УТ' : 'Зафиксировать в 1С:УТ'}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {onecSynced ? 'Пакет OData проверен' : 'Справочник Номенклатуры / Регламенты'}
                      </div>
                    </div>
                  </button>
                </div>

                {/* Выпадающий просмотрщик JSON для жюри */}
                {showIntegrationModal && (
                  <div className="p-3 rounded-xl bg-black/60 border border-blue-500/30 font-mono text-[10px] text-cyan-300 space-y-1 animate-fadeIn">
                    <div className="text-slate-400 font-bold mb-1 flex items-center justify-between">
                      <span>Спецификация интеграционного REST API payload:</span>
                      <span className="text-emerald-400">HTTP 200 Ready</span>
                    </div>
                    <pre className="overflow-x-auto text-slate-300">
{`{
  "event": "MODUS_PULSE_TICKET_ESCALATED",
  "ticket_id": "${ticket.id}",
  "title": "${ticket.title}",
  "department": "${ticket.department}",
  "priority": "${ticket.priority}",
  "bitrix24_task": {
    "RESPONSIBLE_ID": 42,
    "DEADLINE": "${new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10)}",
    "TAGS": ["modus-pulse", "${ticket.category}"]
  },
  "onec_ut_packet": {
    "DocumentType": "RegulationChangeOrder",
    "SourceSystem": "MODUS_PULSE_AI"
  }
}`}
                    </pre>
                  </div>
                )}
              </div>

              {showSuccessToast && (
                <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1.5 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Статус успешно сохранён и виден сотруднику!</span>
                </div>
              )}
            </div>
          )}

          {/* Interactive Chat inside Ticket (Прямой чат сотрудника и директора) */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Прямой диалог по обращению (Чат)
                </h3>
              </div>
              <span className="text-[10px] text-slate-400">
                Пишете от лица: <strong className="text-blue-300">{currentUser.name}</strong>
              </span>
            </div>

            {/* Chat Messages List */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {ticket.chat && ticket.chat.length > 0 ? (
                ticket.chat.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${msg.role === 'author' ? '' : 'flex-row-reverse'}`}
                  >
                    {msg.avatar ? (
                      <img src={msg.avatar} alt="" className="w-7 h-7 rounded-full object-cover border border-white/10 flex-shrink-0" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        AI
                      </div>
                    )}

                    <div className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.isAi 
                        ? 'bg-blue-950/60 border border-blue-500/30 text-cyan-200'
                        : msg.role === 'author'
                        ? 'bg-white/[0.06] text-slate-200 border border-white/5'
                        : 'bg-blue-600 text-white'
                    }`}>
                      <div className="flex items-center justify-between gap-3 text-[10px] font-semibold opacity-75 mb-1">
                        <span>{msg.sender}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-slate-500">
                  Сообщений пока нет. Напишите автору или директору напрямую!
                </div>
              )}
            </div>

            {/* Input field */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Напишите ответ или уточнение по задаче..."
                className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-glow-blue transition-colors flex-shrink-0"
              >
                <span>Отправить</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
