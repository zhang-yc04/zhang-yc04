import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Video,
  Sparkles,
  Share2,
  Lock,
  Menu,
  X,
  Calendar,
  Users,
  Compass,
  Award,
  BellRing,
  PhoneCall,
  ExternalLink,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    isAdminMode,
    setIsAdminMode,
    setIsSharePreviewOpen,
    navigateToRegister,
    brandConfig,
    registrations,
    courses,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calculate pending registrations for admin badge
  const pendingCount = registrations.filter((r) => r.status === '待確認').length;

  const navItems: { id: typeof currentView; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: '學苑首頁', icon: <Compass className="w-4 h-4" /> },
    { id: 'courses', label: '實戰課程', icon: <Video className="w-4 h-4" /> },
    { id: 'instructors', label: '名師陣容', icon: <Users className="w-4 h-4" /> },
    { id: 'testimonials', label: '學員成效', icon: <Award className="w-4 h-4" /> },
    { id: 'news', label: '最新動態', icon: <BellRing className="w-4 h-4" /> },
    { id: 'contact', label: '聯絡諮詢', icon: <PhoneCall className="w-4 h-4" /> },
  ];

  const handleNavClick = (viewId: typeof currentView) => {
    setIsAdminMode(false);
    setCurrentView(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
      {/* Top Notification Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-neutral-950 text-xs sm:text-sm font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-neutral-950 shrink-0" />
        <span className="truncate max-w-2xl">{brandConfig.announcementTicker}</span>
        <button
          onClick={() => {
            setIsAdminMode(false);
            navigateToRegister();
          }}
          className="underline hover:text-white transition-colors ml-1 font-bold shrink-0 cursor-pointer"
        >
          立即搶位 →
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="header-brand-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-neutral-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Video className="w-5 h-5 text-neutral-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  {brandConfig.brandName}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Academy
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 tracking-wider hidden sm:block">
                {brandConfig.englishName}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" id="desktop-navigation">
            {navItems.map((item) => {
              const isActive = !isAdminMode && currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20 shadow-sm'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Social Share Preview Modal Button */}
            <button
              onClick={() => setIsSharePreviewOpen(true)}
              title="查看社群分享卡片預覽（Threads / Facebook）"
              className="px-2.5 py-2 sm:px-3 sm:py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/70 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              id="header-share-preview-btn"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">社群分享預覽</span>
            </button>

            {/* Admin CMS Portal Toggle Button (Partner back-office) */}
            <button
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                if (!isAdminMode) {
                  setCurrentView('admin');
                } else {
                  setCurrentView('home');
                }
              }}
              title="夥伴管理後台：更新課程、消息與審核報名"
              className={`px-2.5 py-2 sm:px-3 sm:py-2 text-xs font-semibold rounded-lg border flex items-center gap-1.5 transition-all cursor-pointer relative ${
                isAdminMode
                  ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md shadow-amber-500/30'
                  : 'bg-neutral-900 text-neutral-300 hover:text-amber-400 border-neutral-800 hover:border-amber-500/40'
              }`}
              id="header-admin-portal-btn"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isAdminMode ? '返回官網前台' : '夥伴後台'}</span>
              <span className="sm:hidden">{isAdminMode ? '前台' : '後台'}</span>
              {pendingCount > 0 && !isAdminMode && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce shadow-sm">
                  {pendingCount}
                </span>
              )}
            </button>

            {/* Primary CTA - Register now */}
            <button
              onClick={() => {
                setIsAdminMode(false);
                navigateToRegister();
              }}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-md shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              id="header-cta-register-btn"
            >
              立即報名
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 cursor-pointer"
              aria-label="選單開關"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-2 pb-6 space-y-1 shadow-2xl">
          <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider px-3 py-2">
            官網主要頁面導覽
          </div>
          {navItems.map((item) => {
            const isActive = !isAdminMode && currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3 ${
                  isActive
                    ? 'text-amber-400 bg-amber-500/10 font-bold'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <span className="text-amber-400">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-4 mt-2 border-t border-neutral-900 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSharePreviewOpen(true);
              }}
              className="w-full py-3 px-4 rounded-lg bg-neutral-900 text-neutral-200 text-sm font-medium flex items-center justify-center gap-2 border border-neutral-800"
            >
              <Share2 className="w-4 h-4 text-amber-400" />
              社群分享卡片預覽（Threads / Facebook）
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminMode(true);
                setCurrentView('admin');
              }}
              className="w-full py-3 px-4 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              進入夥伴後台更新訊息 ({pendingCount} 筆待審核)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
