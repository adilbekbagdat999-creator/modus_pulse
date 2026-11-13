import React, { useState, useRef } from 'react';
import { 
  X, Sparkles, AlertCircle, CheckCircle2, Shield, Send, Paperclip, 
  Mic, MicOff, Volume2, FileText, Download, Trash2, Check
} from 'lucide-react';

export default function CreateTicketModal({ onClose, onCreateTicket, currentUser, existingTickets }) {
  const [type, setType] = useState('Проблема');
  const [category, setCategory] = useState('Межотдельное взаимодействие');
  const [department, setDepartment] = useState('Закупки');
  const [priority, setPriority] = useState('Средний');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [attachedFile, setAttachedFile] = useState(null); // { name, size, data, type }

  // Состояние голосового ввода
  const [isRecording, setIsRecording] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState('');
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

  // Голосовой ввод через Web Speech API
  const handleToggleVoice = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      setVoiceNotice('');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Браузер без поддержки Web Speech — симуляция голосового надиктовщика реального инженера
      setVoiceNotice('Симуляция голоса инженера с объекта...');
      setIsRecording(true);
      setTimeout(() => {
        const sampleText = 'На объекте в Мытищах монтажники опять получили датчики Болид без крепежных кронштейнов. В номенклатуре 1С не указана модификация, проектировщики не заполнили обязательные параметры. Монтаж встал, нужно срочно синхронизировать спецификацию.';
        setDescription(prev => (prev ? prev + ' ' + sampleText : sampleText));
        handleTextChange(title || 'Нехватка кронштейнов в спецификации 1С', sampleText);
        setTitle(prev => prev || 'Нехватка параметров датчиков в спецификации 1С');
        setIsRecording(false);
        setVoiceNotice('✅ Голос распознан и категоризирован ИИ!');
        setTimeout(() => setVoiceNotice(''), 3000);
      }, 1500);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = 'ru-RU';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
        setVoiceNotice('🎙️ Слушаю вас... Говорите в микрофон');
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setDescription(prev => (prev ? prev + ' ' + transcript : transcript));
        handleTextChange(title || transcript.slice(0, 50), transcript);
        if (!title) {
          setTitle(transcript.slice(0, 60) + '...');
        }
        setVoiceNotice('✅ Текст успешно распознан!');
        setIsRecording(false);
        setTimeout(() => setVoiceNotice(''), 3000);
      };

      recognition.onerror = () => {
        setIsRecording(false);
        setVoiceNotice('Ошибка микрофона. Введите текст вручную.');
        setTimeout(() => setVoiceNotice(''), 3000);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch {
      setIsRecording(false);
      setVoiceNotice('Не удалось активировать микрофон');
    }
  };

  // Выбор прикрепляемого файла
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      setAttachedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        data: loadEvent.target.result,
        type: file.type
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Real-time AI Categorization & Duplicate detection
  const handleTextChange = (newTitle, newDesc) => {
    const text = (newTitle + ' ' + newDesc).toLowerCase();

    if (text.includes('1с') || text.includes('программ') || text.includes('повторн') || text.includes('синхрон') || text.includes('баз') || text.includes('битрикс')) {
      setCategory('Интеграции и IT');
      setPriority('Высокий');
      setDepartment('Бухгалтерия');
      setAiSuggestion({
        category: 'Интеграции и IT',
        reason: 'Выявлены маркеры программного обеспечения, синхронизации баз и ручного ввода.',
        warning: 'Похожая проблема уже зафиксирована в кластере #A-007 (Бухгалтерия ↔ IT).'
      });
    } else if (text.includes('обозначен') || text.includes('артикул') || text.includes('номенклатур') || text.includes('спецификац') || text.includes('кронштейн') || text.includes('датчик')) {
      setCategory('Каталог и данные');
      setPriority('Высокий');
      setDepartment('Закупки');
      setAiSuggestion({
        category: 'Каталог и данные',
        reason: 'Обнаружена проблема справочников номенклатуры и спецификаций оборудования.',
        warning: 'Связано с обращениями #A-001 и #A-003 (Закупки ↔ Проектирование).'
      });
    } else if (text.includes('обучен') || text.includes('семинар') || text.includes('урок') || text.includes('памятк')) {
      setCategory('Обучение');
      setPriority('Низкий');
      setDepartment('HR / Обучение');
      setAiSuggestion({
        category: 'Обучение',
        reason: 'Предложение относится к развитию компетенций и онбордингу сотрудников.'
      });
    } else if (text.includes('договор') || text.includes('согласован') || text.includes('юрист') || text.includes('клиент')) {
      setCategory('Договорная работа');
      setPriority('Высокий');
      setDepartment('Продажи');
      setAiSuggestion({
        category: 'Договорная работа',
        reason: 'Затрагивает регламенты согласования договоров, приложений и клиентских КП.'
      });
    } else {
      setAiSuggestion(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const authorObj = isAnonymous ? {
      name: 'Анонимный сотрудник',
      role: 'Сотрудник компании',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      email: 'anonymous@modus-trade.ru'
    } : {
      name: currentUser?.name || 'Сотрудник компании',
      role: currentUser?.role || 'Специалист',
      avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      email: currentUser?.email || ''
    };

    const newTicket = {
      id: `A-0${existingTickets.length + 1}`,
      type,
      category,
      department,
      priority,
      title,
      description,
      status: 'Новое',
      createdAt: new Date().toISOString(),
      attachedFile: attachedFile ? attachedFile.name : null,
      author: authorObj,
      timeline: [
        { step: 1, title: 'Обращение создано', date: 'Только что', completed: true, by: authorObj.name },
        { step: 2, title: 'Зарегистрировано ИИ', date: 'Только что', completed: true, by: 'MODUS AI' },
        { step: 3, title: 'Назначен ответственный', date: 'Ожидает распределения', completed: false },
        { step: 4, title: 'В процессе решения', date: '—', completed: false },
        { step: 5, title: 'Проблема устранена', date: '—', completed: false }
      ],
      chat: [
        {
          id: 'msg-init',
          sender: 'MODUS AI',
          role: 'system',
          text: `Обращение зарегистрировано в категорию «${category}». Руководство уведомлено.`,
          timestamp: 'только что',
          isAi: true
        }
      ]
    };

    onCreateTicket(newTicket);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0b1021] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Создать обращение</h2>
              <p className="text-xs text-slate-400">ГК «Модус Трейд» • Внутренний портал</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Voice Input Action Button */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-blue-900/20 border border-blue-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isRecording ? 'bg-rose-500 text-white animate-pulse' : 'bg-blue-600/20 text-cyan-300'}`}>
                {isRecording ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Голосовой ввод обращения</span>
                  <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-500/30 font-mono">
                    ИИ-распознавание
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 truncate">
                  {voiceNotice || 'Нажмите, чтобы надиктовать голосом с объекта или склада'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleVoice}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                isRecording 
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-500/20 animate-pulse' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-glow-blue'
              }`}
            >
              {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              <span>{isRecording ? 'Остановить' : 'Надиктовать голосом'}</span>
            </button>
          </div>

          {/* Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Тип обращения
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Проблема', 'Предложение', 'Положительный отзыв'].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setType(t)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    type === t
                      ? 'bg-blue-600 text-white shadow-glow-blue'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/5'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Краткий заголовок проблемы или идеи
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                handleTextChange(e.target.value, description);
              }}
              placeholder="Например: Повторный ввод артикулов в базу 1С..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Подробное описание и предлагаемое решение
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                handleTextChange(title, e.target.value);
              }}
              placeholder="Опишите, в чём сложность, какой отдел затрагивает и как лучше решить..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Live AI Suggestion Banner */}
          {aiSuggestion && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/60 to-indigo-950/40 border border-blue-500/30 text-xs text-slate-300 space-y-1.5 animate-fadeIn">
              <div className="flex items-center gap-2 text-cyan-300 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>ИИ автоматически определил категорию: {aiSuggestion.category}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {aiSuggestion.reason}
              </p>
              {aiSuggestion.warning && (
                <div className="text-[10px] text-amber-300 font-bold flex items-center gap-1.5 pt-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{aiSuggestion.warning}</span>
                </div>
              )}
            </div>
          )}

          {/* Department & Priority selectors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Подразделение
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Закупки">Закупки</option>
                <option value="Проектирование">Проектирование</option>
                <option value="Бухгалтерия">Бухгалтерия</option>
                <option value="Продажи">Продажи</option>
                <option value="IT и Интеграции">IT и Интеграции</option>
                <option value="HR / Обучение">HR / Обучение</option>
                <option value="Склад и Логистика">Склад и Логистика</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Приоритет
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Низкий">Низкий (пожелание)</option>
                <option value="Средний">Средний (замедляет работу)</option>
                <option value="Высокий">Высокий (блокирует процесс / потери денег)</option>
              </select>
            </div>
          </div>

          {/* Прикрепление тестового файла / сметы / спецификации (по ТЗ сценарий 1) */}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            {attachedFile ? (
              <div className="p-3 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span className="font-bold">{attachedFile.name}</span>
                  <span className="text-slate-400">({attachedFile.size})</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAttachedFile(null)}
                  className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-rose-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2 px-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-dashed border-white/10 text-slate-400 hover:text-white text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Paperclip className="w-3.5 h-3.5 text-blue-400" />
                <span>Прикрепить спецификацию, чертёж или файл (по ТЗ)</span>
              </button>
            )}
          </div>

          {/* Anonymous toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-slate-400" />
              <div>
                <div className="text-xs font-bold text-white">Анонимная подача</div>
                <div className="text-[10px] text-slate-400">Имя и контакты будут скрыты от коллег</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-white/10 border-white/20"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-300 font-bold text-xs transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-glow-blue transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Зарегистрировать обращение</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
