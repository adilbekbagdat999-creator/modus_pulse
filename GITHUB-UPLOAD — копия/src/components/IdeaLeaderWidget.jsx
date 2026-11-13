import React from 'react';
import { Trophy, Star, ThumbsUp, Sparkles, Building2 } from 'lucide-react';

export default function IdeaLeaderWidget({ onOpenMarketplace }) {
  return (
    <div className="relative rounded-3xl p-5 bg-[#0f172a]/70 backdrop-blur-md border border-white/5 shadow-xl flex flex-col justify-between overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Trophy className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-white tracking-wide">
              Лучшая инициатива месяца
            </h2>
          </div>

          <span className="text-[10px] text-amber-400 font-bold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            Топ-1
          </span>
        </div>

        {/* Department / Initiative Info */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5 mb-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-[1px] flex items-center justify-center">
            <div className="w-full h-full bg-[#121936] rounded-[11px] flex items-center justify-center text-amber-400">
              <Building2 className="w-6 h-6" />
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Отдел снабжения и закупок</span>
            </div>
            <div className="text-[10px] text-slate-400">Инициатива по обучению линейкам оборудования</div>
            <div className="text-[11px] font-bold text-amber-400 flex items-center gap-1 mt-0.5">
              <ThumbsUp className="w-3 h-3" />
              <span>124 голоса коллег</span>
            </div>
          </div>
        </div>

        {/* 3D Star / Trophy visual */}
        <div className="flex items-center justify-center py-2 relative">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-[0_0_25px_rgba(245,158,11,0.4)] flex items-center justify-center rotate-6 hover:rotate-12 transition-transform duration-300">
              <div className="w-full h-full bg-[#161c33] rounded-[14px] flex items-center justify-center">
                <Star className="w-8 h-8 text-amber-300 fill-amber-300" />
              </div>
            </div>
            <Sparkles className="w-4 h-4 text-amber-300 absolute -top-2 -right-2 animate-bounce" />
          </div>
        </div>
      </div>

      <button
        onClick={onOpenMarketplace}
        className="w-full mt-2 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-amber-500/20 border border-white/5 hover:border-amber-500/30 text-xs font-semibold text-slate-300 hover:text-amber-300 transition-colors flex items-center justify-center gap-2"
      >
        <span>Посмотреть биржу идей</span>
        <span>→</span>
      </button>
    </div>
  );
}
