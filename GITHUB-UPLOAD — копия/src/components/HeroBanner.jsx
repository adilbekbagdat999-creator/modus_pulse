import React from 'react';
import { ArrowRight, TrendingUp, Sparkles } from 'lucide-react';

export default function HeroBanner({ openCreateModal }) {
  return (
    <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10 mb-8 border border-white/10 shadow-2xl bg-gradient-to-r from-[#0c1633] via-[#0e1d45] to-[#0a1329]">
      {/* Decorative background grid and lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>
      
      {/* Glow orbs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-semibold mb-4 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>MODUS PULSE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
            От идеи к реальным <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-200">
              улучшениям
            </span>
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-lg">
            Сообщайте о проблемах, предлагайте идеи и помогайте нам становиться лучше! 
            Каждое обращение отслеживается прозрачно от регистрации до результата.
          </p>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow-blue transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Создать обращение</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3D Stylized M Emblem & Floating Tag */}
        <div className="relative flex items-center justify-center self-center md:self-auto pr-4">
          {/* Floating Pill: Ваш вклад создаёт перемены */}
          <div className="absolute -top-4 -right-2 sm:right-4 z-20 px-3.5 py-2 rounded-2xl bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 shadow-xl flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-medium">Ваш вклад</div>
              <div className="text-xs font-bold text-white">создаёт перемены</div>
            </div>
          </div>

          {/* Glowing 3D Emblem Container */}
          <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
            {/* Orbit ring */}
            <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute inset-4 rounded-full border border-dashed border-blue-500/20 animate-[spin_35s_linear_infinite_reverse]"></div>

            {/* Glowing Big M */}
            <div className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-1 shadow-[0_0_50px_rgba(37,99,235,0.4)] flex items-center justify-center">
              <div className="w-full h-full bg-[#0a1024] rounded-[22px] flex items-center justify-center">
                <span className="font-black text-6xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-blue-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                  M
                </span>
              </div>
            </div>

            {/* Sparkles */}
            <Sparkles className="w-5 h-5 text-cyan-300 absolute top-4 left-6 animate-pulse" />
            <Sparkles className="w-4 h-4 text-indigo-300 absolute bottom-6 right-6 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
