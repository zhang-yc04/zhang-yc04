import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Sparkles, TrendingUp, Quote, ArrowRight, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { studentShowcases, navigateToRegister, setCurrentView } = useApp();

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
            <Award className="w-3.5 h-3.5" />
            學員真實成效與作品見證
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            不只學會拍片，更在市場上創造真實回響
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            從餐飲品牌行銷主管、獨立美業創作者，到想接商業案的自由工作者。
            看看他們如何藉由創映的實戰方法，把鏡頭變成帶進實質訂單與粉絲的放大器。
          </p>
        </div>

        {/* Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {studentShowcases.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-900/90 rounded-3xl border border-neutral-800 hover:border-amber-500/40 p-6 flex flex-col justify-between space-y-6 shadow-xl group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Result Tag */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 font-bold text-xs flex items-center gap-1.5 border border-amber-500/30">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {item.viewsOrMetric}
                  </span>
                  <span className="text-[11px] text-neutral-500">真實成效見證</span>
                </div>

                {/* Cover Image */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800">
                  <img
                    src={item.coverImage}
                    alt={item.studentName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 text-xs font-bold text-white">
                    參訓班別：{item.courseName}
                  </div>
                </div>

                {/* Result Headline */}
                <div className="text-base font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                  {item.result}
                </div>

                {/* Quote */}
                <p className="text-neutral-400 text-xs sm:text-sm italic leading-relaxed">
                  {item.quote}
                </p>
              </div>

              {/* Student Identity */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{item.studentName}</div>
                  <div className="text-xs text-neutral-500">{item.identity}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-amber-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Numbers */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-3xl bg-neutral-900 border border-neutral-800 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">92%</div>
            <div className="text-xs text-neutral-400 mt-1">結業 1 個月內產出首支破萬短影音</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">2.4 倍</div>
            <div className="text-xs text-neutral-400 mt-1">自媒體學員平均接案報價增幅</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">4.9 星</div>
            <div className="text-xs text-neutral-400 mt-1">超過 400 則 Google 實名高分評價</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">100%</div>
            <div className="text-xs text-neutral-400 mt-1">現場攜帶成片與專業腳本結業</div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 text-center p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-neutral-900 to-amber-500/10 border border-amber-500/30 space-y-4">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            你也想在下個季度，用動態影像替品牌或自己開啟新機會？
          </h3>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto">
            每班僅收 10-14 人，導師保證逐一指導分鏡與修剪成片。立即保留您的實體席次。
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => navigateToRegister()}
              className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-sm shadow-xl shadow-amber-500/25 transition-all cursor-pointer"
            >
              馬上預約工作坊席次 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
