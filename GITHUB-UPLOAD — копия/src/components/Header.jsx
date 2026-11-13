import React, { useState } from 'react';
import { Search, Bell, ChevronDown, User, LogOut, LogIn, UserPlus, FileText, Printer } from 'lucide-react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  currentUser, 
  notifications,
  onSelectTicket,
  onOpenAuth,
  onLogout,
  onOpenExecutiveReport
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 px-6 border-b border-white/5 bg-[#070b14]/70 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск по обращениям (например: номенклатура, 1С, склад)..."
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0f172a]/80 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white bg-slate-800 px-1.5 py-0.5 rounded"
          >
            Esc
          </button>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Кнопка отчета для Директората */}
        {onOpenExecutiveReport && (
          <button
            onClick={onOpenExecutiveReport}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-cyan-300 font-bold text-xs transition-all shadow-sm"
            title="Сформировать управленческий отчёт по процессам для Совета Директоров"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Отчёт Директорату</span>
          </button>
        )}

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative w-9 h-9 rounded-xl bg-[#0f172a] hover:bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0f172a] border border-white/10 shadow-2xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                <span className="text-xs font-bold text-white">Уведомления</span>
                <span className="text-[10px] text-blue-400 cursor-pointer hover:underline">
                  Все как прочитанные
                </span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.map((n, idx) => (
                  <div 
                    key={idx}
                    onClick={() => {
                      if (n.ticketId) onSelectTicket(n.ticketId);
                      setShowNotifications(false);
                    }}
                    className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-blue-400">{n.title}</span>
                      <span className="text-[9px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-tight">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Account or Login / Register Buttons */}
        {currentUser ? (
          <div className="relative pl-2 border-l border-white/10">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-colors"
            >
              <img
                src={currentUser.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name)}`}
                alt={currentUser.name}
                className="w-9 h-9 rounded-xl object-cover border border-blue-500/30"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{currentUser.name}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <div className="text-[10px] text-slate-400">{currentUser.department || currentUser.role}</div>
              </div>
            </button>

            {/* Profile Menu Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0f172a] border border-white/10 shadow-2xl p-3 z-50 animate-fadeIn">
                <div className="p-2 border-b border-white/5 mb-2">
                  <div className="text-xs font-bold text-white">{currentUser.name}</div>
                  <div className="text-[11px] text-slate-400 truncate">{currentUser.email}</div>
                  <div className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {currentUser.role} • {currentUser.department}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Выйти из аккаунта</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <button
              onClick={onOpenAuth}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Войти</span>
            </button>

            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-glow-blue transition-all"
            >
              Регистрация
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
