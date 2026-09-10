import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Play,
  Flame,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Film,
  Award,
  Layers,
  Info,
  Maximize2,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const {
    courses,
    spotlightCourseId,
    setSpotlightCourseId,
    openTrailer,
    openQuickDrawer,
    navigateToRegister,
    navigateToCourse,
  } = useApp();

  const sliderRef = useRef<HTMLDivElement>(null);

  // Active spotlight course
  const currentCourse =
    courses.find((c) => c.id === spotlightCourseId) || courses[0] || null;

  const currentIdx = courses.findIndex((c) => c.id === (currentCourse?.id || ''));

  const handlePrevSlide = () => {
    const newIdx = currentIdx <= 0 ? courses.length - 1 : currentIdx - 1;
    setSpotlightCourseId(courses[newIdx].id);
    scrollToCard(newIdx);
  };

  const handleNextSlide = () => {
    const newIdx = currentIdx >= courses.length - 1 ? 0 : currentIdx + 1;
    setSpotlightCourseId(courses[newIdx].id);
    scrollToCard(newIdx);
  };

  const scrollToCard = (index: number) => {
    if (sliderRef.current) {
      const cards = sliderRef.current.children;
      if (cards[index]) {
        (cards[index] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  };

  if (!currentCourse) return null;

  return (
    <section className="relative overflow-hidden pt-4 pb-16 lg:pb-24 select-none">
      {/* Dynamic Cinematic Backdrop with Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Course Backdrop Image with Zoom & Dark Scrim */}
        <div className="absolute inset-0">
          <img
            key={currentCourse.id}
            src={currentCourse.backdropImage || currentCourse.featuredImage}
            alt={currentCourse.title}
            className="w-full h-full object-cover object-center opacity-30 filter blur-sm scale-105 transition-all duration-1000 animate-in fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent" />
        </div>

        {/* Ambient Radial Spotlight (Top and Center) */}
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-amber-500/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-amber-700/10 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 lg:space-y-12">
        {/* Main Cinematic Spotlight Stage (Hero Upper Area) */}
        <div className="pt-6 sm:pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Spotlight Title, HUD metadata, and Main Actions */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Top HUD Metadata Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black tracking-wide shadow-sm">
                <Film className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentCourse.cinematicBadge || '4K CINEMATIC MASTERCLASS'}</span>
              </span>

              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-neutral-300 border border-white/10 text-xs font-mono font-bold">
                {currentCourse.level}
              </span>

              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1">
                ★ {currentCourse.rating || 4.9}（{currentCourse.matchPercentage || 99}% 好評推薦）
              </span>

              {currentCourse.remainingSeats <= 4 && (
                <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-bold flex items-center gap-1 animate-pulse">
                  <Flame className="w-3 h-3 fill-red-400" />
                  剩餘 {currentCourse.remainingSeats} 席
                </span>
              )}
            </div>

            {/* Display Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              {currentCourse.title}
            </h1>

            {/* Subtitle & Summary */}
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {currentCourse.subtitle}。{currentCourse.summary}
            </p>

            {/* Quick Feature Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-neutral-300 pt-1">
              <div className="flex items-center gap-2 bg-white/[0.04] backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">實機 100% 逐幀手把手</span>
              </div>
              <div className="flex items-center gap-2 bg-white/[0.04] backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">限額 {currentCourse.maxSeats} 人小班實戰</span>
              </div>
              <div className="flex items-center gap-2 bg-white/[0.04] backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{currentCourse.duration}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {/* Watch Trailer Button (Streamingbar Signature Action) */}
              <button
                onClick={() => openTrailer(currentCourse)}
                className="px-6 py-3.5 rounded-xl bg-white text-neutral-950 font-black text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 cursor-pointer group"
                id="hero-watch-trailer-btn"
              >
                <div className="w-6 h-6 rounded-full bg-neutral-950 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
                </div>
                <span>播放前導預告 (Trailer)</span>
              </button>

              {/* Instant Registration CTA */}
              <button
                onClick={() => navigateToRegister(currentCourse.id)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-black text-sm transition-all flex items-center gap-2 shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 cursor-pointer"
                id="hero-enroll-btn"
              >
                <span>立即搶先預約席次</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick Details Drawer Trigger */}
              <button
                onClick={() => openQuickDrawer(currentCourse)}
                className="px-4 py-3.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white font-bold text-xs sm:text-sm border border-neutral-700/80 transition-all flex items-center gap-1.5 cursor-pointer"
                title="快速查看詳細課綱與日期"
              >
                <Info className="w-4 h-4 text-amber-400" />
                <span>課程速查</span>
              </button>
            </div>

            {/* Upcoming Batch Schedule Pills */}
            <div className="pt-2 flex items-center gap-2 text-xs text-neutral-400">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-neutral-300">近期開課：</span>
              <span className="text-amber-400 font-mono font-medium">
                {currentCourse.scheduleDates[0]}
              </span>
            </div>
          </div>

          {/* Right Column: High-Impact Video/Poster Viewfinder Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/30 via-amber-600/20 to-neutral-800/40 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />

              {/* Spotlight Poster Shell */}
              <div className="relative bg-[#111018] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                {/* Camera HUD Header */}
                <div className="bg-black/80 px-4 py-2 flex items-center justify-between text-[11px] font-mono border-b border-white/10 text-neutral-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-bold text-red-400 tracking-wider">● LIVE REEL</span>
                  </div>
                  <div className="flex items-center gap-3 text-amber-400 font-bold">
                    <span>4K 60FPS</span>
                    <span className="text-neutral-500 font-normal">|</span>
                    <span>10-BIT LOG</span>
                  </div>
                </div>

                {/* Poster Imagery with Click-to-Play */}
                <div
                  onClick={() => openTrailer(currentCourse)}
                  className="relative aspect-[16/10] overflow-hidden cursor-pointer group/poster bg-neutral-950"
                >
                  <img
                    src={currentCourse.featuredImage}
                    alt={currentCourse.title}
                    className="w-full h-full object-cover group-hover/poster:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-amber-500/90 hover:bg-amber-400 text-neutral-950 flex items-center justify-center shadow-2xl transition-transform transform group-hover/poster:scale-115">
                      <Play className="w-7 h-7 fill-neutral-950 translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom Image Info Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      點擊即刻試看前導片
                    </span>
                    <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-amber-400 font-mono font-bold">
                      {currentCourse.trailerLength || '02:45'}
                    </span>
                  </div>
                </div>

                {/* Card Lower Bar: Pricing & Quick Syllabus */}
                <div className="p-4 bg-neutral-950/90 flex items-center justify-between border-t border-white/10">
                  <div>
                    <div className="text-[11px] text-neutral-400">早鳥實戰席次</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-white">
                        NT$ {currentCourse.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-neutral-500 line-through">
                        NT$ {currentCourse.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => openQuickDrawer(currentCourse)}
                    className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold border border-neutral-700 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>單元課綱</span>
                    <ArrowRight className="w-3 h-3 text-amber-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THE SIGNATURE "CARDS SLIDER" CAROUSEL (Streamingbar by Lazarev)           */}
        {/* ========================================================================= */}
        <div className="pt-6 space-y-4">
          {/* Slider Header Controls Bar */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-xs font-mono font-black tracking-widest text-amber-400 uppercase">
                  CARDS SLIDER ✦ 全系列實戰專案
                </span>
              </div>
              <p className="text-xs text-neutral-400 hidden sm:block">
                點擊下方卡片即可直接將其載入上方大舞台舞台預覽與試看前導片
              </p>
            </div>

            {/* Slider Navigation Buttons and Counter */}
            <div className="flex items-center gap-3">
              <div className="text-xs font-mono font-bold text-neutral-400">
                <span className="text-white">0{currentIdx + 1}</span> / 0{courses.length}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevSlide}
                  className="p-2 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 transition-colors cursor-pointer active:scale-95"
                  title="上一個專案"
                  id="slider-prev-btn"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="p-2 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 transition-colors cursor-pointer active:scale-95"
                  title="下一個專案"
                  id="slider-next-btn"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Scroll Cards Track */}
          <div
            ref={sliderRef}
            className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
            id="streaming-cards-slider"
          >
            {courses.map((course, idx) => {
              const isSelected = course.id === currentCourse.id;
              const isFewSeats = course.remainingSeats > 0 && course.remainingSeats <= 3;

              return (
                <div
                  key={course.id}
                  onClick={() => setSpotlightCourseId(course.id)}
                  className={`snap-start shrink-0 w-[280px] sm:w-[320px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-[#15141e] border-amber-400 ring-2 ring-amber-400/40 shadow-xl shadow-amber-500/20 -translate-y-1'
                      : 'bg-[#0f0e15] border-white/10 hover:border-white/25 hover:bg-[#14131b] hover:-translate-y-0.5'
                  }`}
                >
                  {/* Card Media Preview Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black group/thumb">
                    <img
                      src={course.featuredImage}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e15] via-transparent to-black/30" />

                    {/* Active Spotlight Tag */}
                    {isSelected && (
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-amber-500 text-neutral-950 font-black text-[10px] tracking-wider shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-neutral-950" />
                        <span>SPOTLIGHT 正在預覽</span>
                      </div>
                    )}

                    {!isSelected && (
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-amber-400 font-bold text-[10px] border border-white/10">
                        {course.category}
                      </div>
                    )}

                    {/* Rating or seats pill on top right */}
                    <div className="absolute top-2.5 right-2.5">
                      {isFewSeats ? (
                        <span className="px-2 py-0.5 rounded-md bg-red-500 text-white font-bold text-[10px] shadow-sm flex items-center gap-0.5">
                          <Flame className="w-2.5 h-2.5 fill-white" />
                          餘 {course.remainingSeats}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-amber-400 font-bold text-[10px] border border-amber-500/20">
                          ★ {course.rating || 4.9}
                        </span>
                      )}
                    </div>

                    {/* Quick Play Trailer Hover Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openTrailer(course);
                      }}
                      className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-black/80 hover:bg-amber-500 hover:text-neutral-950 text-white border border-white/20 transition-all cursor-pointer"
                      title="播放預告片"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>

                  {/* Card Details Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>{course.duration}</span>
                        <span className="text-neutral-600">•</span>
                        <span>{course.level}</span>
                      </div>

                      <h3 className="text-sm sm:text-base font-black text-white line-clamp-2 leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {course.subtitle}
                      </p>
                    </div>

                    {/* Price and Action Bar */}
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-sm font-black text-white">
                          NT$ {course.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-neutral-500 line-through ml-1.5">
                          NT$ {course.originalPrice.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openQuickDrawer(course);
                          }}
                          className="px-2 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          詳情
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToRegister(course.id);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-[11px] font-black transition-transform hover:scale-105 cursor-pointer"
                        >
                          報名
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Badges & Metrics Strip */}
        <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-2xl sm:text-3xl font-black text-white">1,850+</div>
            <div className="text-xs text-neutral-400 mt-0.5">結業行銷人與創作者</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">4.9 / 5.0</div>
            <div className="text-xs text-neutral-400 mt-0.5">實名好評滿意度</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-2xl sm:text-3xl font-black text-white">3,200 萬+</div>
            <div className="text-xs text-neutral-400 mt-0.5">學員作品累積播放數</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">12 人</div>
            <div className="text-xs text-neutral-400 mt-0.5">全實體每班小班上限</div>
          </div>
        </div>
      </div>
    </section>
  );
};
