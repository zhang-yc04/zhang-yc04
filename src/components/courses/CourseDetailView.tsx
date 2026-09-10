import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Package,
  Layers,
  Flame,
} from 'lucide-react';

export const CourseDetailView: React.FC = () => {
  const { courses, selectedCourseId, setCurrentView, navigateToRegister } = useApp();

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const [selectedDate, setSelectedDate] = useState<string>(course.scheduleDates[0] || '');

  if (!course) {
    return (
      <div className="py-24 text-center">
        <p className="text-neutral-400">找不到指定課程資訊</p>
        <button
          onClick={() => setCurrentView('courses')}
          className="mt-4 px-4 py-2 bg-amber-500 text-neutral-950 font-bold rounded-lg"
        >
          返回課程列表
        </button>
      </div>
    );
  }

  const isFewSeats = course.remainingSeats > 0 && course.remainingSeats <= 3;
  const isClosed = course.remainingSeats === 0 || course.status === 'closed';

  return (
    <div className="py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation button */}
        <button
          onClick={() => setCurrentView('courses')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-amber-400 transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回全部實戰課程列表</span>
        </button>

        {/* Hero Course Header Card */}
        <div className="bg-neutral-900/90 rounded-3xl border border-neutral-800 p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {course.category}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-neutral-800 text-neutral-300">
                  {course.level}
                </span>
                {isFewSeats && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/90 text-white flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-white" />
                    即將額滿・僅剩 {course.remainingSeats} 席
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                {course.title}
              </h1>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {course.subtitle}
              </p>

              {/* Meta items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-neutral-300">
                <div className="flex items-center gap-2 bg-neutral-950/80 p-2.5 rounded-xl border border-neutral-800">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>授課時數：{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 bg-neutral-950/80 p-2.5 rounded-xl border border-neutral-800">
                  <Users className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>每班上限 {course.maxSeats} 人（小班指導）</span>
                </div>
                <div className="flex items-start gap-2 bg-neutral-950/80 p-2.5 rounded-xl border border-neutral-800 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>實體基地：{course.location}</span>
                </div>
              </div>
            </div>

            {/* Right Course Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-700 shadow-2xl">
                <img
                  src={course.featuredImage}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-2xl font-black">NT$ {course.price.toLocaleString()}</div>
                  <div className="text-xs text-neutral-400 line-through">
                    原價 NT$ {course.originalPrice.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Dates Selector Bar */}
          <div className="p-4 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                確認可出席之開課場次：
              </span>
              <span className="text-xs text-amber-400 font-semibold">小班額滿立即關閉</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {course.scheduleDates.map((dateStr, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    selectedDate === dateStr
                      ? 'bg-amber-500/15 border-amber-500 text-white font-bold shadow-sm'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <div className="text-[10px] text-amber-400 font-semibold mb-1">場次 0{i + 1}</div>
                  <div className="truncate">{dateStr}</div>
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-400">
                若以上時間無法配合，或想詢問包班，請私訊官方 LINE。
              </div>
              <button
                disabled={isClosed}
                onClick={() => navigateToRegister(course.id)}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isClosed
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 shadow-lg shadow-amber-500/25 hover:scale-[1.02]'
                }`}
              >
                <span>{isClosed ? '已全數額滿' : '直接填表預約席次'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Syllabus & Outcomes Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Syllabus Modules */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">詳細單元課綱與實戰進程</h2>
                <p className="text-xs text-neutral-400">每一單元均包含理論拆解、現場實操與導師驗收</p>
              </div>
            </div>

            <div className="space-y-4">
              {course.syllabus.map((module, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-900/90 rounded-2xl border border-neutral-800 p-6 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      {module.title}
                    </h3>
                    <span className="text-xs font-mono text-amber-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                      {module.duration}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-1">
                    {module.points.map((pt, pidx) => (
                      <li key={pidx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Target Audience, Equipment & Guarantees */}
          <div className="lg:col-span-4 space-y-6">
            {/* Target Audience */}
            <div className="bg-neutral-900/90 rounded-2xl border border-neutral-800 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                這門課最適合誰？
              </h3>
              <ul className="space-y-2.5">
                {course.targetAudience.map((aud, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span>{aud}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Equipment Info */}
            <div className="bg-neutral-900/90 rounded-2xl border border-neutral-800 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Package className="w-4 h-4 text-amber-400" />
                上課器材與資源
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-neutral-400 font-semibold block mb-1">建議學員自備：</span>
                  <p className="text-neutral-200 leading-relaxed bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                    {course.recommendedEquipment}
                  </p>
                </div>

                <div>
                  <span className="text-neutral-400 font-semibold block mb-1">學苑現場免費提供：</span>
                  <ul className="space-y-1.5 text-neutral-300">
                    {course.includedEquipment.map((eq, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                        <span>{eq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sticky Action Box */}
            <div className="bg-gradient-to-br from-neutral-900 to-amber-950/40 rounded-2xl border border-amber-500/30 p-6 text-center space-y-4 shadow-xl">
              <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                早鳥 85 折倒數中
              </div>
              <div className="text-2xl font-black text-white">NT$ {course.price.toLocaleString()}</div>
              <p className="text-xs text-neutral-400">
                填寫預約表單無需先刷卡，送出後專案顧問將與您確認場次與設備。
              </p>
              <button
                onClick={() => navigateToRegister(course.id)}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                立即報名本課程
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
