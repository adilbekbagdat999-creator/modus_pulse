import React from 'react';
import { 
  Home, 
  Inbox, 
  PlusCircle, 
  BarChart3, 
  Lightbulb, 
  BookOpen, 
  Settings, 
  LogOut, 
  Sparkles, 
  ArrowUpRight,
  MessageSquare,
  ShieldAlert,
  LogIn
} from 'lucide-react';

export default function Sidebar({ 
  currentView, 
  setCurrentView, 
  unreadCount, 
  openCreateModal,
  currentUser,
  onOpenAuth,
  onLogout 
}) {
  const isDirector = currentUser && (currentUser.role.includes('директор') || currentUser.role.includes('Руководитель'));

  const navItems = [
    { id: 'dashboard', label: 'Главная', icon: Home },
    { id: 'my-tickets', label: 'Мои обращения', icon: Inbox, badge: unreadCount },
    { id: 'director-inbox', label: 'Органайзер директора', icon: ShieldAlert, badge: 3, highlight: true },
    { id: 'direct-chat', label: 'Прямой чат', icon: MessageSquare },
    { id: 'analytics', label: 'Аналитика и Радар', icon: BarChart3 },
    { id: 'ideas', label: 'Идеи и предложения', icon: Lightbulb },
    { id: 'knowledge', label: 'База знаний', icon: BookOpen },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ];

  return (
    <aside className="w-64 min-w-[256px] h-screen sticky top-0 flex flex-col justify-between p-4 bg-[#090e1c]/80 backdrop-blur-xl border-r border-white/5 z-30 select-none">
      {/* Top Branding */}
      <div>
        <div className="flex items-center gap-3 px-3 py-2 mb-6">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-[1px] shadow-glow-blue flex items-center justify-center">
            <div className="w-full h-full bg-[#0a0f22] rounded-[11px] flex items-center justify-center font-black text-xl text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-cyan-300 to-indigo-200">
              M
            </div>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
          </div>
          <div>
            <div className="text-base font-extrabold tracking-wider text-white flex items-center gap-1.5">
              <span>MODUS</span>
              <span className="text-blue-400">PULSE</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
              ГК «Модус Трейд»
            </div>
          </div>
        </div>

        {/* Quick CTA */}
        <button
          onClick={openCreateModal}
          className="w-full mb-6 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-glow-blue transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Создать обращение</span>
        </button>

        {/* Nav Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/30 to-blue-500/10 text-white border-l-2 border-blue-500 shadow-[inset_0_0_12px_rgba(37,99,235,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.highlight 
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Area */}
      <div className="space-y-3 pt-4 border-t border-white/5">
        {currentUser ? (
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <img 
                src={currentUser.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name)}`} 
                alt="" 
                className="w-8 h-8 rounded-lg object-cover flex-shrink-0 border border-white/10" 
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{currentUser.department || currentUser.role}</div>
              </div>
            </div>
            <button
              onClick={onLogout}
              title="Выйти из аккаунта"
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-colors flex-shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-gradient-to-r from-blue-600/30 to-indigo-600/30 hover:from-blue-600/40 hover:to-indigo-600/40 border border-blue-500/30 text-white font-bold text-xs transition-colors"
          >
            <LogIn className="w-4 h-4 text-blue-400" />
            <span>Войти в аккаунт</span>
          </button>
        )}
      </div>
    </aside>
  );
}
