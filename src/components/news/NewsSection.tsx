import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Announcement } from '../../types';
import {
  BellRing,
  Calendar,
  Tag,
  ArrowRight,
  Pin,
  Sparkles,
  BookOpen,
  X,
  Share2,
} from 'lucide-react';

export const NewsSection: React.FC = () => {
  const { announcements, navigateToRegister, setCurrentView } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [activeArticle, setActiveArticle] = useState<Announcement | null>(null);

  const categories = ['全部', '開課快訊', '活動講座', '學員捷報', '實戰專欄'];

  const filteredNews = announcements.filter((item) => {
    if (selectedCategory === '全部') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
            <BellRing className="w-3.5 h-3.5" />
            最新消息與實戰專欄
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            開課動態、免費講座與行銷影音乾貨
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            掌握創映影像學苑最新實體講座、開課梯次、學員作品捷報，以及每週由導師群撰寫的影音行銷策略文章。
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              className="bg-neutral-900/90 rounded-2xl border border-neutral-800 hover:border-amber-500/40 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl group hover:-translate-y-1"
            >
              <div>
                {/* News Image if any */}
                {news.image && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-neutral-950">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-neutral-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30">
                        {news.category}
                      </span>
                      {news.isPinned && (
                        <span className="px-2 py-1 rounded-md text-xs font-bold bg-red-500 text-white flex items-center gap-1 shadow-md">
                          <Pin className="w-3 h-3" />
                          置頂公告
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {news.publishedAt}
                    </span>
                    {!news.image && (
                      <span className="px-2 py-0.5 rounded bg-neutral-800 text-amber-400 text-[11px] font-semibold">
                        {news.category}
                      </span>
                    )}
                  </div>

                  <h3
                    onClick={() => setActiveArticle(news)}
                    className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer leading-snug"
                  >
                    {news.title}
                  </h3>

                  <p className="text-neutral-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {news.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-neutral-800/80 mt-4 flex items-center justify-between">
                <button
                  onClick={() => setActiveArticle(news)}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>閱讀完整文章</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {news.ctaText && (
                  <button
                    onClick={() => {
                      if (news.ctaLink?.includes('courses')) {
                        setCurrentView('courses');
                      } else {
                        navigateToRegister();
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-colors cursor-pointer"
                  >
                    {news.ctaText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Free Workshop CTA */}
        <div className="mt-16 p-8 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">想即時收到第一手開課與優惠通知？</h3>
            <p className="text-neutral-400 text-xs sm:text-sm">
              加入創映影像學苑官方 LINE，掌握每月免費線上直播講座席次與學員限定專屬折價券。
            </p>
          </div>
          <button
            onClick={() => navigateToRegister()}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm shrink-0 shadow-md cursor-pointer"
          >
            立即預約最新講座席次 →
          </button>
        </div>
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-neutral-900 border border-neutral-700 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/30">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-neutral-400">{activeArticle.publishedAt}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {activeArticle.image && (
                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800">
                  <img
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {activeArticle.title}
              </h2>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-amber-300 text-xs sm:text-sm leading-relaxed">
                <strong>重點摘要：</strong>
                {activeArticle.summary}
              </div>

              <div className="text-neutral-300 text-sm sm:text-base leading-relaxed space-y-4">
                <p>{activeArticle.content}</p>
                <p className="text-xs text-neutral-400 pt-4 border-t border-neutral-800">
                  如欲進一步了解相關課程或諮詢企業專班，歡迎直接填寫預約表單或與創映官方客服聯繫。
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-end border-t border-neutral-800">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold hover:bg-neutral-700"
                >
                  關閉視窗
                </button>
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    navigateToRegister();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm shadow-md"
                >
                  立即預約課程 / 席次 →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
