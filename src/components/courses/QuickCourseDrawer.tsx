import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Play,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Users,
  ArrowRight,
  ShieldCheck,
  Flame,
  Award,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const QuickCourseDrawer: React.FC = () => {
  const {
    isQuickDrawerOpen,
    closeQuickDrawer,
    quickDrawerCourse,
    openTrailer,
    navigateToRegister,
    navigateToCourse,
  } = useApp();

  if (!isQuickDrawerOpen || !quickDrawerCourse) return null;

  const handleEnroll = () => {
    closeQuickDrawer();
    navigateToRegister(quickDrawerCourse.id);
  };

  const handleFullDetail = () => {
    closeQuickDrawer();
    navigateToCourse(quickDrawerCourse.id);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeQuickDrawer}
      id="quick-drawer-backdrop"
    >
      <div
        className="relative w-full max-w-xl h-full bg-[#0c0b11] border-l border-white/10 shadow-2xl overflow-y-auto flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
        id="quick-drawer-container"
      >
        {/* Drawer Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0c0b11]/90 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-neutral-300 uppercase">
              STREAMINGBAR ✦ 課程速查導覽
            </span>
          </div>

          <button
            onClick={closeQuickDrawer}
            className="p-2 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="關閉快速預覽 (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="p-6 space-y-6 flex-1">
          {/* Media Header Banner */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 group bg-neutral-950">
            <img
              src={quickDrawerCourse.backdropImage || quickDrawerCourse.featuredImage}
              alt={quickDrawerCourse.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* Play Trailer overlay button */}
            <button
              onClick={() => {
                closeQuickDrawer();
                openTrailer(quickDrawerCourse);
              }}
              className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-amber-500/90 hover:bg-amber-400 text-neutral-950 flex items-center justify-center shadow-2xl transition-transform transform hover:scale-110 cursor-pointer group/play"
              title="播放前導預告"
            >
              <Play className="w-6 h-6 fill-neutral-950 translate-x-0.5" />
            </button>

            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-black/80 backdrop-blur-md text-amber-400 border border-amber-500/30">
                {quickDrawerCourse.category}
              </span>
              <span className="px-2 py-1 rounded-md text-xs font-medium bg-neutral-900/80 text-neutral-300 border border-neutral-700">
                {quickDrawerCourse.level}
              </span>
            </div>

            {/* Rating Tag */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-300">
              <span className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-amber-400 font-bold border border-amber-500/20">
                ★ {quickDrawerCourse.rating || 4.9}（{quickDrawerCourse.matchPercentage || 99}% 好評）
              </span>
              <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-neutral-300">
                預告片 {quickDrawerCourse.trailerLength || '02:45'}
              </span>
            </div>
          </div>

          {/* Title and Subtitle */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {quickDrawerCourse.title}
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              {quickDrawerCourse.subtitle}
            </p>
          </div>

          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              課程核心價值
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {quickDrawerCourse.summary}
            </p>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-400 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>時數天數</span>
              </div>
              <div className="text-white font-bold">{quickDrawerCourse.duration}</div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-400 font-medium">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>班級編制</span>
              </div>
              <div className="text-white font-bold">上限 {quickDrawerCourse.maxSeats} 人・小班精修</div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1 col-span-2">
              <div className="flex items-center gap-1.5 text-neutral-400 font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>實體授課地點</span>
              </div>
              <div className="text-white font-bold">{quickDrawerCourse.location}</div>
            </div>
          </div>

          {/* Key Syllabus Modules Preview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                四大核心單元課綱
              </span>
              <span className="text-[11px] text-neutral-500">共 {quickDrawerCourse.syllabus.length} 個章節</span>
            </div>

            <div className="space-y-2">
              {quickDrawerCourse.syllabus.map((module, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-neutral-900/40 border border-white/5 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">0{idx + 1}. {module.title}</span>
                    <span className="font-mono text-neutral-400 text-[11px] bg-neutral-800 px-2 py-0.5 rounded">
                      {module.duration}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-400 pl-4 space-y-0.5">
                    {module.points.slice(0, 2).map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span className="line-clamp-1">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Schedule Dates */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                近期可預約實體梯次
              </span>
              <span className="text-[11px] font-bold text-amber-300">
                剩餘 {quickDrawerCourse.remainingSeats} 個席次
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-neutral-300">
              {quickDrawerCourse.scheduleDates.map((dateStr, dIdx) => (
                <li key={dIdx} className="flex items-center gap-2 bg-black/40 px-3 py-2 rounded-lg border border-amber-500/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{dateStr}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="sticky bottom-0 p-6 bg-[#0c0b11]/95 backdrop-blur-xl border-t border-white/10 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-neutral-400 block">早鳥優惠價</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">
                  NT$ {quickDrawerCourse.price.toLocaleString()}
                </span>
                <span className="text-xs text-neutral-500 line-through">
                  NT$ {quickDrawerCourse.originalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={handleFullDetail}
              className="text-xs font-semibold text-neutral-400 hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>檢視獨立頁面</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                closeQuickDrawer();
                openTrailer(quickDrawerCourse);
              }}
              className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs flex items-center justify-center gap-1.5 border border-neutral-700 transition-colors cursor-pointer"
            >
              <Play className="w-4 h-4 fill-neutral-200" />
              <span>試看預告片</span>
            </button>

            <button
              onClick={handleEnroll}
              className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/25 transition-transform hover:scale-105 cursor-pointer"
            >
              <span>立即預約報名</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
