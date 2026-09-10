import React from 'react';
import { Course } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Flame,
  Sparkles,
  Play,
  Info,
} from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { navigateToCourse, navigateToRegister, openTrailer, openQuickDrawer } = useApp();

  const isFewSeats = course.remainingSeats > 0 && course.remainingSeats <= 3;
  const isClosed = course.remainingSeats === 0 || course.status === 'closed';

  return (
    <div className="bg-[#111019] rounded-2xl sm:rounded-3xl border border-white/10 hover:border-amber-500/40 transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1 shadow-2xl hover:shadow-amber-500/10">
      {/* Course Image & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
        <img
          src={course.featuredImage}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111019] via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-black/80 backdrop-blur-md text-amber-400 border border-amber-500/30">
            {course.category}
          </span>
          <span className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-neutral-900/80 text-neutral-300 border border-neutral-700">
            {course.level}
          </span>
        </div>

        {/* Custom badge or urgent seat indicator */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {isFewSeats && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-500 text-white flex items-center gap-1 shadow-lg animate-pulse">
              <Flame className="w-3 h-3 fill-white" />
              剩餘 {course.remainingSeats} 席
            </span>
          )}
          {!isFewSeats && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/80 backdrop-blur-md text-amber-400 border border-amber-500/20 flex items-center gap-1">
              ★ {course.rating || 4.9}
            </span>
          )}
        </div>

        {/* Hover Trailer Play Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openTrailer(course);
          }}
          className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-amber-500/90 text-neutral-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100 shadow-2xl cursor-pointer"
          title="試看前導預告片"
        >
          <Play className="w-5 h-5 fill-neutral-950 translate-x-0.5" />
        </button>

        {/* Location & Duration tag on bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-300 font-medium">
          <span className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-white/5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-white/5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            信義實體棚
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <h3
            onClick={() => navigateToCourse(course.id)}
            className="text-base sm:text-lg font-black text-white group-hover:text-amber-400 transition-colors cursor-pointer leading-snug line-clamp-2"
          >
            {course.title}
          </h3>
          <p className="text-neutral-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {course.subtitle}
          </p>

          {/* Key outcomes highlight */}
          <div className="pt-2 space-y-1.5 border-t border-white/5">
            {course.learningOutcomes.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>

          {/* Schedule Date pill */}
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs text-neutral-300 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>近期開課梯次：</span>
            </div>
            <div className="text-[11px] text-neutral-400 truncate pl-5">
              {course.scheduleDates[0]}
            </div>
          </div>
        </div>

        {/* Pricing & CTA Controls */}
        <div className="pt-3 border-t border-white/5 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xl sm:text-2xl font-black text-white">NT$ {course.price.toLocaleString()}</span>
              <span className="text-xs text-neutral-500 line-through ml-2">
                NT$ {course.originalPrice.toLocaleString()}
              </span>
            </div>
            <span className="text-[11px] text-neutral-400">
              上限 {course.maxSeats} 人・小班精修
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => openTrailer(course)}
              className="py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1 border border-white/10 transition-colors cursor-pointer"
              title="播放預告片"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>預告</span>
            </button>

            <button
              onClick={() => openQuickDrawer(course)}
              className="py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1 border border-white/10 transition-colors cursor-pointer"
              title="快速速查課綱"
            >
              <Info className="w-3 h-3 text-amber-400" />
              <span>速查</span>
            </button>

            <button
              disabled={isClosed}
              onClick={() => navigateToRegister(course.id)}
              className={`py-2.5 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1 transition-all cursor-pointer ${
                isClosed
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md shadow-amber-500/20'
              }`}
            >
              <span>{isClosed ? '額滿' : '報名'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
