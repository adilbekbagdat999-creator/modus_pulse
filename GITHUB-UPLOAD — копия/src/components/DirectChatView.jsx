import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Search, CheckCheck, Paperclip, X, Download, FileText, Image as ImageIcon,
  Building2, Shield, Wrench, ShoppingCart, MessageSquare, Lock, LogIn, UserPlus,
  Trash2, FileArchive, FileSpreadsheet
} from 'lucide-react';
import { getChatMessages, saveChatMessage } from '../lib/supabase';

const CHANNELS = [
  {
    id: 'general',
    name: 'Общий рабочий чат',
    code: '#общий-чат',
    subtitle: 'Координация между всеми подразделениями',
    icon: MessageSquare,
    color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    welcome: 'Добро пожаловать в общекорпоративный рабочий чат ГК «Модус Трейд». Здесь обсуждаются оперативные вопросы и новости компании.'
  },
  {
    id: 'it-support',
    name: 'IT и Интеграции',
    code: '#it-поддержка',
    subtitle: 'Синхронизация 1С, Битрикс24, базы данных',
    icon: Wrench,
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    welcome: 'Канал технической поддержки и автоматизации. Задавайте вопросы по работе 1С, номенклатуре и обмену данными.'
  },
  {
    id: 'procurement',
    name: 'Закупки и Снабжение',
    code: '#снабжение-закупки',
    subtitle: 'Заявки на оборудование, поставщики, прайсы',
    icon: ShoppingCart,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    welcome: 'Канал отдела закупок и снабжения. Согласование позиций оборудования, коммерческих предложений и сроков поставок.'
  },
  {
    id: 'engineering',
    name: 'Проектный отдел',
    code: '#проектирование',
    subtitle: 'Спецификации, чертежи, состав оборудования',
    icon: Building2,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    welcome: 'Канал проектного департамента. Сверка технических характеристик и номенклатурных карт.'
  },
  {
    id: 'accounting',
    name: 'Бухгалтерия и Документы',
    code: '#бухгалтерия',
    subtitle: 'Акты, счета, накладные и договоры',
    icon: FileText,
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    welcome: 'Канал документооборота и бухгалтерии. Вопросы по закрывающим документам и счетам.'
  },
  {
    id: 'management',
    name: 'Директорат и Руководство',
    code: '#руководство',
    subtitle: 'Прямая связь по стратегическим вопросам',
    icon: Shield,
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    welcome: 'Прямой канал связи с руководством компании для предложений и эскалации нерешаемых вопросов.'
  }
];

function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export default function DirectChatView({ currentUser, onOpenAuth }) {
  const [activeChannel, setActiveChannel] = useState(CHANNELS[0]);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [attachedFile, setAttachedFile] = useState(null); // { name, size, type, data, isImage }
  const [searchFilter, setSearchFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Автоскролл к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Загрузка сообщений для выбранного канала
  useEffect(() => {
    let isMounted = true;
    const channelId = activeChannel.id;

    async function loadChannelMessages() {
      setLoading(true);

      // Сначала читаем локальный кеш
      const localKey = `modus_chat_v2_${channelId}`;
      let channelMsgs = [];
      try {
        const cached = localStorage.getItem(localKey);
        if (cached) {
          channelMsgs = JSON.parse(cached);
        }
      } catch (e) {
        console.error('Ошибка чтения локального кеша чата', e);
      }

      // Пытаемся подтянуть из Supabase
      try {
        const remoteData = await getChatMessages(channelId);
        if (remoteData && remoteData.length > 0) {
          channelMsgs = remoteData.map(m => ({
            id: m.id,
            channelId: m.channel_id,
            senderName: m.sender_name,
            senderEmail: m.sender_email,
            senderRole: m.sender_role,
            senderDepartment: m.sender_department,
            senderAvatar: m.sender_avatar,
            text: m.text,
            fileName: m.file_name,
            fileType: m.file_type,
            fileSize: m.file_size,
            fileData: m.file_data,
            createdAt: m.created_at,
            time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }));
        }
      } catch (err) {
        console.log('Используется локальное хранилище сообщений');
      }

      if (isMounted) {
        setMessages(channelMsgs);
        setLoading(false);
        setTimeout(scrollToBottom, 100);
      }
    }

    loadChannelMessages();

    return () => {
      isMounted = false;
    };
  }, [activeChannel.id]);

  // Выбор файла пользователем
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Ограничение до 15 МБ
    if (file.size > 15 * 1024 * 1024) {
      alert('Размер файла не должен превышать 15 МБ');
      return;
    }

    const isImage = file.type.startsWith('image/');
    const reader = new FileReader();

    reader.onload = (loadEvent) => {
      setAttachedFile({
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        data: loadEvent.target.result,
        isImage
      });
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Удаление прикрепленного файла перед отправкой
  const handleRemoveAttachedFile = () => {
    setAttachedFile(null);
  };

  // Отправка сообщения
  const handleSendMessage = async () => {
    if (!currentUser) {
      if (onOpenAuth) onOpenAuth();
      return;
    }

    if (!inputText.trim() && !attachedFile) return;

    const newMsg = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      channelId: activeChannel.id,
      senderName: currentUser.name || 'Сотрудник',
      senderEmail: currentUser.email || '',
      senderRole: currentUser.role || 'Специалист',
      senderDepartment: currentUser.department || 'Компания',
      senderAvatar: currentUser.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name || 'User')}`,
      text: inputText.trim(),
      fileName: attachedFile ? attachedFile.name : null,
      fileType: attachedFile ? attachedFile.type : null,
      fileSize: attachedFile ? attachedFile.size : null,
      fileData: attachedFile ? attachedFile.data : null,
      createdAt: new Date().toISOString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    setInputText('');
    setAttachedFile(null);
    setTimeout(scrollToBottom, 50);

    // Сохраняем локально
    const localKey = `modus_chat_v2_${activeChannel.id}`;
    try {
      localStorage.setItem(localKey, JSON.stringify(updated));
    } catch (e) {
      console.warn('Не удалось сохранить в localStorage (возможно превышен лимит Base64)', e);
    }

    // Сохраняем в Supabase (асинхронно)
    saveChatMessage(newMsg).catch(() => {});
  };

  // Удаление сообщения (только своего)
  const handleDeleteMessage = (msgId) => {
    const updated = messages.filter(m => m.id !== msgId);
    setMessages(updated);
    const localKey = `modus_chat_v2_${activeChannel.id}`;
    localStorage.setItem(localKey, JSON.stringify(updated));
  };

  const filteredMessages = searchFilter
    ? messages.filter(m => 
        (m.text && m.text.toLowerCase().includes(searchFilter.toLowerCase())) ||
        (m.senderName && m.senderName.toLowerCase().includes(searchFilter.toLowerCase())) ||
        (m.fileName && m.fileName.toLowerCase().includes(searchFilter.toLowerCase()))
      )
    : messages;

  const ActiveIcon = activeChannel.icon;

  return (
    <div className="h-[calc(100vh-8.5rem)] rounded-3xl bg-[#0b1021]/90 backdrop-blur-md border border-white/5 shadow-2xl flex overflow-hidden animate-fadeIn">
      {/* ЛЕВАЯ КОЛОНКА — КАНАЛЫ ПОДРАЗДЕЛЕНИЙ */}
      <div className="w-80 border-r border-white/5 flex flex-col justify-between bg-[#080d1a]/90">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-4 border-b border-white/5">
            <h2 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span>Каналы подразделений</span>
            </h2>
            <p className="text-[11px] text-slate-400">Рабочий чат и обмен файлами</p>
          </div>

          {/* Список каналов */}
          <div className="p-2 space-y-1.5 overflow-y-auto flex-1">
            {CHANNELS.map((ch) => {
              const isSelected = activeChannel.id === ch.id;
              const Icon = ch.icon;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setActiveChannel(ch);
                    setSearchFilter('');
                  }}
                  className={`w-full p-3 rounded-2xl flex items-center gap-3 text-left transition-all ${
                    isSelected 
                      ? 'bg-blue-600/20 border border-blue-500/30 shadow-lg shadow-blue-500/5' 
                      : 'hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 ${ch.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate">{ch.name}</span>
                    </div>
                    <div className="text-[11px] font-mono text-blue-400/80 truncate">{ch.code}</div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">{ch.subtitle}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Профиль текущего вошедшего пользователя */}
        <div className="p-3 border-t border-white/5 bg-white/[0.02]">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name)}`}
                alt=""
                className="w-9 h-9 rounded-xl object-cover border border-blue-500/40"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{currentUser.department || currentUser.role}</div>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" title="В сети" />
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-300">Гостевой режим</div>
                <div className="text-[10px] text-slate-500">Только чтение</div>
              </div>
              <button
                onClick={onOpenAuth}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-glow-blue"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Войти</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ПРАВАЯ ОБЛАСТЬ — СООБЩЕНИЯ И ВВОД */}
      <div className="flex-1 flex flex-col justify-between bg-[#070b14]/70">
        {/* Шапка чата */}
        <div className="h-16 px-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${activeChannel.color}`}>
              <ActiveIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>{activeChannel.name}</span>
                <span className="font-mono text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                  {activeChannel.code}
                </span>
              </div>
              <div className="text-[10px] text-slate-400">{activeChannel.subtitle}</div>
            </div>
          </div>

          {/* Поиск по сообщениям в канале */}
          <div className="relative w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Поиск по сообщениям..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
            />
          </div>
        </div>

        {/* Лента сообщений */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {/* Приветственное сообщение канала */}
          <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-center max-w-xl mx-auto my-2">
            <div className="text-xs font-bold text-blue-300 mb-1">{activeChannel.name} ({activeChannel.code})</div>
            <p className="text-xs text-slate-300 leading-relaxed">{activeChannel.welcome}</p>
          </div>

          {loading && (
            <div className="text-center py-4 text-xs text-slate-400 animate-pulse">
              Синхронизация сообщений...
            </div>
          )}

          {filteredMessages.length === 0 && !loading && (
            <div className="text-center py-12 text-slate-500 text-xs">
              В этом канале пока нет сообщений. Будьте первым, кто напишет!
            </div>
          )}

          {filteredMessages.map((m) => {
            const isMe = currentUser && (m.senderEmail === currentUser.email || m.senderName === currentUser.name);

            return (
              <div
                key={m.id}
                className={`flex flex-col group ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 mb-1 px-1">
                  {!isMe && (
                    <>
                      <img
                        src={m.senderAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(m.senderName)}`}
                        alt=""
                        className="w-5 h-5 rounded-full object-cover border border-white/10"
                      />
                      <span className="text-[11px] font-bold text-cyan-300">{m.senderName}</span>
                      {m.senderDepartment && (
                        <span className="text-[9px] text-slate-400">({m.senderDepartment})</span>
                      )}
                    </>
                  )}
                  {isMe && (
                    <span className="text-[10px] text-slate-400 font-medium">Вы ({currentUser.department || 'Сотрудник'})</span>
                  )}
                  <span className="text-[9px] text-slate-500">{m.time}</span>
                  {isMe && (
                    <button
                      onClick={() => handleDeleteMessage(m.id)}
                      className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-opacity p-0.5"
                      title="Удалить сообщение"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div
                  className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-lg ${
                    isMe
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-500/10'
                      : 'bg-[#121c38] text-slate-200 border border-white/10 rounded-tl-none'
                  }`}
                >
                  {/* Текст сообщения */}
                  {m.text && <p className="whitespace-pre-wrap break-words">{m.text}</p>}

                  {/* Вложенный файл / картинка */}
                  {m.fileData && (
                    <div className="mt-2.5 pt-2 border-t border-white/10">
                      {m.fileType?.startsWith('image/') ? (
                        <div className="space-y-1.5">
                          <a href={m.fileData} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl border border-white/20">
                            <img
                              src={m.fileData}
                              alt={m.fileName || 'Вложение'}
                              className="max-h-64 w-auto rounded-xl object-contain hover:scale-105 transition-transform"
                            />
                          </a>
                          <div className="flex items-center justify-between text-[10px] text-slate-300">
                            <span className="truncate max-w-[200px]">{m.fileName}</span>
                            <span>{m.fileSize}</span>
                          </div>
                        </div>
                      ) : (
                        <a
                          href={m.fileData}
                          download={m.fileName || 'file'}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-black/20 hover:bg-black/40 border border-white/10 transition-all group/file text-left"
                        >
                          <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-white truncate group-hover/file:text-blue-300">
                              {m.fileName}
                            </div>
                            <div className="text-[10px] text-slate-400">{m.fileSize || 'Документ'}</div>
                          </div>
                          <Download className="w-4 h-4 text-slate-400 group-hover/file:text-white flex-shrink-0" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {isMe && (
                  <div className="flex items-center gap-1 text-[9px] text-slate-500 mt-1 px-1">
                    <CheckCheck className="w-3 h-3 text-blue-400" />
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* ОБЛАСТЬ ВВОДА / ПРИКРЕПЛЕНИЯ ФАЙЛОВ */}
        <div className="p-4 border-t border-white/5 bg-[#080d1a]/90">
          {currentUser ? (
            <div className="space-y-2">
              {/* Превью прикрепленного файла перед отправкой */}
              {attachedFile && (
                <div className="p-2.5 rounded-2xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-between gap-3 animate-fadeIn">
                  <div className="flex items-center gap-3 min-w-0">
                    {attachedFile.isImage ? (
                      <img
                        src={attachedFile.data}
                        alt="Превью"
                        className="w-10 h-10 rounded-lg object-cover border border-white/20 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{attachedFile.name}</div>
                      <div className="text-[10px] text-blue-300">{attachedFile.size} • Готов к отправке</div>
                    </div>
                  </div>

                  <button
                    onClick={handleRemoveAttachedFile}
                    className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Удалить прикрепленный файл"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Поле ввода сообщения и кнопки */}
              <div className="flex items-center gap-2">
                {/* Скрытый input для выбора файлов */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.rar"
                />

                {/* Кнопка скрепки (прикрепить файл) */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-blue-400 transition-all flex items-center justify-center"
                  title="Прикрепить файл (фото, PDF, документы)"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                {/* Поле ввода текста */}
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder={`Написать в ${activeChannel.code}...`}
                  className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                />

                {/* Кнопка отправить */}
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() && !attachedFile}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center gap-1.5 shadow-glow-blue transition-all"
                >
                  <span>Отправить</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Если пользователь не зарегистрирован / не вошел */
            <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Авторизуйтесь для отправки сообщений и файлов</div>
                  <div className="text-[11px] text-slate-400">Только зарегистрированные сотрудники могут писать в чаты подразделений</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAuth}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-glow-blue transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Регистрация / Вход</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
