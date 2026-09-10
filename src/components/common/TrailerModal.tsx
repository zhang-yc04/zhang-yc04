import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Film,
  Sparkles,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Flame,
  Award,
  Layers,
  Clock,
} from 'lucide-react';

export const TrailerModal: React.FC = () => {
  const { isTrailerOpen, closeTrailer, trailerCourse, navigateToRegister, navigateToCourse } = useApp();

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(28); // Simulated playhead percentage
  const [currentChapter, setCurrentChapter] = useState(1);
  const [quality, setQuality] = useState<'4K' | '1080P'>('4K');

  useEffect(() => {
    if (!isTrailerOpen) {
      setIsPlaying(false);
      setProgress(20);
      return;
    }

    setIsPlaying(true);
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 98 ? 10 : prev + 1));
    }, 800);

    return () => clearInterval(interval);
  }, [isTrailerOpen]);

  if (!isTrailerOpen || !trailerCourse) return null;

  const chapters = [
    { id: 1, time: '00:00', title: '核心痛點：為什麼你的短影音總是無人停留？' },
    { id: 2, time: '00:45', title: '鏡頭運鏡：導演級 3 大吸睛角度與動態構圖' },
    { id: 3, time: '01:30', title: '實體棚拍：單燈與雙燈如何打出電影級立體感' },
    { id: 4, time: '02:15', title: '後製剪輯：音效包卡點與情緒曲線呼吸感' },
  ];

  const handleEnrollClick = () => {
    closeTrailer();
    navigateToRegister(trailerCourse.id);
  };

  const handleViewDetailClick = () => {
    closeTrailer();
    navigateToCourse(trailerCourse.id);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={closeTrailer}
      id="trailer-modal-backdrop"
    >
      <div
        className="relative w-full max-w-5xl bg-[#0e0d14] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
        id="trailer-modal-container"
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-black/50 border-b border-white/10 select-none">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-neutral-300 uppercase">
              FRAMECRAFT CINEMA PLAYER ✦ {quality} HDR
            </span>
            <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-medium">
              {trailerCourse.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 bg-neutral-900 border border-neutral-700/60 rounded-lg p-0.5 text-xs font-mono text-neutral-400">
              <button
                onClick={() => setQuality('4K')}
                className={`px-2 py-0.5 rounded ${quality === '4K' ? 'bg-amber-500 text-black font-bold' : 'hover:text-white'}`}
              >
                4K UHD
              </button>
              <button
                onClick={() => setQuality('1080P')}
                className={`px-2 py-0.5 rounded ${quality === '1080P' ? 'bg-amber-500 text-black font-bold' : 'hover:text-white'}`}
              >
                1080P
              </button>
            </div>

            <button
              onClick={closeTrailer}
              className="p-1.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="關閉預告片 (Esc)"
              id="close-trailer-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Canvas Stage */}
        <div className="relative aspect-[16/9] w-full bg-black overflow-hidden group select-none">
          {/* Backdrop Image or Live Stream */}
          <img
            src={trailerCourse.backdropImage || trailerCourse.featuredImage}
            alt={trailerCourse.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100 filter brightness-75'}`}
          />

          {/* Film Grain & Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 pointer-events-none" />

          {/* Center Play/Pause Trigger Overlay */}
          <div
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
          >
            {!isPlaying && (
              <div className="w-20 h-20 rounded-full bg-amber-500/90 hover:bg-amber-400 text-neutral-950 flex items-center justify-center shadow-2xl transition-transform transform hover:scale-110">
                <Play className="w-8 h-8 fill-neutral-950 translate-x-1" />
              </div>
            )}
          </div>

          {/* Floating On-Screen Metadata HUD */}
          <div className="absolute top-4 left-4 pointer-events-none flex flex-col gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-400 text-xs font-black tracking-wide border border-amber-500/30">
              <Film className="w-3.5 h-3.5" />
              前導實戰預告片 • {trailerCourse.trailerLength || '02:45'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-md max-w-xl">
              {trailerCourse.title}
            </h3>
          </div>

          {/* Video Bottom Player Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-3">
            {/* Timeline Scrubber */}
            <div className="w-full flex items-center gap-3">
              <div
                className="relative flex-1 h-2 bg-neutral-800/80 rounded-full overflow-hidden cursor-pointer group/scrubber"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newProgress = Math.round((clickX / rect.width) * 100);
                  setProgress(Math.max(0, Math.min(100, newProgress)));
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md transform scale-0 group-hover/scrubber:scale-100 transition-transform" />
                </div>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 shrink-0">
                01:{progress < 10 ? `0${progress}` : progress} / {trailerCourse.trailerLength || '02:45'}
              </span>
            </div>

            {/* Bottom Controls Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title={isPlaying ? '暫停 (Space)' : '播放 (Space)'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title={isMuted ? '開啟聲音' : '靜音'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-300">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span>章節 0{currentChapter}：{chapters[currentChapter - 1]?.title.slice(0, 20)}...</span>
                </div>
              </div>

              {/* Right CTA */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleEnrollClick}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-lg shadow-amber-500/20 hover:scale-105 transition-all cursor-pointer"
                >
                  <Flame className="w-4 h-4 fill-neutral-950" />
                  <span>搶先預約此梯次</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Lower Details & Chapters Section */}
        <div className="p-5 sm:p-6 bg-[#111019] overflow-y-auto space-y-5">
          {/* Chapter Selector Tabs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                預告片亮點章節（點擊切換片段）
              </span>
              <span className="text-xs text-neutral-400">完整工作坊為 {trailerCourse.duration} 實操</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {chapters.map((chap) => {
                const isActive = currentChapter === chap.id;
                return (
                  <div
                    key={chap.id}
                    onClick={() => {
                      setCurrentChapter(chap.id);
                      setProgress(chap.id * 24 - 10);
                      setIsPlaying(true);
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      isActive
                        ? 'bg-amber-500/10 border-amber-500/50 text-white shadow-md'
                        : 'bg-black/30 border-white/5 hover:border-white/20 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className={isActive ? 'text-amber-400 font-bold' : 'text-neutral-500'}>
                        {chap.time}
                      </span>
                      {isActive && <span className="text-[10px] bg-amber-500 text-neutral-950 px-1.5 py-0.2 rounded font-bold">PLAYING</span>}
                    </div>
                    <p className="text-xs font-medium leading-snug line-clamp-2">
                      {chap.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Course Summary & Action Banner */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-white font-black text-base">{trailerCourse.title}</span>
                <span className="text-xs font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/15">
                  ★ {trailerCourse.rating || 4.9}（{trailerCourse.matchPercentage || 99}% 好評推薦）
                </span>
              </div>
              <p className="text-xs text-neutral-400 max-w-2xl line-clamp-2">
                {trailerCourse.summary}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleViewDetailClick}
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold border border-neutral-700 transition-colors cursor-pointer"
              >
                查看完整課綱
              </button>
              <button
                onClick={handleEnrollClick}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-black shadow-lg shadow-amber-500/25 flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
              >
                <span>立即填表預約</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
