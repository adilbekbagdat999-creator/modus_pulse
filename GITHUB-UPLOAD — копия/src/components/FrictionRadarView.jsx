import React, { useState } from 'react';
import { Network, AlertOctagon, TrendingUp, Sparkles, Building, ArrowRight, Calculator, Coins, Printer, Clock, CheckCircle2 } from 'lucide-react';

export default function FrictionRadarView({ tickets, onSelectTicket, onOpenExecutiveReport }) {
  const [selectedCluster, setSelectedCluster] = useState('spec-nomenclature');
  const [roiLevel, setRoiLevel] = useState(100); // 25, 50, 100%

  const clusters = [
    {
      id: 'spec-nomenclature',
      title: 'Спецификации и Номенклатура',
      deptA: 'Закупки',
      deptB: 'Проектирование',
      ticketsCount: 4,
      tickets: ['A-001', 'A-003', 'A-013'],
      losses: '~245 000 ₽ / мес',
      hoursLost: '38 часов в неделю',
      status: 'Критическое трение',
      statusColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      description: 'Разные обозначения одних и тех же позиций оборудования в 1С и проектных чертежах. Закупки заказывают не те модификации, монтаж простаивает.',
      recommendedAction: 'Внедрение единого справочника номенклатуры с автоматической валидацией карточек.'
    },
    {
      id: 'cross-department',
      title: 'Межотдельный документооборот и IT-синхронизация',
      deptA: 'Продажи',
      deptB: 'Бухгалтерия & IT',
      ticketsCount: 6,
      tickets: ['A-005', 'A-007', 'A-009', 'A-011', 'A-012'],
      losses: '~320 000 ₽ / мес',
      hoursLost: '54 часа в неделю',
      status: 'Высокое трение',
      statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      description: 'Ручной повторный ввод данных из клиентских заказов в 1С, потеря контекста в десятках чатов мессенджеров, срывы сроков ответов на срочные КП.',
      recommendedAction: 'Интеграция коннектора 1С ↔ Битрикс24 и введение регламента SLA на ответы смежников.'
    },
    {
      id: 'training-culture',
      title: 'Обучение, онбординг и стандарты задач',
      deptA: 'Все отделы',
      deptB: 'HR и Лидеры направлений',
      ticketsCount: 5,
      tickets: ['A-004', 'A-006', 'A-008', 'A-015', 'A-016'],
      losses: 'Потери темпа адаптации',
      hoursLost: '20 часов в месяц',
      status: 'Зона роста',
      statusColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      description: 'Новые сотрудники долго входят в курс дела по слаботочным системам. Задачи ставятся без четких дедлайнов.',
      recommendedAction: 'Регулярные воркшопы на реальных образцах оборудования и обязательные поля постановки задач.'
    }
  ];

  // Динамический расчет экономической отдачи
  const baseYearSavings = 1890000;
  const baseHours = 468;
  const currentSavings = Math.round((baseYearSavings * (roiLevel / 100))).toLocaleString('ru-RU');
  const currentHours = Math.round(baseHours * (roiLevel / 100));
  const paybackDays = roiLevel === 100 ? 14 : roiLevel === 50 ? 28 : 55;

  const current = clusters.find(c => c.id === selectedCluster) || clusters[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner with Executive Actions */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#0e1738] to-[#070b18] border border-blue-500/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-bold mb-3">
            <Network className="w-4 h-4" />
            <span>Friction Radar • Карта узких мест ГК «Модус Трейд»</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
            Детектор системных сбоев на стыке подразделений
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Искусственный интеллект группирует одиночные жалобы сотрудников в общие очаги потерь и оценивает стоимость бездействия для бизнеса.
          </p>
        </div>

        {onOpenExecutiveReport && (
          <button
            onClick={onOpenExecutiveReport}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2.5 shadow-glow-blue transition-all flex-shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Сводка для Директората (PDF)</span>
          </button>
        )}
      </div>

      {/* ИНТЕРАКТИВНЫЙ ROI-СИМУЛЯТОР ДЛЯ СОВЕТА ДИРЕКТОРОВ (КИЛЛЕР-ФИЧА) */}
      <div className="p-6 rounded-3xl bg-[#0d142b]/90 border border-blue-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-cyan-300 flex items-center justify-center border border-blue-500/30">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Симулятор экономической отдачи (ROI Калькулятор)</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Экономика внедрения
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">Прогноз окупаемости устранения системных сбоев</p>
            </div>
          </div>

          {/* Интерактивный переключатель уровня внедрения */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-bold">
            <span className="text-[11px] text-slate-400 px-2">Уровень внедрения:</span>
            {[25, 50, 100].map((level) => (
              <button
                key={level}
                onClick={() => setRoiLevel(level)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  roiLevel === level 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {level}%
              </button>
            ))}
          </div>
        </div>

        {/* 4 показателя экономического эффекта */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Экономия бюджета</div>
            <div className="text-xl font-black text-amber-400 mt-1">{currentSavings} ₽</div>
            <div className="text-[10px] text-slate-400 mt-0.5">в год чистой прибыли</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Сэкономлено времени</div>
            <div className="text-xl font-black text-cyan-300 mt-1">{currentHours} ч / мес</div>
            <div className="text-[10px] text-slate-400 mt-0.5">ручного труда инженеров</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Окупаемость MODUS PULSE</div>
            <div className="text-xl font-black text-emerald-400 mt-1">{paybackDays} дней</div>
            <div className="text-[10px] text-slate-400 mt-0.5">полный возврат инвестиций</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Индекс ошибок в 1С</div>
            <div className="text-xl font-black text-blue-400 mt-1">-{roiLevel * 0.78}%</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">↓ снижение брака спецификаций</div>
          </div>
        </div>
      </div>

      {/* Interactive Cluster Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clusters.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCluster(c.id)}
            className={`p-5 rounded-2xl border text-left transition-all ${
              selectedCluster === c.id
                ? 'bg-blue-600/20 border-blue-500 shadow-glow-blue scale-[1.02]'
                : 'bg-[#0f172a]/70 border-white/5 hover:border-white/10'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${c.statusColor}`}>
                {c.status}
              </span>
              <span className="text-xs font-bold text-slate-400">
                {c.ticketsCount} тикета
              </span>
            </div>

            <h3 className="text-sm font-bold text-white mb-2 leading-snug">
              {c.title}
            </h3>

            <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-3">
              <Building className="w-3.5 h-3.5 text-blue-400" />
              <span>{c.deptA} ↔ {c.deptB}</span>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-400">Ущерб:</span>
              <span className="text-rose-400 font-bold">{c.losses}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Deep Dive Cluster Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0f172a]/90 border border-white/10 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
          <div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${current.statusColor} inline-block mb-2`}>
              {current.status}
            </span>
            <h2 className="text-xl font-bold text-white">{current.title}</h2>
            <div className="text-xs text-slate-400 mt-1">
              Эпицентр конфликта: <strong className="text-blue-300">{current.deptA}</strong> и <strong className="text-blue-300">{current.deptB}</strong>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs text-slate-400">Оценочные потери (Cost of Inaction):</div>
            <div className="text-xl font-extrabold text-rose-400 mt-0.5">{current.losses}</div>
            <div className="text-[11px] text-amber-300">{current.hoursLost}</div>
          </div>
        </div>

        {/* Description & Recommended Action */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Суть проблемы</h3>
            <p className="text-xs text-slate-200 leading-relaxed">{current.description}</p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 to-indigo-950/20 border border-blue-500/20 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Рекомендация MODUS AI для руководства</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">{current.recommendedAction}</p>
          </div>
        </div>

        {/* Tickets inside this cluster */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Связанные обращения из датасета (нажмите для перехода):
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {current.tickets.map((tId) => {
              const fullTicket = tickets.find(t => t.id === tId);
              if (!fullTicket) return null;
              return (
                <div
                  key={tId}
                  onClick={() => onSelectTicket(tId)}
                  className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-blue-600/20 border border-white/5 hover:border-blue-500/30 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold font-mono text-blue-400">#{fullTicket.id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300">
                      {fullTicket.department}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {fullTicket.title}
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[10px] text-slate-400">
                    <span>{fullTicket.author?.name || 'Сотрудник'}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
