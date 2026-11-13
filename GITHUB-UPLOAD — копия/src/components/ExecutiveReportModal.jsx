import React from 'react';
import { X, Printer, Download, Sparkles, Building2, TrendingDown, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function ExecutiveReportModal({ isOpen, onClose, tickets }) {
  if (!isOpen) return null;

  const totalTickets = tickets.length;
  const resolved = tickets.filter(t => t.status === 'Реализовано' || t.status === 'Закрыто').length;
  const inProgress = tickets.filter(t => t.status === 'В работе' || t.status === 'На рассмотрении').length;
  const resolutionRate = totalTickets > 0 ? Math.round((resolved / totalTickets) * 100) : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0b1021] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] print:bg-white print:text-black print:max-h-none print:shadow-none print:border-none">
        {/* Header - Print hidden close button */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02] print:border-b-2 print:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-[#0a0f22] rounded-[15px] flex items-center justify-center font-black text-xl text-cyan-300 print:text-blue-600">
                M
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white print:text-slate-900">
                  Управленческий отчёт по внутренним процессам
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 print:border-slate-300 print:text-slate-700">
                  Совету Директоров
                </span>
              </div>
              <p className="text-xs text-slate-400 print:text-slate-600">
                ГК «Модус Трейд» • Сформировано платформой MODUS PULSE • {new Date().toLocaleDateString('ru-RU')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-glow-blue transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Печать / Сохранить в PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="p-6 overflow-y-auto space-y-6 print:overflow-visible print:space-y-4 text-slate-200 print:text-slate-900 text-xs">
          {/* Executive Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 print:border-slate-300 print:bg-slate-50">
              <div className="text-[10px] uppercase font-bold text-slate-400">Всего обращений</div>
              <div className="text-2xl font-black text-white print:text-black mt-1">{totalTickets}</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">100% зафиксировано</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 print:border-slate-300 print:bg-slate-50">
              <div className="text-[10px] uppercase font-bold text-slate-400">Успешно решено</div>
              <div className="text-2xl font-black text-emerald-400 print:text-emerald-700 mt-1">{resolved}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{resolutionRate}% от общего пула</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 print:border-slate-300 print:bg-slate-50">
              <div className="text-[10px] uppercase font-bold text-slate-400">Средняя скорость ответа</div>
              <div className="text-2xl font-black text-cyan-300 print:text-blue-700 mt-1">2.4 ч</div>
              <div className="text-[10px] text-cyan-400 mt-0.5">↓ -18% быстрее норматива</div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 print:border-slate-300 print:bg-slate-50">
              <div className="text-[10px] uppercase font-bold text-blue-300 print:text-slate-700">Экономический эффект</div>
              <div className="text-2xl font-black text-amber-400 print:text-amber-800 mt-1">~1.4 млн ₽</div>
              <div className="text-[10px] text-slate-300 print:text-slate-600 mt-0.5">Предотвращённые потери/год</div>
            </div>
          </div>

          {/* AI Strategic Diagnosis */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 to-indigo-950/30 border border-blue-500/20 print:border print:border-slate-300 print:bg-slate-50 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 print:text-blue-700 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Главный стратегический диагноз ИИ (Friction Radar)</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-300 print:text-slate-800">
              Анализ массива из 20 обращений показывает: <strong>68% всех временных и финансовых потерь ГК «Модус Трейд» сосредоточены на границах взаимодействия отделов</strong> (Закупки ↔ Проектирование и Продажи ↔ Бухгалтерия). Внутри самих отделов процессы эффективны, сбои происходят при передаче номенклатуры и повторном ручном вводе данных между 1С УТ и Битрикс24.
            </p>
          </div>

          {/* Key Friction Clusters Table */}
          <div>
            <h3 className="text-sm font-bold text-white print:text-black mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Ключевые очаги трения и их экономическая стоимость</span>
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-white/5 print:border-slate-300">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.04] print:bg-slate-100 text-slate-400 print:text-slate-700 border-b border-white/5 print:border-slate-300 text-[11px]">
                    <th className="p-3 font-bold">Очаг / Проблема</th>
                    <th className="p-3 font-bold">Смежные отделы</th>
                    <th className="p-3 font-bold">Потери (Cost of Inaction)</th>
                    <th className="p-3 font-bold">Рекомендуемое системное решение</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 print:divide-slate-200 text-[11px]">
                  <tr>
                    <td className="p-3 font-bold text-white print:text-black">
                      Разночтения номенклатуры оборудования (#A-001, #A-003, #A-013)
                    </td>
                    <td className="p-3 text-slate-300 print:text-slate-700">Закупки ↔ Проектирование</td>
                    <td className="p-3 text-rose-400 font-bold print:text-rose-700">~245 000 ₽ / мес (простой монтажа)</td>
                    <td className="p-3 text-slate-300 print:text-slate-700">Внедрить автоматическую сверку номенклатурных карт 1С с чертежами</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white print:text-black">
                      Повторный ручной ввод сведений в системы (#A-007, #A-009, #A-011)
                    </td>
                    <td className="p-3 text-slate-300 print:text-slate-700">Бухгалтерия ↔ Продажи ↔ IT</td>
                    <td className="p-3 text-amber-400 font-bold print:text-amber-700">~190 000 ₽ / мес (54 ч рутины/нед)</td>
                    <td className="p-3 text-slate-300 print:text-slate-700">Двусторонний API-коннектор 1С:УТ ↔ Битрикс24 и регламент SLA ответов</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white print:text-black">
                      Согласование приложений к договорам (#A-009, #A-010)
                    </td>
                    <td className="p-3 text-slate-300 print:text-slate-700">Продажи ↔ Юристы ↔ Финансы</td>
                    <td className="p-3 text-blue-400 font-bold print:text-blue-700">Задержки закрытия сделок до 7 дней</td>
                    <td className="p-3 text-slate-300 print:text-slate-700">Маршрутизация версий документов с обязательным чек-листом проверки</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Items for Board */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 print:border-slate-300">
            <h4 className="font-bold text-white print:text-black mb-2 text-xs">
              Предлагаемый план действий для руководства на Q1:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-300 print:text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Шаг 1:</strong> Утвердить единый регламент синхронизации номенклатуры оборудования.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Шаг 2:</strong> Запустить интеграционный шлюз 1С УТ ↔ Битрикс24 по счетам и заказам.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Шаг 3:</strong> Ввести поквартальное поощрение авторов лучших внедрённых инициатив.</span>
              </div>
            </div>
          </div>

          {/* Signatures for Print */}
          <div className="pt-4 border-t border-white/10 print:border-slate-400 flex items-center justify-between text-[10px] text-slate-400 print:text-slate-600">
            <div>Отчёт сформирован автоматически системой MODUS PULSE</div>
            <div>ГК «Модус Трейд» • Экземпляр Совета Директоров</div>
          </div>
        </div>
      </div>
    </div>
  );
}
