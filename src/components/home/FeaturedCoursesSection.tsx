import React from 'react';
import { useApp } from '../../context/AppContext';
import { CourseCard } from '../courses/CourseCard';
import { Compass, ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedCoursesSection: React.FC = () => {
  const { courses, setCurrentView, navigateToRegister } = useApp();

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            2025 旗艦熱門班別
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            精選實戰影音工作坊，從 0 到 1 打造爆款成片
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl">
            無論你是想用手機經營 IG Reels / TikTok 的社群行銷人，還是想掌握單眼微單打光運鏡的創作者，都能找到對應程度的精修班。
          </p>
        </div>

        <button
          onClick={() => setCurrentView('courses')}
          className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-semibold text-xs sm:text-sm border border-neutral-700/80 flex items-center gap-2 transition-all group shrink-0 cursor-pointer"
        >
          <span>查看全部 4 門實戰課程</span>
          <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.slice(0, 3).map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Bottom Assistance Banner */}
      <div className="mt-12 text-center p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <span className="text-sm font-bold text-white block">需要為公司行銷團隊安排企業內訓包班？</span>
          <span className="text-xs text-neutral-400">
            創映提供客製化企業內訓（手機短影音量產、產品形象拍攝、專訪打光錄音），歡迎洽詢專案規劃。
          </span>
        </div>
        <button
          onClick={() => setCurrentView('contact')}
          className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-xs font-bold border border-amber-500/30 shrink-0 transition-colors cursor-pointer"
        >
          洽詢企業客製包班方案 →
        </button>
      </div>
    </section>
  );
};
