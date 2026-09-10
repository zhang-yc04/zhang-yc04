import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Award,
  Video,
  Sparkles,
  ArrowRight,
  Quote,
  CheckCircle2,
  Calendar,
  ShieldCheck,
} from 'lucide-react';

export const InstructorsSection: React.FC = () => {
  const { instructors, navigateToRegister, setCurrentView } = useApp();

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
            <Award className="w-3.5 h-3.5" />
            業界一線師資陣容
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            不講空話，只傳授百萬播放與商業變現的真實經驗
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            由 10 年國際廣告導演、累積破千萬播放的短影音操盤總監、與專業電影攝影指導親自手把手教學。
            我們不只教操作，更帶你站在第一線產業高度思考鏡頭與商業行銷。
          </p>
        </div>

        {/* Instructors Detail Cards */}
        <div className="space-y-12">
          {instructors.map((inst, index) => (
            <div
              key={inst.id}
              className="bg-neutral-900/90 rounded-3xl border border-neutral-800 hover:border-amber-500/40 p-6 sm:p-10 transition-all duration-300 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                {/* Left: Avatar & Quick Stats */}
                <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-2xl">
                    <img
                      src={inst.avatar}
                      alt={inst.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-amber-400 font-bold text-xs">
                      {inst.yearsExperience} 年第一線實戰資歷
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-white">{inst.name}</h2>
                    <p className="text-amber-400 text-sm font-semibold mt-0.5">{inst.title}</p>
                    <p className="text-xs text-neutral-400 mt-1 font-medium">{inst.role}</p>
                  </div>

                  {/* Instructor Numbers */}
                  <div className="w-full grid grid-cols-3 gap-2 pt-2 text-center">
                    {inst.stats.map((st, i) => (
                      <div key={i} className="p-2 rounded-xl bg-neutral-950 border border-neutral-800">
                        <div className="text-xs sm:text-sm font-black text-white">{st.value}</div>
                        <div className="text-[10px] text-neutral-400 mt-0.5">{st.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Bio, Quote, Past Clients & Skills */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Quote Banner */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-neutral-200 text-sm sm:text-base italic flex items-start gap-3">
                    <Quote className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                    <p className="leading-relaxed">「{inst.quote}」</p>
                  </div>

                  {/* Bio Paragraph */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      導師背景與教學理念
                    </h3>
                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                      {inst.bio}
                    </p>
                  </div>

                  {/* Expertise Tags */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                      核心專精領域
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {inst.expertise.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-lg text-xs font-medium bg-neutral-800 text-neutral-200 border border-neutral-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Past Clients / Brand Credits */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                      曾合作或執導之知名品牌與機構
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {inst.pastClients.map((client, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md text-xs font-semibold bg-neutral-950 text-amber-300/90 border border-neutral-800"
                        >
                          {client}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA for this instructor */}
                  <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <ShieldCheck className="w-4 h-4 text-green-400" />
                      <span>全程親自授課・不派助教代打・保證小班逐一指導</span>
                    </div>
                    <button
                      onClick={() => navigateToRegister()}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <span>搶先預約 {inst.name} 導師班別</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center p-8 rounded-3xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 space-y-4">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            想與三位名師面對面？現場手把手解答你的影音痛點
          </h3>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto">
            所有工作坊皆在台北信義區創映實體影棚進行，現場備有專業燈具、監看螢幕與微單相機供實機借用。
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => setCurrentView('courses')}
              className="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-sm border border-neutral-700 cursor-pointer"
            >
              瀏覽所有開班時間
            </button>
            <button
              onClick={() => navigateToRegister()}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm shadow-md cursor-pointer"
            >
              立即報名保留席位
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
