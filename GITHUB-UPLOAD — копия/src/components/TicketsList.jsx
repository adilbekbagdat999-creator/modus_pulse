import React from 'react';
import { AlertCircle, CheckCircle2, Clock, HelpCircle, ArrowRight, Sparkles, Filter } from 'lucide-react';

export default function TicketsList({ tickets, onSelectTicket, onViewAll, limit = 5 }) {
  const displayTickets = limit ? tickets.slice(0, limit) : tickets;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Реализовано':
      case 'Закрыто':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Решено
          </span>
        );
      case 'В работе':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            В работе
          </span>
        );
      case 'На рассмотрении':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            На рассмотрении
          </span>
        );
      case 'Ожидает уточнения':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
            Уточнение
          </span>
        );
      case 'Отклонено':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
            Отклонено
          </span>
        );
      default: // Новое
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            Новое
          </span>
        );
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'Высокий') {
      return (
        <div className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center flex-shrink-0" title="Высокий приоритет">
          <AlertCircle className="w-3.5 h-3.5" />
        </div>
      );
    }
    return (
      <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0" title="Стандартный приоритет">
        <Sparkles className="w-3.5 h-3.5" />
      </div>
    );
  };

  return (
    <div className="p-6 rounded-3xl bg-[#0f172a]/70 backdrop-blur-md border border-white/5 shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-white tracking-wide">
            Последние обращения
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Всего в базе {tickets.length} обращений из ТЗ
          </p>
        </div>

        {onViewAll && (
          <button
            onClick={onViewAll}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>Все обращения</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Tickets List Items */}
      <div className="space-y-2.5">
        {displayTickets.map((ticket) => (
          <div
            key={ticket.id}
            onClick={() => onSelectTicket(ticket.id)}
            className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-blue-500/30 cursor-pointer transition-all duration-200 flex items-center justify-between gap-4 group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              {getPriorityIcon(ticket.priority)}

              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[11px] font-mono font-bold text-blue-400 group-hover:text-cyan-300 transition-colors">
                    #{ticket.id}
                  </span>
                  <span className="text-xs font-bold text-white truncate max-w-xs sm:max-w-md group-hover:text-blue-200 transition-colors">
                    {ticket.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span>{ticket.author.name}</span>
                  <span>•</span>
                  <span>{ticket.department}</span>
                  {ticket.chat && ticket.chat.length > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-blue-400 font-medium">💬 {ticket.chat.length} сообщ.</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              {getStatusBadge(ticket.status)}
              <span className="text-[10px] text-slate-500 hidden sm:inline-block">
                {ticket.createdAt.split('T')[0].split('-').slice(1).join('.')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
