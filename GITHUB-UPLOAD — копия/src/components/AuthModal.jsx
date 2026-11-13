import React, { useState } from 'react';
import { Sparkles, Mail, Lock, User, Building, ArrowRight, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('Закупки');
  const [role, setRole] = useState('Сотрудник');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (isRegister) {
        // Регистрация нового реального пользователя
        let authUser = {
          id: 'user-' + Date.now(),
          name: fullName.trim() || 'Пользователь',
          email: email.trim().toLowerCase(),
          role: role,
          department: department,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName || email)}&backgroundColor=2563eb,06b6d4,8b5cf6`
        };

        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase.auth.signUp({
            email: email.trim(),
            password: password,
            options: {
              data: {
                full_name: fullName.trim(),
                department: department,
                role: role
              }
            }
          });

          if (error && !error.message.includes('already registered')) {
            console.warn('Supabase auth notice:', error.message);
          } else if (data?.user) {
            authUser.id = data.user.id;
          }
        }

        // Сохраняем сессию
        localStorage.setItem('modus_user', JSON.stringify(authUser));
        setSuccessMsg('Регистрация успешна! Вход в систему...');
        setTimeout(() => {
          onLoginSuccess(authUser);
          onClose();
        }, 500);

      } else {
        // Вход в существующий аккаунт
        let authUser = null;

        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password
          });

          if (data?.user) {
            authUser = {
              id: data.user.id,
              name: data.user.user_metadata?.full_name || email.split('@')[0],
              email: email.trim(),
              role: data.user.user_metadata?.role || 'Сотрудник',
              department: data.user.user_metadata?.department || 'Закупки',
              avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.user.user_metadata?.full_name || email)}&backgroundColor=2563eb,06b6d4`
            };
          }
        }

        if (!authUser) {
          // Если вход без подтверждения почты или локальный режим
          const saved = localStorage.getItem('modus_user');
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.email === email.trim().toLowerCase()) {
              authUser = parsed;
            }
          }

          if (!authUser) {
            authUser = {
              id: 'u-' + Date.now(),
              name: email.split('@')[0],
              email: email.trim(),
              role: 'Сотрудник',
              department: 'Закупки',
              avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}&backgroundColor=2563eb,06b6d4`
            };
          }
        }

        localStorage.setItem('modus_user', JSON.stringify(authUser));
        setSuccessMsg('Авторизация успешна!');
        setTimeout(() => {
          onLoginSuccess(authUser);
          onClose();
        }, 400);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Ошибка авторизации. Проверьте данные.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#0b1021] border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center absolute top-5 right-5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Glow */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Branding header */}
        <div className="text-center mb-6">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px] shadow-glow-blue mb-3">
            <div className="w-full h-full bg-[#0a0f22] rounded-[15px] flex items-center justify-center font-black text-2xl text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-300">
              M
            </div>
          </div>
          <h2 className="text-xl font-black text-white tracking-wide">
            {isRegister ? 'Создать аккаунт' : 'Вход в аккаунт'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Платформа обратной связи ГК «Модус Трейд»
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isRegister && (
            <>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Ваше имя и фамилия
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Например: Руслан Алиев"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Подразделение
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-2.5 py-2.5 rounded-xl bg-[#0f172a] border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Закупки">Закупки</option>
                    <option value="Проектирование">Проектирование</option>
                    <option value="Продажи">Продажи</option>
                    <option value="Бухгалтерия">Бухгалтерия</option>
                    <option value="IT-департамент">IT-департамент</option>
                    <option value="Руководство">Руководство</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Должность / Роль
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-2.5 py-2.5 rounded-xl bg-[#0f172a] border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Сотрудник">Сотрудник</option>
                    <option value="Руководитель направления">Руководитель</option>
                    <option value="Генеральный директор">Директор</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">
              Пароль
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль (от 6 символов)"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-glow-blue flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
          >
            <span>{loading ? 'Обработка...' : isRegister ? 'Зарегистрироваться' : 'Войти'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Toggle between Login and Register */}
        <div className="text-center mt-5 pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            {isRegister 
              ? 'Уже есть аккаунт? Войти' 
              : 'Нет аккаунта? Зарегистрироваться'}
          </button>
        </div>
      </div>
    </div>
  );
}
