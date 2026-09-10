import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Video,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  MessageCircle,
  Instagram,
  Youtube,
  Lock,
  Sparkles,
  Share2,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { brandConfig, setCurrentView, setIsAdminMode, navigateToRegister, setIsSharePreviewOpen } =
    useApp();

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800/80 pt-16 pb-12">
      {/* Top CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/40 border border-amber-500/20 p-8 sm:p-12 shadow-2xl">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                免費領取・行銷人專屬資源包
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                立即加入官方 LINE，免費領取《商業短影音 10 大爆款腳本公式》
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                專為 25-40 歲品牌人彙整！包含 3 秒注意力鉤子、留存文案模板、以及手機拍片避坑檢查清單。加入好友後傳送「我要腳本」即刻自動發送。
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <a
                href={brandConfig.lineOfficialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm shadow-lg shadow-green-500/20 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                加入 LINE 官方帳號領取
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => {
                  setIsAdminMode(false);
                  navigateToRegister();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-sm border border-neutral-700 transition-all"
              >
                預約實體課前諮詢
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        {/* Brand statement */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-neutral-950 font-bold">
              <Video className="w-5 h-5 text-neutral-950" />
            </div>
            <div>
              <span className="text-lg font-black text-white">{brandConfig.brandName}</span>
              <span className="text-xs text-neutral-400 block">{brandConfig.englishName}</span>
            </div>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
            {brandConfig.slogan}。致力於縮短技術與創意的距離，讓每位有故事的行銷人、創作者，都能用專業的動態影像語言被世界看見。
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={brandConfig.threadsUrl}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center border border-neutral-800 transition-colors"
              title="追蹤 Threads"
            >
              <span className="font-black text-sm">@</span>
            </a>
            <a
              href={brandConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-pink-400 flex items-center justify-center border border-neutral-800 transition-colors"
              title="追蹤 Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={brandConfig.youtubeChannel}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-red-400 flex items-center justify-center border border-neutral-800 transition-colors"
              title="觀看 YouTube 頻道"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={brandConfig.lineOfficialUrl}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-green-400 flex items-center justify-center border border-neutral-800 transition-colors"
              title="LINE 官方客服"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">快速導覽</h4>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li>
              <button
                onClick={() => {
                  setIsAdminMode(false);
                  setCurrentView('courses');
                }}
                className="hover:text-amber-400 transition-colors"
              >
                實戰課程總覽（4 大模組）
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setIsAdminMode(false);
                  setCurrentView('instructors');
                }}
                className="hover:text-amber-400 transition-colors"
              >
                業界名師陣容
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setIsAdminMode(false);
                  setCurrentView('testimonials');
                }}
                className="hover:text-amber-400 transition-colors"
              >
                學員真實成效與作品見證
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setIsAdminMode(false);
                  setCurrentView('news');
                }}
                className="hover:text-amber-400 transition-colors"
              >
                開課快訊與實戰專欄
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setIsAdminMode(false);
                  setCurrentView('contact');
                }}
                className="hover:text-amber-400 transition-colors"
              >
                實體攝影棚與教室位置
              </button>
            </li>
          </ul>
        </div>

        {/* Contact info & Studio Details */}
        <div className="lg:col-span-4 space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">學苑基地與聯絡資訊</h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{brandConfig.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>電話諮詢：{brandConfig.phone}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>合作信箱：{brandConfig.email}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>開放時間：{brandConfig.studioHours}</span>
            </li>
          </ul>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={() => setIsSharePreviewOpen(true)}
              className="text-xs text-neutral-400 hover:text-amber-400 flex items-center gap-1.5 py-1 px-2 rounded bg-neutral-900 border border-neutral-800 cursor-pointer"
            >
              <Share2 className="w-3 h-3" />
              社群卡片預覽
            </button>
            <button
              onClick={() => {
                setIsAdminMode(true);
                setCurrentView('admin');
              }}
              className="text-xs text-neutral-400 hover:text-amber-400 flex items-center gap-1.5 py-1 px-2 rounded bg-neutral-900 border border-neutral-800 cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              夥伴管理後台
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <div>
          © {new Date().getFullYear()} {brandConfig.brandName} {brandConfig.englishName}. All Rights Reserved.
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-neutral-400 cursor-pointer">開課與退費政策說明</span>
          <span className="hover:text-neutral-400 cursor-pointer">學員個人隱私權條款</span>
          <span className="hover:text-neutral-400 cursor-pointer">商業統編開立須知</span>
        </div>
      </div>
    </footer>
  );
};
