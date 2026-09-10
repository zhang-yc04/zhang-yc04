import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Course,
  Instructor,
  Announcement,
  RegistrationSubmission,
  BrandConfig,
  StudentShowcase,
} from '../types';
import {
  initialBrandConfig,
  initialCourses,
  initialInstructors,
  initialAnnouncements,
  initialRegistrations,
  initialStudentShowcases,
} from '../data/initialData';

export type ViewType =
  | 'home'
  | 'courses'
  | 'course-detail'
  | 'instructors'
  | 'testimonials'
  | 'news'
  | 'news-detail'
  | 'register'
  | 'contact'
  | 'admin';

export type AdminTab =
  | 'overview'
  | 'courses'
  | 'news'
  | 'instructors'
  | 'registrations'
  | 'settings'
  | 'social-preview';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  // Navigation
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  selectedNewsId: string | null;
  setSelectedNewsId: (id: string | null) => void;
  navigateToCourse: (id: string) => void;
  navigateToNews: (id: string) => void;
  navigateToRegister: (courseId?: string) => void;

  // Admin Portal
  isAdminMode: boolean;
  setIsAdminMode: (val: boolean) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;

  // Modals & Tools
  isSharePreviewOpen: boolean;
  setIsSharePreviewOpen: (open: boolean) => void;
  previewUrl: string;

  // Streamingbar Spotlight & Interactive Trailer / Drawer
  spotlightCourseId: string;
  setSpotlightCourseId: (id: string) => void;
  isTrailerOpen: boolean;
  trailerCourse: Course | null;
  openTrailer: (course: Course) => void;
  closeTrailer: () => void;
  isQuickDrawerOpen: boolean;
  quickDrawerCourse: Course | null;
  openQuickDrawer: (course: Course) => void;
  closeQuickDrawer: () => void;

  // Data & Updates
  brandConfig: BrandConfig;
  updateBrandConfig: (config: BrandConfig) => void;

  courses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;

  instructors: Instructor[];
  addInstructor: (inst: Omit<Instructor, 'id'>) => void;
  updateInstructor: (id: string, inst: Partial<Instructor>) => void;
  deleteInstructor: (id: string) => void;

  announcements: Announcement[];
  addAnnouncement: (item: Omit<Announcement, 'id'>) => void;
  updateAnnouncement: (id: string, item: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;

  studentShowcases: StudentShowcase[];

  registrations: RegistrationSubmission[];
  addRegistration: (reg: Omit<RegistrationSubmission, 'id' | 'createdAt' | 'status'>) => string;
  updateRegistrationStatus: (id: string, status: RegistrationSubmission['status'], adminNote?: string) => void;
  deleteRegistration: (id: string) => void;
  exportRegistrationsCSV: () => void;

  // System Helpers
  resetToDefaults: () => void;
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  BRAND: 'fc_brand_config_v1',
  COURSES: 'fc_courses_v1',
  INSTRUCTORS: 'fc_instructors_v1',
  ANNOUNCEMENTS: 'fc_announcements_v1',
  REGISTRATIONS: 'fc_registrations_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>('course-short-video-01');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>('news-01');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');
  const [isSharePreviewOpen, setIsSharePreviewOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Streamingbar Spotlight & Trailer & Quick Drawer State
  const [spotlightCourseId, setSpotlightCourseId] = useState<string>('course-short-video-01');
  const [isTrailerOpen, setIsTrailerOpen] = useState<boolean>(false);
  const [trailerCourse, setTrailerCourse] = useState<Course | null>(null);
  const [isQuickDrawerOpen, setIsQuickDrawerOpen] = useState<boolean>(false);
  const [quickDrawerCourse, setQuickDrawerCourse] = useState<Course | null>(null);

  const openTrailer = (course: Course) => {
    setTrailerCourse(course);
    setIsTrailerOpen(true);
  };

  const closeTrailer = () => {
    setIsTrailerOpen(false);
  };

  const openQuickDrawer = (course: Course) => {
    setQuickDrawerCourse(course);
    setIsQuickDrawerOpen(true);
  };

  const closeQuickDrawer = () => {
    setIsQuickDrawerOpen(false);
  };

  // Stored Data State
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BRAND);
      return saved ? JSON.parse(saved) : initialBrandConfig;
    } catch {
      return initialBrandConfig;
    }
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
      return saved ? JSON.parse(saved) : initialCourses;
    } catch {
      return initialCourses;
    }
  });

  const [instructors, setInstructors] = useState<Instructor[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INSTRUCTORS);
      return saved ? JSON.parse(saved) : initialInstructors;
    } catch {
      return initialInstructors;
    }
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      return saved ? JSON.parse(saved) : initialAnnouncements;
    } catch {
      return initialAnnouncements;
    }
  });

  const [registrations, setRegistrations] = useState<RegistrationSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
      return saved ? JSON.parse(saved) : initialRegistrations;
    } catch {
      return initialRegistrations;
    }
  });

  const [studentShowcases] = useState<StudentShowcase[]>(initialStudentShowcases);

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BRAND, JSON.stringify(brandConfig));
    } catch (e) {
      console.error('Failed to save brand config', e);
    }
  }, [brandConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    } catch (e) {
      console.error('Failed to save courses', e);
    }
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INSTRUCTORS, JSON.stringify(instructors));
    } catch (e) {
      console.error('Failed to save instructors', e);
    }
  }, [instructors]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
    } catch (e) {
      console.error('Failed to save announcements', e);
    }
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
    } catch (e) {
      console.error('Failed to save registrations', e);
    }
  }, [registrations]);

  // Dynamic Metadata Sync according to user requirement #3 & #4
  useEffect(() => {
    const defaultTitle = `${brandConfig.brandName} ${brandConfig.englishName}｜專為行銷人與創作者設計的實戰剪輯與拍攝學苑`;
    let pageTitle = defaultTitle;
    let pageDesc = brandConfig.description;

    if (isAdminMode) {
      pageTitle = `管理後台 CMS 中心｜${brandConfig.brandName}`;
      pageDesc = `創映影像學苑夥伴後台：課程內容發布、最新消息更新、講師資料管理、報名學員審核。`;
    } else {
      switch (currentView) {
        case 'home':
          pageTitle = `${brandConfig.brandName}｜${brandConfig.slogan}`;
          pageDesc = brandConfig.description;
          break;
        case 'courses':
          pageTitle = `全系列實戰課程｜${brandConfig.brandName} - 短影音剪輯、微單運鏡、行銷變現工作坊`;
          pageDesc = `精選 4 大熱門實戰影音課程：商業短影音 0-1 爆款班、微單運鏡一日工作坊、影音行銷操盤手、DaVinci 調色聲音班。即刻確認時間地點與剩餘名額！`;
          break;
        case 'course-detail': {
          const c = courses.find((x) => x.id === selectedCourseId);
          if (c) {
            pageTitle = `${c.title}｜${brandConfig.brandName}`;
            pageDesc = `${c.subtitle} - ${c.summary.slice(0, 100)}`;
          }
          break;
        }
        case 'instructors':
          pageTitle = `業界名師指導陣容｜${brandConfig.brandName} - 商業廣告導演與百萬短影音操盤總監親授`;
          pageDesc = `由 10+ 年商業廣告導演 Mark 游宗翰、百萬級短影音顧問 Emily 簡思敏、電影攝影指導 Rex 柯秉睿親自手把手帶領。`;
          break;
        case 'testimonials':
          pageTitle = `學員真實成效與作品見證｜${brandConfig.brandName}`;
          pageDesc = `超過 1,800 位行銷企劃、自媒體創作者與品牌主的實戰成效：單支 Reels 破 85 萬播放、接案報價翻倍真實故事。`;
          break;
        case 'news':
          pageTitle = `最新消息與開課動態｜${brandConfig.brandName}`;
          pageDesc = `掌握創映影像學苑最新實體講座、開課快訊、早鳥優惠與影音行銷乾貨文章。`;
          break;
        case 'news-detail': {
          const n = announcements.find((x) => x.id === selectedNewsId);
          if (n) {
            pageTitle = `${n.title}｜${brandConfig.brandName}`;
            pageDesc = n.summary;
          }
          break;
        }
        case 'register':
          pageTitle = `即刻線上報名・預約席次｜${brandConfig.brandName}`;
          pageDesc = `選擇您想精進的實戰課程與場次，填寫基本資料即可完成報名預約，專人 24 小時內專案確認。`;
          break;
        case 'contact':
          pageTitle = `聯絡我們・預約實體參觀與課前諮詢｜${brandConfig.brandName}`;
          pageDesc = `學苑地址：台北市信義區忠孝東路五段 508 號 6 樓。提供官方 LINE 諮詢、電話與影棚參觀預約。`;
          break;
      }
    }

    document.title = pageTitle;

    // Update meta description
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', pageDesc);

    // Update og:title and og:description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', pageDesc);

    // Scroll to top smoothly when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedCourseId, selectedNewsId, isAdminMode, brandConfig, courses, announcements]);

  // Toast Helpers
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigators
  const navigateToCourse = (id: string) => {
    setSelectedCourseId(id);
    setCurrentView('course-detail');
  };

  const navigateToNews = (id: string) => {
    setSelectedNewsId(id);
    setCurrentView('news-detail');
  };

  const navigateToRegister = (courseId?: string) => {
    if (courseId) {
      setSelectedCourseId(courseId);
    }
    setCurrentView('register');
  };

  // Course Actions
  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: `course-${Date.now()}`,
    };
    setCourses((prev) => [newCourse, ...prev]);
    showToast(`成功新增課程：「${newCourse.title}」`, 'success');
  };

  const updateCourse = (id: string, patch: Partial<Course>) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
    showToast('課程內容已即時更新至前台！', 'success');
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    showToast('已移除該課程項目', 'info');
  };

  // Instructor Actions
  const addInstructor = (instData: Omit<Instructor, 'id'>) => {
    const newInst: Instructor = {
      ...instData,
      id: `inst-${Date.now()}`,
    };
    setInstructors((prev) => [...prev, newInst]);
    showToast(`已新增講師：「${newInst.name}」`, 'success');
  };

  const updateInstructor = (id: string, patch: Partial<Instructor>) => {
    setInstructors((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    showToast('講師介紹資料已更新！', 'success');
  };

  const deleteInstructor = (id: string) => {
    setInstructors((prev) => prev.filter((i) => i.id !== id));
    showToast('已刪除該講師資料', 'info');
  };

  // Announcement Actions
  const addAnnouncement = (itemData: Omit<Announcement, 'id'>) => {
    const newItem: Announcement = {
      ...itemData,
      id: `news-${Date.now()}`,
    };
    setAnnouncements((prev) => [newItem, ...prev]);
    showToast(`成功發布最新消息：「${newItem.title}」`, 'success');
  };

  const updateAnnouncement = (id: string, patch: Partial<Announcement>) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
    showToast('最新消息內容已更新！', 'success');
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    showToast('已下架該則最新消息', 'info');
  };

  // Registration Actions
  const addRegistration = (regData: Omit<RegistrationSubmission, 'id' | 'createdAt' | 'status'>): string => {
    const id = `reg-${Date.now()}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newReg: RegistrationSubmission = {
      ...regData,
      id,
      status: '待確認',
      createdAt: formattedDate,
    };

    setRegistrations((prev) => [newReg, ...prev]);
    // Also decrease remainingSeats in course if > 0
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === regData.courseId && c.remainingSeats > 0) {
          const nextRemaining = c.remainingSeats - 1;
          return {
            ...c,
            remainingSeats: nextRemaining,
            status: nextRemaining === 0 ? 'closed' : nextRemaining <= 3 ? 'few_seats' : 'open',
          };
        }
        return c;
      })
    );

    showToast('報名已成功送出！學苑專案顧問將於 24 小時內與您聯繫。', 'success');
    return id;
  };

  const updateRegistrationStatus = (
    id: string,
    status: RegistrationSubmission['status'],
    adminNote?: string
  ) => {
    setRegistrations((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              ...(adminNote !== undefined ? { adminNote } : {}),
            }
          : r
      )
    );
    showToast('報名學員狀態已更新！', 'success');
  };

  const deleteRegistration = (id: string) => {
    setRegistrations((prev) => prev.filter((r) => r.id !== id));
    showToast('已刪除該筆學員資料', 'info');
  };

  const exportRegistrationsCSV = () => {
    if (registrations.length === 0) {
      showToast('目前尚無報名資料可匯出', 'info');
      return;
    }

    const headers = [
      '報名編號',
      '課程名稱',
      '選擇場次',
      '學員姓名',
      '聯絡電話',
      '電子郵件',
      '年齡層',
      '目前設備',
      '經驗程度',
      '學習目標',
      '發票類型',
      '統一編號',
      '公司抬頭',
      '處理狀態',
      '報名時間',
      '內部備註',
    ];

    const rows = registrations.map((r) => [
      `"${r.id}"`,
      `"${r.courseTitle.replace(/"/g, '""')}"`,
      `"${r.selectedDate.replace(/"/g, '""')}"`,
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.phone}"`,
      `"${r.email}"`,
      `"${r.ageGroup}"`,
      `"${r.currentDevice}"`,
      `"${r.experienceLevel}"`,
      `"${(r.learningGoal || '').replace(/"/g, '""')}"`,
      `"${r.invoiceType}"`,
      `"${r.taxId || ''}"`,
      `"${(r.companyName || '').replace(/"/g, '""')}"`,
      `"${r.status}"`,
      `"${r.createdAt}"`,
      `"${(r.adminNote || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `創映學苑_學員報名清冊_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('已成功下載學員報名名單 CSV 檔案！', 'success');
  };

  const updateBrandConfig = (newConfig: BrandConfig) => {
    setBrandConfig(newConfig);
    showToast('品牌基本資訊與社群設定已成功儲存！', 'success');
  };

  const resetToDefaults = () => {
    if (window.confirm('確定要還原為官方初始示範資料嗎？所有手動編輯的課程與報名資料將被重置。')) {
      localStorage.clear();
      setBrandConfig(initialBrandConfig);
      setCourses(initialCourses);
      setInstructors(initialInstructors);
      setAnnouncements(initialAnnouncements);
      setRegistrations(initialRegistrations);
      showToast('已成功還原為初始示範資料！', 'info');
    }
  };

  const previewUrl = typeof window !== 'undefined' ? window.location.href : 'https://framecraft.tw';

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedCourseId,
        setSelectedCourseId,
        selectedNewsId,
        setSelectedNewsId,
        navigateToCourse,
        navigateToNews,
        navigateToRegister,

        isAdminMode,
        setIsAdminMode,
        adminTab,
        setAdminTab,

        isSharePreviewOpen,
        setIsSharePreviewOpen,
        previewUrl,

        spotlightCourseId,
        setSpotlightCourseId,
        isTrailerOpen,
        trailerCourse,
        openTrailer,
        closeTrailer,
        isQuickDrawerOpen,
        quickDrawerCourse,
        openQuickDrawer,
        closeQuickDrawer,

        brandConfig,
        updateBrandConfig,

        courses,
        addCourse,
        updateCourse,
        deleteCourse,

        instructors,
        addInstructor,
        updateInstructor,
        deleteInstructor,

        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,

        studentShowcases,

        registrations,
        addRegistration,
        updateRegistrationStatus,
        deleteRegistration,
        exportRegistrationsCSV,

        resetToDefaults,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
