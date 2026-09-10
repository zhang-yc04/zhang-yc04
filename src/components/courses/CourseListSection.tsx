import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CourseCategory, CourseLevel } from '../../types';
import { CourseCard } from './CourseCard';
import { Sparkles, Filter, Search, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CourseListSection: React.FC = () => {
  const { courses, navigateToRegister } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [selectedLevel, setSelectedLevel] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['全部', '短影音剪輯', '商業運鏡與拍攝', '影音行銷策略', '調色與聲音設計'];
  const levels = ['全部', '入門零基礎', '進階商業班', '實體高階工作坊'];

  const filteredCourses = courses.filter((c) => {
    const matchesCategory = selectedCategory === '全部' || c.category === selectedCategory;
    const matchesLevel = selectedLevel === '全部' || c.level === selectedLevel;
    const matchesSearch =
      searchQuery.trim() === '' ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            2025 年度實戰課綱
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            全系列影音實戰工作坊
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            每個班級皆由具備 8-11
            年產業經歷的資深導演與操盤手親授，搭配專業實體攝影棚與一人一機實作，真正帶走屬於自己的高規格商業成片。
          </p>
        </div>

        {/* Filter Controls & Search Box */}
        <div className="bg-neutral-900/80 p-4 sm:p-6 rounded-2xl border border-neutral-800 space-y-4 mb-12 shadow-lg">
          {/* Top: Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs text-neutral-400 font-semibold shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              專業領域：
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Bottom Row: Level & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3 border-t border-neutral-800">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-neutral-400 font-semibold shrink-0 mr-1">學員程度：</span>
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-neutral-200 text-neutral-950 font-bold'
                      : 'bg-neutral-950 text-neutral-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="搜尋關鍵字（如：CapCut, 微單, 調色）..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-neutral-900/40 rounded-3xl border border-neutral-800">
            <p className="text-neutral-400 text-sm">找不到符合條件的課程項目，請嘗試調整篩選條件或搜尋關鍵字。</p>
            <button
              onClick={() => {
                setSelectedCategory('全部');
                setSelectedLevel('全部');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-neutral-800 text-amber-400 text-xs font-bold hover:bg-neutral-700"
            >
              清除全部篩選條件
            </button>
          </div>
        )}

        {/* Free Equipment Loan Guarantee */}
        <div className="mt-16 p-8 rounded-3xl bg-neutral-900 border border-neutral-800 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-2">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              現場實習配備全免租借
            </div>
            <h3 className="text-xl font-black text-white">上課需要先花大錢買相機或燈具嗎？</h3>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              不需要！創映學苑現場常備 Sony 微單相機、專業影視燈光 Nanlite、Aputure、DJI 穩定器與無線領夾麥克風，上課期間免費提供學員分組輪流實操練習，讓你體驗過後再決定是否添購。
            </p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <button
              onClick={() => navigateToRegister()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              立即預約工作坊席次 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
