import React, { useState } from 'react';
import { Lightbulb, ThumbsUp, Trophy, Sparkles, CheckCircle2, Award, ArrowUpRight } from 'lucide-react';

export default function IdeasMarketplaceView({ tickets, onSelectTicket }) {
  const [ideas, setIdeas] = useState([
    {
      id: 'idea-1',
      ticketId: 'A-004',
      title: 'Еженедельные воркшопы по новым товарным линейкам оборудования',
      author: 'Отдел снабжения',
      votes: 124,
      voted: false,
      bounty: '5 000 бонусов',
      status: 'Внедрено',
      impact: 'Ошибки монтажников сократились на 25%'
    },
    {
      id: 'idea-2',
      ticketId: 'A-008',
      title: 'Памятка типовых ошибок и прямых контактов для быстрого онбординга',
      author: 'Бухгалтерия',
      votes: 98,
      voted: false,
      bounty: '3 500 бонусов',
      status: 'Внедрено',
      impact: 'Время адаптации новичка снизилось с 14 до 5 дней'
    },
    {
      id: 'idea-3',
      ticketId: 'A-002',
      title: 'Открытые карточки стадий проектов для поставщиков без коммерческой тайны',
      author: 'Отдел закупок',
      votes: 87,
      voted: false,
      bounty: '4 000 бонусов',
      status: 'На рассмотрении',
      impact: 'Позволит экономить до 20 часов звонков в месяц'
    },
    {
      id: 'idea-4',
      ticketId: 'A-020',
      title: 'Ежемесячный дайджест завершенных улучшений для всех сотрудников',
      author: 'Сотрудник закупок',
      votes: 112,
      voted: false,
      bounty: '3 000 бонусов',
      status: 'Реализуется сейчас',
      impact: 'Открытость процессов и мотивация коллектива'
    }
  ]);

  const handleVote = (id) => {
    setIdeas(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          votes: item.voted ? item.votes - 1 : item.votes + 1,
          voted: !item.voted
        };
      }
      return item;
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-[#19193a] to-[#0b1021] border border-amber-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold mb-3">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Биржа Идей • Краудсорсинг улучшений</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
            Предлагайте идеи, голосуйте и получайте признание
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Коллеги голосуют за самые нужные изменения. Лучшие инициативы получают статус корпоративного проекта и поощрение.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center flex-shrink-0">
          <div className="text-xs text-amber-300 font-bold mb-1">Фонд инициатив</div>
          <div className="text-2xl font-black text-white">150 000 ₽</div>
          <div className="text-[10px] text-slate-400 mt-1">Премии за лучшие решения</div>
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ideas.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-3xl bg-[#0f172a]/80 border border-white/5 hover:border-amber-500/30 shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                  item.status === 'Внедрено'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {item.status}
                </span>

                <span className="text-[10px] font-mono font-bold text-blue-400">
                  {item.ticketId}
                </span>
              </div>

              <h3 
                onClick={() => onSelectTicket(item.ticketId)}
                className="text-sm font-bold text-white group-hover:text-amber-300 cursor-pointer transition-colors mb-2 leading-snug"
              >
                {item.title}
              </h3>

              <div className="text-[11px] text-slate-400 mb-3">
                Автор: <span className="text-slate-300 font-medium">{item.author}</span>
              </div>

              {/* Impact box */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 flex items-start gap-2 mb-4">
                <Award className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Измеримый эффект: </span>
                  <span className="text-emerald-300 font-medium">{item.impact}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <span className="text-xs font-bold text-amber-400">
                Бонус: {item.bounty}
              </span>

              <button
                onClick={() => handleVote(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  item.voted
                    ? 'bg-amber-500 text-slate-900 shadow-glow-amber'
                    : 'bg-white/5 hover:bg-amber-500/20 text-slate-300'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>+1 ({item.votes})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
