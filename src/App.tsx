import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SocialShareModal } from './components/common/SocialShareModal';
import { HeroSection } from './components/home/HeroSection';
import { ValuePropsSection } from './components/home/ValuePropsSection';
import { FeaturedCoursesSection } from './components/home/FeaturedCoursesSection';
import { InstructorsSection } from './components/instructors/InstructorsSection';
import { CourseListSection } from './components/courses/CourseListSection';
import { CourseDetailView } from './components/courses/CourseDetailView';
import { TestimonialsSection } from './components/testimonials/TestimonialsSection';
import { NewsSection } from './components/news/NewsSection';
import { RegistrationSection } from './components/register/RegistrationSection';
import { ContactSection } from './components/contact/ContactSection';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { TrailerModal } from './components/common/TrailerModal';
import { QuickCourseDrawer } from './components/courses/QuickCourseDrawer';
import { MessageCircle, ArrowUp, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { currentView, isAdminMode, toasts, removeToast, navigateToRegister, brandConfig } = useApp();

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, isAdminMode]);

  // If Admin mode is enabled, display the Partner Admin Dashboard CMS
  if (isAdminMode) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-neutral-950">
        <AdminDashboard />
        <SocialShareModal />
        <TrailerModal />
        <QuickCourseDrawer />
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className="fixed bottom-6 right-6 z-50 bg-amber-500 text-neutral-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl text-xs sm:text-sm cursor-pointer"
          >
            {toast.message}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-neutral-950 flex flex-col justify-between">
      {/* Global Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <HeroSection />
            <ValuePropsSection />
            <FeaturedCoursesSection />
            <InstructorsSection />
            <TestimonialsSection />
            <NewsSection />
          </>
        )}

        {currentView === 'courses' && <CourseListSection />}

        {currentView === 'course-detail' && <CourseDetailView />}

        {currentView === 'instructors' && (
          <div className="pt-6">
            <InstructorsSection />
          </div>
        )}

        {currentView === 'testimonials' && <TestimonialsSection />}

        {currentView === 'news' && <NewsSection />}

        {currentView === 'register' && <RegistrationSection />}

        {currentView === 'contact' && <ContactSection />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Social Media Sharing Modal & Simulator (Threads / Facebook) */}
      <SocialShareModal />

      {/* Streamingbar Cinematic Trailer Modal */}
      <TrailerModal />

      {/* Streamingbar Quick View Drawer */}
      <QuickCourseDrawer />

      {/* Floating Quick Action CTA for Mobile & Desktop */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* Quick LINE button */}
        <a
          href={brandConfig.lineOfficialUrl}
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer group"
          title="加入官方 LINE 諮詢"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="sr-only">LINE 即時諮詢</span>
        </a>

        {/* Floating Quick Register Button */}
        {currentView !== 'register' && (
          <button
            onClick={() => navigateToRegister()}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs sm:text-sm shadow-2xl flex items-center gap-2 hover:scale-105 transition-all cursor-pointer border border-amber-300/40"
          >
            <Calendar className="w-4 h-4" />
            <span>預約實體課</span>
          </button>
        )}
      </div>

      {/* Global Toast Notifications Stack */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-5 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              toast.type === 'success'
                ? 'bg-amber-500 text-neutral-950 border border-amber-300'
                : toast.type === 'error'
                ? 'bg-red-600 text-white border border-red-400'
                : 'bg-neutral-800 text-white border border-neutral-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
