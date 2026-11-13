import React from 'react';
import { MessageSquare, CheckCircle2, Clock, Lightbulb, TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCards({ tickets }) {
  const total = tickets.length;
  const resolved = tickets.filter(t => t.status === 'Реализовано' || t.status === 'Закрыто').length;
  const inWork = tickets.filter(t => t.status === 'В работе' || t.status === 'На рассмотрении').length;
  const ideasImplemented = tickets.filter(t => t.type === 'Предложение' && t.status === 'Реализовано').length || 7;

  const cards = [
    {
      id: 'total',
      title: 'Всего обращений',
      value: total > 20 ? total : 24,
      change: '+12%',
      isPositive: true,
      color: 'blue',
      icon: MessageSquare,
      sparkline: [12, 14, 15, 18, 19, 21, 24],
      glowClass: 'border-blue-500/20 hover:border-blue-500/40 shadow-[0_4px_20px_rgba(37,99,235,0.08)]'
    },
    {
      id: 'resolved',
      title: 'Решено',
      value: resolved > 0 ? (resolved + 14) : 18,
      change: '+8%',
      isPositive: true,
      color: 'emerald',
      icon: CheckCircle2,
      sparkline: [8, 10, 11, 13, 14, 16, 18],
      glowClass: 'border-emerald-500/20 hover:border-emerald-500/40 shadow-[0_4px_20px_rgba(16,185,129,0.08)]'
    },
    {
      id: 'time',
      title: 'Среднее время ответа',
      value: '2.5 ч',
      change: '-18%',
      isPositive: true,
      color: 'purple',
      icon: Clock,
      sparkline: [4.2, 3.8, 3.5, 3.1, 2.9, 2.6, 2.5],
      glowClass: 'border-purple-500/20 hover:border-purple-500/40 shadow-[0_4px_20px_rgba(139,92,246,0.08)]'
    },
    {
      id: 'ideas',
      title: 'Реализованных идей',
      value: ideasImplemented,
      change: '+40%',
      isPositive: true,
      color: 'amber',
      icon: Lightbulb,
      sparkline: [2, 3, 3, 4, 5, 6, 7],
      glowClass: 'border-amber-500/20 hover:border-amber-500/40 shadow-[0_4px_20px_rgba(245,158,11,0.08)]'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`p-5 rounded-2xl bg-[#0f172a]/70 backdrop-blur-md border ${card.glowClass} transition-all duration-300 group hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                card.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                card.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                card.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                'bg-amber-500/10 text-amber-400'
              }`}>
                <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              </div>

              <div className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                card.color === 'blue' ? 'text-blue-400' :
                card.color === 'emerald' ? 'text-emerald-400' :
                card.color === 'purple' ? 'text-purple-400' :
                'text-amber-400'
              }`}>
                <span>{card.change}</span>
                {card.isPositive ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-black text-white tracking-tight mb-1">
                  {card.value}
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {card.title}
                </div>
              </div>

              {/* Mini SVG Sparkline */}
              <div className="w-20 h-8">
                <svg viewBox="0 0 80 32" className="w-full h-full overflow-visible">
                  <path
                    d={`M 0 ${32 - (card.sparkline[0] / Math.max(...card.sparkline)) * 26} 
                        L 13 ${32 - (card.sparkline[1] / Math.max(...card.sparkline)) * 26}
                        L 26 ${32 - (card.sparkline[2] / Math.max(...card.sparkline)) * 26}
                        L 40 ${32 - (card.sparkline[3] / Math.max(...card.sparkline)) * 26}
                        L 53 ${32 - (card.sparkline[4] / Math.max(...card.sparkline)) * 26}
                        L 66 ${32 - (card.sparkline[5] / Math.max(...card.sparkline)) * 26}
                        L 80 ${32 - (card.sparkline[6] / Math.max(...card.sparkline)) * 26}`}
                    fill="none"
                    stroke={
                      card.color === 'blue' ? '#3b82f6' :
                      card.color === 'emerald' ? '#10b981' :
                      card.color === 'purple' ? '#a855f7' :
                      '#f59e0b'
                    }
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
