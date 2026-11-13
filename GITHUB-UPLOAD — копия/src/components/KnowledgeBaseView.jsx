import React from 'react';
import { BookOpen, FileText, CheckCircle2, Search, ArrowRight, Shield } from 'lucide-react';

export default function KnowledgeBaseView() {
  const articles = [
    {
      id: 'kb-1',
      title: 'Регламент заполнения спецификаций оборудования (по обращению A-001)',
      category: 'Закупки и Проектирование',
      date: '08 ноя 2026',
      reads: 142,
      summary: 'Обязательные поля при заказе слаботочного оборудования: рабочие температуры, вольтаж, модификация разъемов и посадочные размеры.'
    },
    {
      id: 'kb-2',
      title: 'Памятка для нового сотрудника: контакты и типовые вопросы (A-008)',
      category: 'Онбординг',
      date: '04 ноя 2026',
      reads: 289,
      summary: 'Кому звонить по закупкам, как выписать пропуск, где брать шаблоны счетов в 1С и порядок согласования договоров.'
    },
    {
      id: 'kb-3',
      title: 'Правила именования файлов и архивации в общих папках (A-019)',
      category: 'Документооборот',
      date: '09 ноя 2026',
      reads: 96,
      summary: 'Единый стандарт названий проектных папок: ГГГГ-ММ-ДД_Проект_Версия. Исключение путаницы с устаревшими чертежами.'
    },
    {
      id: 'kb-4',
      title: 'Стандарт постановки задач и критерии готовности (A-015)',
      category: 'Управление проектами',
      date: '07 ноя 2026',
      reads: 115,
      summary: 'Минимальный набор данных при постановке поручения: ожидаемый результат, дедлайн, ответственный и смежные исполнители.'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#101b3d] to-[#070b18] border border-blue-500/20 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>База Знаний ГК «Модус Трейд»</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
          Корпоративная память: решения, которые уже помогли
        </h1>
        <p className="text-sm text-slate-300 max-w-xl">
          Все утверждённые инструкции, регламенты и памятки, созданные по предложениям сотрудников. Не повторяем старых ошибок.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((art) => (
          <div
            key={art.id}
            className="p-5 rounded-3xl bg-[#0f172a]/80 border border-white/5 hover:border-blue-500/30 shadow-lg transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-blue-400 px-2 py-0.5 rounded-full bg-blue-500/10">
                  {art.category}
                </span>
                <span className="text-[10px] text-slate-500">
                  {art.date} • {art.reads} просм.
                </span>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 leading-snug">
                {art.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {art.summary}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-blue-400 font-semibold group-hover:text-blue-300">
              <span>Открыть инструкцию</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
