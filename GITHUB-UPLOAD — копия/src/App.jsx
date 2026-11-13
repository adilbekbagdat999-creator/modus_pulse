import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import StatsCards from './components/StatsCards';
import ChartsSection from './components/ChartsSection';
import TicketsList from './components/TicketsList';
import ModusAIWidget from './components/ModusAIWidget';
import IdeaLeaderWidget from './components/IdeaLeaderWidget';
import TicketDetailModal from './components/TicketDetailModal';
import CreateTicketModal from './components/CreateTicketModal';
import DirectorOrganizer from './components/DirectorOrganizer';
import FrictionRadarView from './components/FrictionRadarView';
import DirectChatView from './components/DirectChatView';
import IdeasMarketplaceView from './components/IdeasMarketplaceView';
import KnowledgeBaseView from './components/KnowledgeBaseView';
import AuthModal from './components/AuthModal';
import ExecutiveReportModal from './components/ExecutiveReportModal';
import { initialTickets } from './data/mockTickets';
import { getTickets, addTicket, updateTicket, isSupabaseConfigured } from './lib/supabase';
import { Database } from 'lucide-react';

export default function App() {
  const [tickets, setTickets] = useState(initialTickets);
  
  // Реальный пользователь из сессии или null (не залогинен)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('modus_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isExecutiveReportOpen, setIsExecutiveReportOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Загрузка данных при старте
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getTickets();
      if (data && data.length > 0) {
        setTickets(data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const [notifications, setNotifications] = useState([
    {
      title: 'Статус обновлен',
      text: 'Обращение #A-003 «Разные обозначения изделий» переведено в статус «В работе».',
      time: '12 минут назад',
      read: false,
      ticketId: 'A-003'
    },
    {
      title: 'Ответ руководства',
      text: 'По предложению #A-002 назначен ответственный.',
      time: '1 час назад',
      read: false,
      ticketId: 'A-002'
    }
  ]);

  // Handle ticket update from detail modal
  const handleUpdateTicket = async (updatedTicket) => {
    setTickets(prev => prev.map(t => t.id === updatedTicket.id ? updatedTicket : t));
    await updateTicket(updatedTicket);
  };

  // Handle new ticket created
  const handleCreateTicket = async (newTicket) => {
    setTickets(prev => [newTicket, ...prev]);
    await addTicket(newTicket);

    setNotifications(prev => [
      {
        title: 'Обращение зарегистрировано',
        text: `Обращение #${newTicket.id} успешно сохранено в базе данных.`,
        time: 'только что',
        read: false,
        ticketId: newTicket.id
      },
      ...prev
    ]);
  };

  // Выход из системы
  const handleLogout = () => {
    localStorage.removeItem('modus_user');
    setCurrentUser(null);
  };

  // Успешный вход или регистрация
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setNotifications(prev => [
      {
        title: 'Добро пожаловать!',
        text: `Вы вошли как ${user.name} (${user.department || user.role}).`,
        time: 'только что',
        read: false
      },
      ...prev
    ]);
  };

  // Открытие модалки создания обращения с проверкой авторизации
  const handleOpenCreateModal = () => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }
    setIsCreateModalOpen(true);
  };

  // Filter tickets by search query
  const filteredTickets = tickets.filter(t => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.id.toLowerCase().includes(q) ||
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.department.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  });

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  return (
    <div className="flex min-h-screen bg-[#070b14] text-slate-100">
      {/* Left Sidebar */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        unreadCount={tickets.filter(t => t.status === 'Новое').length}
        openCreateModal={handleOpenCreateModal}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentUser={currentUser}
          notifications={notifications}
          onSelectTicket={(id) => setSelectedTicketId(id)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onLogout={handleLogout}
          onOpenExecutiveReport={() => setIsExecutiveReportOpen(true)}
        />

        {/* Database Status Ribbon */}
        <div className="px-6 py-1.5 bg-[#0b1021] border-b border-white/5 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-400">База данных:</span>
            {isSupabaseConfigured ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Supabase Online (PostgreSQL)
              </span>
            ) : (
              <span className="text-amber-400 font-bold">Демо-режим</span>
            )}
          </div>
          {loading && <span className="text-blue-400 font-medium animate-pulse">Синхронизация...</span>}
        </div>

        <main className="flex-1 p-5 sm:p-8 max-w-7xl w-full mx-auto">
          {/* 1. Main Dashboard View */}
          {currentView === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              <HeroBanner openCreateModal={handleOpenCreateModal} />
              <StatsCards tickets={tickets} />
              <ChartsSection />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <TicketsList
                    tickets={filteredTickets}
                    onSelectTicket={(id) => setSelectedTicketId(id)}
                    onViewAll={() => setCurrentView('my-tickets')}
                    limit={6}
                  />
                </div>

                <div className="space-y-6">
                  <ModusAIWidget
                    onSelectTicket={(id) => setSelectedTicketId(id)}
                    openCreateModal={handleOpenCreateModal}
                  />
                  <IdeaLeaderWidget
                    onOpenMarketplace={() => setCurrentView('ideas')}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2. My Tickets */}
          {currentView === 'my-tickets' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-black text-white">Все обращения сотрудников</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    База данных ГК «Модус Трейд» • Нажмите на любое обращение для просмотра трекера и чата
                  </p>
                </div>
                <button
                  onClick={handleOpenCreateModal}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-blue transition-colors"
                >
                  + Подать обращение
                </button>
              </div>

              <TicketsList
                tickets={filteredTickets}
                onSelectTicket={(id) => setSelectedTicketId(id)}
                limit={null}
              />
            </div>
          )}

          {/* 3. Director Smart Organizer */}
          {currentView === 'director-inbox' && (
            <DirectorOrganizer
              tickets={filteredTickets}
              onSelectTicket={(id) => setSelectedTicketId(id)}
              onUpdateTicket={handleUpdateTicket}
            />
          )}

          {/* 4. Direct Messenger */}
          {currentView === 'direct-chat' && (
            <DirectChatView 
              currentUser={currentUser} 
              onOpenAuth={() => setIsAuthOpen(true)} 
            />
          )}

          {/* 5. Friction Radar & Analytics */}
          {currentView === 'analytics' && (
            <FrictionRadarView
              tickets={tickets}
              onSelectTicket={(id) => setSelectedTicketId(id)}
              onOpenExecutiveReport={() => setIsExecutiveReportOpen(true)}
            />
          )}

          {/* 6. Ideas Marketplace */}
          {currentView === 'ideas' && (
            <IdeasMarketplaceView
              tickets={tickets}
              onSelectTicket={(id) => setSelectedTicketId(id)}
            />
          )}

          {/* 7. Knowledge Base */}
          {currentView === 'knowledge' && (
            <KnowledgeBaseView />
          )}

          {/* 8. Settings */}
          {currentView === 'settings' && (
            <div className="p-8 rounded-3xl bg-[#0f172a]/70 border border-white/5 space-y-6">
              <h2 className="text-xl font-bold text-white">Настройки системы</h2>
              <div className="space-y-4 text-xs text-slate-300">
                {currentUser ? (
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={currentUser.avatar} alt="" className="w-10 h-10 rounded-xl object-cover border border-blue-500/30" />
                      <div>
                        <div className="font-bold text-white text-sm">{currentUser.name}</div>
                        <div className="text-slate-400">{currentUser.email} • {currentUser.department} ({currentUser.role})</div>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white font-bold text-xs transition-colors"
                    >
                      Выйти
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-sm">Вы не авторизованы</div>
                      <div className="text-slate-400">Войдите или зарегистрируйтесь для полного доступа к подаче обращений</div>
                    </div>
                    <button
                      onClick={() => setIsAuthOpen(true)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                    >
                      Войти
                    </button>
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white mb-0.5">База данных Supabase (PostgreSQL)</div>
                    <div className="text-slate-400">
                      {isSupabaseConfigured 
                        ? 'Подключена облачная база данных с синхронизацией в реальном времени' 
                        : 'Демо-режим'}
                    </div>
                  </div>
                  <span className={`font-bold px-3 py-1 rounded-full text-[11px] ${
                    isSupabaseConfigured ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {isSupabaseConfigured ? 'Подключено' : 'Демо'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          currentUser={currentUser || { name: 'Гость', role: 'Сотрудник' }}
          onClose={() => setSelectedTicketId(null)}
          onUpdateTicket={handleUpdateTicket}
        />
      )}

      {/* Create Ticket Modal */}
      {isCreateModalOpen && (
        <CreateTicketModal
          currentUser={currentUser || { name: 'Сотрудник', role: 'Сотрудник' }}
          existingTickets={tickets}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateTicket={handleCreateTicket}
        />
      )}

      {/* Auth Modal (Регистрация / Вход) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Executive Report Modal (Сводка для Совета Директоров) */}
      <ExecutiveReportModal
        isOpen={isExecutiveReportOpen}
        onClose={() => setIsExecutiveReportOpen(false)}
        tickets={tickets}
      />
    </div>
  );
}
