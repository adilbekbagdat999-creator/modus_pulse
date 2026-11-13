import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  UserCheck, 
  ArrowRight, 
  Sparkles, 
  Filter,
  Calendar,
  Layers
} from 'lucide-react';

export default function DirectorOrganizer({ tickets, onSelectTicket, onUpdateTicket }) {
  const [filterMode, setFilterMode] = useState('urgent'); // urgent, in_work, all

  const urgentTickets = tickets.filter(t => t.status === 'Новое' || t.status === 'Ожидает уточнения');
  const inWorkTickets = tickets.filter(t => t.status === 'В работе' || t.status === 'На рассмотрении');
  const resolvedTickets = tickets.filter(t => t.status === 'Реализовано' || t.status === 'Закрыто');

  const displayedList = filterMode === 'urgent' ? urgentTickets : filterMode === 'in_work' ? inWorkTickets : tickets;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-[#131c36] to-[#0a1228] border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Умный органайзер руководства</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
            Все вопросы компании в одном окне — без блокнотов и забытых задач
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Система автоматически группирует обращения, ранжирует по срочности и готовит варианты решений, экономя до 5 часов в неделю.
          </p>
        </div>
      </div>

      {/* Quick Summary Pill Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setFilterMode('urgent')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            filterMode === 'urgent'
              ? 'bg-amber-500/15 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
              : 'bg-[#0f172a]/60 border-white/5 hover:border-white/10'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
              !
            </div>
            <span className="text-2xl font-black text-amber-400">{urgentTickets.length}</span>
          </div>
          <div className="text-xs font-bold text-white">Требуют вашего решения</div>
          <div className="text-[11px] text-slate-400">Новые обращения без ответа</div>
        </button>

        <button
          onClick={() => setFilterMode('in_work')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            filterMode === 'in_work'
              ? 'bg-blue-500/15 border-blue-500/40 shadow-[0_0_20px_rgba(37,99,235,0.15)]'
              : 'bg-[#0f172a]/60 border-white/5 hover:border-white/10'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-2xl font-black text-blue-400">{inWorkTickets.length}</span>
          </div>
          <div className="text-xs font-bold text-white">В работе у подразделений</div>
          <div className="text-[11px] text-slate-400">На контроле исполнения</div>
        </button>

        <button
          onClick={() => setFilterMode('all')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            filterMode === 'all'
              ? 'bg-emerald-500/15 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
              : 'bg-[#0f172a]/60 border-white/5 hover:border-white/10'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-2xl font-black text-emerald-400">{resolvedTickets.length}</span>
          </div>
          <div className="text-xs font-bold text-white">Успешно решено</div>
          <div className="text-[11px] text-slate-400">Результат зафиксирован</div>
        </button>
      </div>

      {/* Task Cards List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            {filterMode === 'urgent' ? '🔥 Горящие задачи для согласования' : 'Список задач'}
          </h2>
          <span className="text-xs text-slate-400">Всего в списке: {displayedList.length}</span>
        </div>

        {displayedList.map((ticket) => (
          <div
            key={ticket.id}
            className="p-5 rounded-2xl bg-[#0f172a]/80 border border-white/5 hover:border-amber-500/30 shadow-lg transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
          >
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400">
                  #{ticket.id}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/5 text-slate-300">
                  {ticket.department}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400">
                  {ticket.category}
                </span>
                {ticket.priority === 'Высокий' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 animate-pulse">
                    Срочно
                  </span>
                )}
              </div>

              <h3 
                onClick={() => onSelectTicket(ticket.id)}
                className="text-sm font-bold text-white group-hover:text-amber-300 cursor-pointer transition-colors"
              >
                {ticket.title}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-1">
                {ticket.description}
              </p>

              {ticket.costOfInaction && (
                <div className="text-[11px] font-semibold text-amber-400/90 flex items-center gap-1.5 pt-1">
                  <span>Потери бездействия:</span>
                  <span className="text-white font-bold">{ticket.costOfInaction}</span>
                </div>
              )}
            </div>

            {/* Direct Quick Action Buttons */}
            <div className="flex items-center gap-2.5 flex-shrink-0 self-end md:self-center">
              <button
                onClick={() => onSelectTicket(ticket.id)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
              >
                <span>Открыть карточку</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
