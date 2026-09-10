import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Camera,
  Layers,
  Sparkles,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export const ValuePropsSection: React.FC = () => {
  const { navigateToRegister, setCurrentView } = useApp();

  const features = [
    {
      icon: <FileText className="w-6 h-6 text-amber-400" />,
      title: '腳本思維先於剪輯技法',
      desc: '為什麼辛苦剪了一整天沒人看？問題出在開頭！我們教你百萬播放的「鉤子心理學」，從受眾痛點、反差衝突到完播留存，打好商業變現基礎。',
      tag: '行銷商業思維',
    },
    {
      icon: <Camera className="w-6 h-6 text-amber-400" />,
      title: '器材免破百萬，手機到微單通吃',
      desc: '拒絕無意義的器材軍備競賽！掌握一扇窗的自然光、百元柔光罩與指向麥克風，一人小編制也能拍出商業客戶認可的高質感畫面。',
      tag: '實機手把手',
    },
    {
      icon: <Layers className="w-6 h-6 text-amber-400" />,
      title: '現場即席產出，帶著成片結業',
      desc: '不要只在台下抄筆記！每堂課均安排「即席運鏡分組」與「雙軌節奏剪輯實操」，下課當天立即帶著至少 2-3 支完整且驗證過的成片離場。',
      tag: '拒絕紙上談兵',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-amber-400" />,
      title: '課後 30 天作品陪跑與逐幀修改',
      desc: '回到公司或工作室拍片卡關怎麼辦？專屬 Discord 與 LINE 學員交流群，由 Mark 與 Emily 老師親自逐幀點評、幫你抓出節奏卡點。',
      tag: '終身成長社群',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-neutral-900/40 border-y border-neutral-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            創映實戰承諾
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            為什麼超過 1,800 位行銷人選擇在創映學影音？
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            我們深知 25-40
            歲的你時間寶貴。沒有花拳繡腿的術語堆疊，只有第一線導演與百萬操盤手的實戰經驗萃取，幫助你在職場或個人品牌中快速建立視覺影響力。
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/90 rounded-2xl p-6 border border-neutral-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold text-neutral-400 px-2.5 py-0.5 rounded-full bg-neutral-800 border border-neutral-700">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center text-xs font-semibold text-amber-400/90 group-hover:text-amber-400">
                <span>納入各班標準訓練</span>
                <CheckCircle className="w-4 h-4 ml-1.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Section Call to Action */}
        <div className="mt-12 p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                不確定自己的程度適合哪一門課？
              </h4>
              <p className="text-xs text-neutral-400">
                歡迎填寫 2 分鐘線上自我診斷，由教學顧問為你推薦最符合需求的實戰班別。
              </p>
            </div>
          </div>
          <button
            onClick={() => navigateToRegister()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
          >
            <span>預約 1 對 1 課前評估</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
