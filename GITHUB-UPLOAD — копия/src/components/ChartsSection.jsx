import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

export default function ChartsSection() {
  const [period, setPeriod] = useState('За месяц');

  // Donut chart segments
  const categories = [
    { label: 'IT и технологии', percent: 37, color: '#3b82f6', count: 12 },
    { label: 'Процессы', percent: 31, color: '#06b6d4', count: 10 },
    { label: 'Комфорт', percent: 19, color: '#f59e0b', count: 6 },
    { label: 'Другое', percent: 13, color: '#8b5cf6', count: 4 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* 1. Spline Wave Chart: Статистика обращений */}
      <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0f172a]/70 backdrop-blur-md border border-white/5 shadow-xl flex flex-col justify-between">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">
              Статистика обращений
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Динамика поступления и обработки по неделям
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Legend */}
            <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                Проблемы
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                Предложения
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                Отзывы
              </span>
            </div>

            {/* Filter */}
            <div className="relative">
              <button 
                onClick={() => setPeriod(period === 'За месяц' ? 'За квартал' : 'За месяц')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-300 font-medium transition-colors"
              >
                <span>{period}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic SVG Wave Chart */}
        <div className="relative h-56 w-full pt-4">
          <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="gradBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="gradCyan" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
            <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
            <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
            <line x1="0" y1="180" x2="500" y2="180" stroke="rgba(255,255,255,0.08)" />

            {/* Area Fill: Проблемы (Blue) */}
            <path
              d="M 20 160 C 90 90, 160 140, 240 85 C 320 30, 400 130, 480 70 L 480 180 L 20 180 Z"
              fill="url(#gradBlue)"
            />

            {/* Line: Проблемы (Blue) */}
            <path
              d="M 20 160 C 90 90, 160 140, 240 85 C 320 30, 400 130, 480 70"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Line: Предложения (Cyan) */}
            <path
              d="M 20 130 C 90 150, 160 80, 240 120 C 320 160, 400 60, 480 110"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Key Data Points */}
            <circle cx="20" cy="160" r="4.5" fill="#3b82f6" className="drop-shadow-[0_0_8px_#3b82f6]" />
            <circle cx="240" cy="85" r="5.5" fill="#3b82f6" stroke="#fff" strokeWidth="2" className="drop-shadow-[0_0_12px_#3b82f6]" />
            <circle cx="480" cy="70" r="4.5" fill="#3b82f6" className="drop-shadow-[0_0_8px_#3b82f6]" />

            <circle cx="20" cy="130" r="4" fill="#06b6d4" />
            <circle cx="240" cy="120" r="4" fill="#06b6d4" />
            <circle cx="480" cy="110" r="4" fill="#06b6d4" />
          </svg>

          {/* X Axis Labels */}
          <div className="flex justify-between px-4 mt-2 text-[11px] text-slate-500 font-medium">
            <span>1 нед</span>
            <span>2 нед</span>
            <span>3 нед</span>
            <span>4 нед</span>
          </div>
        </div>
      </div>

      {/* 2. Donut Chart: Топ категорий */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/70 backdrop-blur-md border border-white/5 shadow-xl flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white tracking-wide">
            Топ категорий
          </h2>
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Распределение
          </span>
        </div>

        {/* Donut SVG */}
        <div className="relative w-44 h-44 mx-auto my-3 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {/* Background track */}
            <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="14" />
            
            {/* Segment 1: IT (37%) */}
            <circle 
              cx="50" cy="50" r="38" fill="none" 
              stroke="#3b82f6" strokeWidth="14" 
              strokeDasharray="88.3 238.7" strokeDashoffset="0" 
            />

            {/* Segment 2: Процессы (31%) */}
            <circle 
              cx="50" cy="50" r="38" fill="none" 
              stroke="#06b6d4" strokeWidth="14" 
              strokeDasharray="74.0 238.7" strokeDashoffset="-88.3" 
            />

            {/* Segment 3: Комфорт (19%) */}
            <circle 
              cx="50" cy="50" r="38" fill="none" 
              stroke="#f59e0b" strokeWidth="14" 
              strokeDasharray="45.3 238.7" strokeDashoffset="-162.3" 
            />

            {/* Segment 4: Другое (13%) */}
            <circle 
              cx="50" cy="50" r="38" fill="none" 
              stroke="#8b5cf6" strokeWidth="14" 
              strokeDasharray="31.0 238.7" strokeDashoffset="-207.6" 
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-white tracking-tight">32</span>
            <span className="text-[10px] text-slate-400 font-medium uppercase">Всего</span>
          </div>
        </div>

        {/* Legend List */}
        <div className="space-y-2 pt-2 border-t border-white/5">
          {categories.map((cat, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                <span className="text-slate-300 font-medium">{cat.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-[11px]">{cat.count} шт</span>
                <span className="text-white font-bold">{cat.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
