import React, { useState } from 'react';
import { useApp, AdminTab } from '../../context/AppContext';
import { Course, Announcement, Instructor, RegistrationSubmission } from '../../types';
import {
  LayoutDashboard,
  Video,
  BellRing,
  Users,
  FileSpreadsheet,
  Settings,
  Share2,
  Plus,
  Edit2,
  Trash2,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Save,
  RotateCcw,
  Search,
  Eye,
  X,
  Phone,
  Mail,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    adminTab,
    setAdminTab,
    setIsAdminMode,
    setCurrentView,
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    announcements,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    instructors,
    updateInstructor,
    addInstructor,
    deleteInstructor,
    registrations,
    updateRegistrationStatus,
    deleteRegistration,
    exportRegistrationsCSV,
    brandConfig,
    updateBrandConfig,
    resetToDefaults,
    setIsSharePreviewOpen,
    showToast,
  } = useApp();

  // Search & Filter in registrations
  const [regSearch, setRegSearch] = useState('');
  const [regFilterStatus, setRegFilterStatus] = useState<string>('全部');

  // Editing Course State
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [courseForm, setCourseForm] = useState<Partial<Course>>({});

  // Editing Announcement State
  const [editingNews, setEditingNews] = useState<Announcement | null>(null);
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [newsForm, setNewsForm] = useState<Partial<Announcement>>({});

  // Brand Config local state
  const [localBrand, setLocalBrand] = useState(brandConfig);

  // Statistics
  const pendingRegs = registrations.filter((r) => r.status === '待確認');
  const contactedRegs = registrations.filter((r) => r.status === '已聯繫');
  const confirmedRegs = registrations.filter((r) => r.status === '已完成報名');

  const filteredRegistrations = registrations.filter((r) => {
    const matchesFilter = regFilterStatus === '全部' || r.status === regFilterStatus;
    const matchesSearch =
      regSearch.trim() === '' ||
      r.fullName.toLowerCase().includes(regSearch.toLowerCase()) ||
      r.phone.includes(regSearch) ||
      r.email.toLowerCase().includes(regSearch.toLowerCase()) ||
      r.courseTitle.toLowerCase().includes(regSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handle Course Save
  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      updateCourse(editingCourse.id, courseForm);
      setEditingCourse(null);
    } else if (isAddingCourse) {
      addCourse({
        title: courseForm.title || '新增實戰影音課程',
        subtitle: courseForm.subtitle || '最新開班課程說明',
        category: (courseForm.category as any) || '短影音剪輯',
        level: (courseForm.level as any) || '入門零基礎',
        price: Number(courseForm.price) || 6800,
        originalPrice: Number(courseForm.originalPrice) || 9800,
        duration: courseForm.duration || '2 天密集班',
        targetAudience: courseForm.targetAudience || ['想提升動態影像產製能力的行銷人與創作者'],
        location: courseForm.location || '創映實體教室 A 廳',
        dateInfo: courseForm.dateInfo || '隔週週末開班',
        scheduleDates: courseForm.scheduleDates || ['2025/05/10(六) - 05/11(日) 台北信義班'],
        maxSeats: Number(courseForm.maxSeats) || 12,
        remainingSeats: Number(courseForm.remainingSeats) || 12,
        status: (courseForm.status as any) || 'open',
        featuredImage:
          courseForm.featuredImage ||
          'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
        badge: courseForm.badge || '新課上架',
        summary: courseForm.summary || '手把手帶領學員完成商業成片。',
        learningOutcomes: courseForm.learningOutcomes || ['掌握爆款影片腳本思維', '學會雙軌節奏剪輯與音效調校'],
        syllabus: courseForm.syllabus || [
          { title: '單元 1：腳本與選題', duration: '3 小時', points: ['注意力鉤子', '完播率結構'] },
          { title: '單元 2：實戰運鏡與剪輯', duration: '3 小時', points: ['分鏡技巧', '成片輸出'] },
        ],
        includedEquipment: ['專業補光燈具借用', '專屬課後 Discord 社群'],
        recommendedEquipment: '自備近 3 年內智慧型手機或相機。',
      });
      setIsAddingCourse(false);
    }
  };

  // Handle News Save
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNews) {
      updateAnnouncement(editingNews.id, newsForm);
      setEditingNews(null);
    } else if (isAddingNews) {
      addAnnouncement({
        title: newsForm.title || '最新學苑公告',
        category: (newsForm.category as any) || '開課快訊',
        publishedAt: new Date().toISOString().slice(0, 10),
        summary: newsForm.summary || '掌握學苑第一手消息',
        content: newsForm.content || '詳細內容說明...',
        image:
          newsForm.image ||
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
        isPinned: newsForm.isPinned || false,
        ctaText: newsForm.ctaText || '立即查看課程',
        ctaLink: '#courses',
      });
      setIsAddingNews(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pb-20">
      {/* Top Admin Navigation Bar */}
      <div className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center font-bold">
            <LayoutDashboard className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-white text-sm sm:text-base">
                夥伴管理後台 CMS
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                即時同步前台
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              在此更新課程、發布公告、審核學員報名與設定 SEO 社群分享
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsSharePreviewOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 border border-neutral-700 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-400" />
            <span>社群卡片預覽</span>
          </button>

          <button
            onClick={resetToDefaults}
            title="還原示範資料"
            className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white text-xs flex items-center gap-1 border border-neutral-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">重置示範資料</span>
          </button>

          <button
            onClick={() => {
              setIsAdminMode(false);
              setCurrentView('home');
            }}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold text-xs shadow-md hover:from-amber-300 hover:to-amber-400 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>返回官網前台</span>
          </button>
        </div>
      </div>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-800 scrollbar-none mb-8">
          <button
            onClick={() => setAdminTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              adminTab === 'overview'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>營運總覽</span>
          </button>

          <button
            onClick={() => setAdminTab('registrations')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer relative ${
              adminTab === 'registrations'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>學員報名審核</span>
            {pendingRegs.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-red-500 text-white text-[10px] font-bold">
                {pendingRegs.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setAdminTab('courses')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              adminTab === 'courses'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>課程內容管理 ({courses.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('news')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              adminTab === 'news'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <BellRing className="w-4 h-4" />
            <span>最新消息發布 ({announcements.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('instructors')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              adminTab === 'instructors'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>名師經歷管理 ({instructors.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              adminTab === 'settings'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>品牌資訊與 SEO 設定</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {adminTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                <div className="flex items-center justify-between text-neutral-400 text-xs">
                  <span>累計報名人數</span>
                  <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-white mt-2">{registrations.length} 位</div>
                <div className="text-[11px] text-neutral-500 mt-1">包含個人與企業報名</div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                <div className="flex items-center justify-between text-neutral-400 text-xs">
                  <span>待聯絡確認</span>
                  <AlertCircle className="w-4 h-4 text-red-400" />
                </div>
                <div className="text-2xl font-black text-red-400 mt-2">{pendingRegs.length} 筆</div>
                <div className="text-[11px] text-neutral-500 mt-1">需於 24 小時內電訪確認</div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                <div className="flex items-center justify-between text-neutral-400 text-xs">
                  <span>進行中實戰課程</span>
                  <Video className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-white mt-2">{courses.length} 門</div>
                <div className="text-[11px] text-neutral-500 mt-1">前台即時展示與開放預約中</div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                <div className="flex items-center justify-between text-neutral-400 text-xs">
                  <span>最新公告與文章</span>
                  <BellRing className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-white mt-2">{announcements.length} 則</div>
                <div className="text-[11px] text-neutral-500 mt-1">最新開課與乾貨專欄</div>
              </div>
            </div>

            {/* Quick Pending Registrations List */}
            <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">最新待處理學員報名申請</h3>
                  <p className="text-xs text-neutral-400">點擊狀態按鈕可立即更新處理進度</p>
                </div>
                <button
                  onClick={() => setAdminTab('registrations')}
                  className="text-xs text-amber-400 hover:underline font-semibold"
                >
                  查看完整報名名單 ({registrations.length}) →
                </button>
              </div>

              {registrations.slice(0, 5).map((reg) => (
                <div
                  key={reg.id}
                  className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{reg.fullName}</span>
                      <span className="text-xs text-neutral-400">({reg.phone})</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          reg.status === '待確認'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : reg.status === '已聯繫'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-green-500/20 text-green-400 border border-green-500/30'
                        }`}
                      >
                        {reg.status}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400">
                      欲報名：<span className="text-amber-400">{reg.courseTitle}</span>（{reg.selectedDate}）
                    </div>
                    {reg.learningGoal && (
                      <div className="text-[11px] text-neutral-500 italic">
                        學習目標：{reg.learningGoal}
                      </div>
                    )}
                  </div>

                  {/* Status Toggle buttons */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => updateRegistrationStatus(reg.id, '已聯繫')}
                      className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 font-medium"
                    >
                      標記為已聯繫
                    </button>
                    <button
                      onClick={() => updateRegistrationStatus(reg.id, '已完成報名')}
                      className="px-2.5 py-1 rounded bg-green-600 hover:bg-green-500 text-xs text-white font-bold"
                    >
                      標記已繳費
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Guides for Partners */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                夥伴協作與更新指引
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                夥伴在此頁面更新的課程開課時間、價格、剩餘席次與最新消息，會即時儲存於瀏覽器並同步反映於全站前台。
                若有宣傳需求，可直接點擊右上角「社群卡片預覽」檢視分享到 Threads 與 Facebook
                時的標題、縮圖與描述是否正確無誤。
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: COURSE MANAGEMENT */}
        {adminTab === 'courses' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">課程列表與內容管理</h3>
                <p className="text-xs text-neutral-400">夥伴可直接編輯課綱、修改費用與開課場次日期</p>
              </div>
              <button
                onClick={() => {
                  setEditingCourse(null);
                  setCourseForm({
                    title: '',
                    subtitle: '',
                    category: '短影音剪輯',
                    level: '入門零基礎',
                    price: 6800,
                    originalPrice: 9800,
                    duration: '2 天密集班（共 12 小時）',
                    location: '創映實體教室 A 廳',
                    scheduleDates: ['2025/05/17(六) - 05/18(日) 台北信義班'],
                    maxSeats: 12,
                    remainingSeats: 12,
                    status: 'open',
                    featuredImage:
                      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
                    summary: '',
                  });
                  setIsAddingCourse(true);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>新增實戰課程</span>
              </button>
            </div>

            {/* Courses List */}
            <div className="grid grid-cols-1 gap-4">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={c.featuredImage}
                      alt={c.title}
                      className="w-20 h-16 rounded-xl object-cover border border-neutral-800 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-400">{c.category}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                          {c.level}
                        </span>
                        <span className="text-xs font-mono text-white">
                          NT$ {c.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-amber-400 font-semibold">
                          (剩餘 {c.remainingSeats} / {c.maxSeats} 席)
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white">{c.title}</h4>
                      <p className="text-xs text-neutral-400 line-clamp-1">{c.subtitle}</p>
                      <div className="text-[11px] text-neutral-500">
                        梯次：{c.scheduleDates.join('、')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      onClick={() => {
                        setEditingCourse(c);
                        setCourseForm(c);
                        setIsAddingCourse(false);
                      }}
                      className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1 border border-neutral-700 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>編輯</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`確定要刪除「${c.title}」嗎？`)) {
                          deleteCourse(c.id);
                        }
                      }}
                      className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 text-xs border border-red-800/60 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Course Edit/Add Modal */}
            {(editingCourse || isAddingCourse) && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="bg-neutral-900 border border-neutral-700 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
                  <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
                    <h3 className="font-bold text-white text-base">
                      {editingCourse ? '編輯課程內容' : '新增全新實戰課程'}
                    </h3>
                    <button
                      onClick={() => {
                        setEditingCourse(null);
                        setIsAddingCourse(false);
                      }}
                      className="p-1 rounded-lg text-neutral-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveCourse} className="p-6 overflow-y-auto space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        課程完整標題 *
                      </label>
                      <input
                        type="text"
                        required
                        value={courseForm.title || ''}
                        onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        課程副標題 / 核心訴求 *
                      </label>
                      <input
                        type="text"
                        required
                        value={courseForm.subtitle || ''}
                        onChange={(e) => setCourseForm({ ...courseForm, subtitle: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          專業領域分類
                        </label>
                        <select
                          value={courseForm.category || '短影音剪輯'}
                          onChange={(e) =>
                            setCourseForm({ ...courseForm, category: e.target.value as any })
                          }
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                        >
                          <option value="短影音剪輯">短影音剪輯</option>
                          <option value="商業運鏡與拍攝">商業運鏡與拍攝</option>
                          <option value="影音行銷策略">影音行銷策略</option>
                          <option value="調色與聲音設計">調色與聲音設計</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          早鳥學費 (NT$)
                        </label>
                        <input
                          type="number"
                          value={courseForm.price || 6800}
                          onChange={(e) =>
                            setCourseForm({ ...courseForm, price: Number(e.target.value) })
                          }
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          剩餘席次
                        </label>
                        <input
                          type="number"
                          value={courseForm.remainingSeats ?? 3}
                          onChange={(e) =>
                            setCourseForm({
                              ...courseForm,
                              remainingSeats: Number(e.target.value),
                            })
                          }
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        上課地點
                      </label>
                      <input
                        type="text"
                        value={courseForm.location || ''}
                        onChange={(e) => setCourseForm({ ...courseForm, location: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        課程封面圖網址 (URL)
                      </label>
                      <input
                        type="url"
                        value={courseForm.featuredImage || ''}
                        onChange={(e) =>
                          setCourseForm({ ...courseForm, featuredImage: e.target.value })
                        }
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        課程核心介紹說明
                      </label>
                      <textarea
                        rows={3}
                        value={courseForm.summary || ''}
                        onChange={(e) => setCourseForm({ ...courseForm, summary: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCourse(null);
                          setIsAddingCourse(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
                      >
                        取消
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold shadow-md"
                      >
                        儲存並同步至前台
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ANNOUNCEMENTS / NEWS */}
        {adminTab === 'news' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">最新消息與活動發布</h3>
                <p className="text-xs text-neutral-400">發布講座、優惠通知與專欄文章，立即顯示於官網</p>
              </div>
              <button
                onClick={() => {
                  setEditingNews(null);
                  setNewsForm({
                    title: '',
                    category: '開課快訊',
                    publishedAt: new Date().toISOString().slice(0, 10),
                    summary: '',
                    content: '',
                    image:
                      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
                    isPinned: false,
                    ctaText: '立即查看課程',
                  });
                  setIsAddingNews(true);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>發布最新動態</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {announcements.map((news) => (
                <div
                  key={news.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-400">{news.category}</span>
                      <span className="text-xs text-neutral-500">{news.publishedAt}</span>
                      {news.isPinned && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500 text-white font-bold">
                          置頂
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-white">{news.title}</h4>
                    <p className="text-xs text-neutral-400 line-clamp-2 max-w-2xl">{news.summary}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingNews(news);
                        setNewsForm(news);
                        setIsAddingNews(false);
                      }}
                      className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1 border border-neutral-700 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>編輯</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`確定要刪除「${news.title}」嗎？`)) {
                          deleteAnnouncement(news.id);
                        }
                      }}
                      className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 text-xs border border-red-800/60 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* News Edit/Add Modal */}
            {(editingNews || isAddingNews) && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="bg-neutral-900 border border-neutral-700 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
                  <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
                    <h3 className="font-bold text-white text-base">
                      {editingNews ? '編輯消息公告' : '發布全新消息公告'}
                    </h3>
                    <button
                      onClick={() => {
                        setEditingNews(null);
                        setIsAddingNews(false);
                      }}
                      className="p-1 rounded-lg text-neutral-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveNews} className="p-6 overflow-y-auto space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        消息標題 *
                      </label>
                      <input
                        type="text"
                        required
                        value={newsForm.title || ''}
                        onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          分類類別
                        </label>
                        <select
                          value={newsForm.category || '開課快訊'}
                          onChange={(e) =>
                            setNewsForm({ ...newsForm, category: e.target.value as any })
                          }
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                        >
                          <option value="開課快訊">開課快訊</option>
                          <option value="活動講座">活動講座</option>
                          <option value="學員捷報">學員捷報</option>
                          <option value="實戰專欄">實戰專欄</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          置頂顯示
                        </label>
                        <label className="flex items-center gap-2 text-xs text-neutral-300 pt-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newsForm.isPinned || false}
                            onChange={(e) =>
                              setNewsForm({ ...newsForm, isPinned: e.target.checked })
                            }
                            className="accent-amber-500 w-4 h-4"
                          />
                          <span>將此則公告設定為置頂</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        簡要描述 / 摘要 *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={newsForm.summary || ''}
                        onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        完整內容內文 *
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={newsForm.content || ''}
                        onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingNews(null);
                          setIsAddingNews(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
                      >
                        取消
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold shadow-md"
                      >
                        立即發布公告
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: INSTRUCTOR MANAGEMENT */}
        {adminTab === 'instructors' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-lg font-bold text-white">名師經歷與簡介管理</h3>
              <p className="text-xs text-neutral-400">更新導師頭銜、代表作與合作客戶清單</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {instructors.map((inst) => (
                <div
                  key={inst.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={inst.avatar}
                        alt={inst.name}
                        className="w-14 h-14 rounded-full object-cover border border-amber-500/40"
                      />
                      <div>
                        <h4 className="text-base font-bold text-white">{inst.name}</h4>
                        <div className="text-xs text-amber-400">{inst.title}</div>
                        <div className="text-[11px] text-neutral-500">
                          {inst.yearsExperience} 年產業資歷
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                      {inst.bio}
                    </p>

                    <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400 italic">
                      「{inst.quote}」
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                    <span className="text-neutral-500">合作客戶：{inst.pastClients.length} 家</span>
                    <button
                      onClick={() => {
                        const newQuote = window.prompt('請輸入更新後的導師名言或金句：', inst.quote);
                        if (newQuote !== null) {
                          updateInstructor(inst.id, { quote: newQuote });
                        }
                      }}
                      className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-xs font-semibold cursor-pointer"
                    >
                      快速編輯金句
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: REGISTRATIONS MANAGEMENT */}
        {adminTab === 'registrations' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">學員報名清單與審核</h3>
                <p className="text-xs text-neutral-400">
                  查看所有官網前台送出的報名資訊，支援電訪備註與匯出 CSV 報表
                </p>
              </div>

              <button
                onClick={exportRegistrationsCSV}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-xs font-bold flex items-center gap-1.5 border border-amber-500/30 shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>匯出學員名單 CSV</span>
              </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs text-neutral-400 font-semibold shrink-0">狀態篩選：</span>
                {['全部', '待確認', '已聯繫', '已完成報名', '已取消'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setRegFilterStatus(status)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      regFilterStatus === status
                        ? 'bg-amber-500 text-neutral-950 font-bold'
                        : 'bg-neutral-950 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="搜尋學員姓名、電話、Email..."
                  value={regSearch}
                  onChange={(e) => setRegSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Registrations Table / Card List */}
            {filteredRegistrations.length > 0 ? (
              <div className="space-y-3">
                {filteredRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-3 hover:border-neutral-700 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-base font-black text-white">{reg.fullName}</span>
                        <span className="text-xs text-neutral-400">（{reg.ageGroup}）</span>
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                            reg.status === '待確認'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : reg.status === '已聯繫'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-green-500/20 text-green-400 border border-green-500/30'
                          }`}
                        >
                          {reg.status}
                        </span>
                      </div>

                      <div className="text-xs text-neutral-500">
                        報名時間：<span className="font-mono">{reg.createdAt}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-300">
                      <div>
                        <span className="text-neutral-500 block">報名課程：</span>
                        <span className="font-bold text-amber-400">{reg.courseTitle}</span>
                        <div className="text-neutral-400">{reg.selectedDate}</div>
                      </div>

                      <div>
                        <span className="text-neutral-500 block">聯絡方式：</span>
                        <div className="flex items-center gap-1 text-white">
                          <Phone className="w-3.5 h-3.5 text-amber-400" />
                          <span>{reg.phone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-neutral-400">
                          <Mail className="w-3.5 h-3.5 text-amber-400" />
                          <span>{reg.email}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-neutral-500 block">設備與經驗：</span>
                        <div>設備：{reg.currentDevice}</div>
                        <div>經驗：{reg.experienceLevel}</div>
                      </div>
                    </div>

                    {/* Learning Goal & Invoice */}
                    <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-xs space-y-1">
                      {reg.learningGoal && (
                        <div>
                          <span className="text-neutral-500">期望目標：</span>
                          <span className="text-neutral-300">{reg.learningGoal}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-neutral-500">發票需求：</span>
                        <span className="text-neutral-300">{reg.invoiceType}</span>
                        {reg.taxId && (
                          <span className="ml-2 text-amber-400">
                            (統編: {reg.taxId} / 抬頭: {reg.companyName})
                          </span>
                        )}
                      </div>
                      {reg.adminNote && (
                        <div className="text-amber-300 pt-1 border-t border-neutral-800/80">
                          📌 內部備註：{reg.adminNote}
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const note = window.prompt(
                              '請輸入內部聯繫備註（如：已電訪確認、匯款帳號末五碼）：',
                              reg.adminNote || ''
                            );
                            if (note !== null) {
                              updateRegistrationStatus(reg.id, reg.status, note);
                            }
                          }}
                          className="px-3 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300"
                        >
                          + 填寫備註
                        </button>
                        <select
                          value={reg.status}
                          onChange={(e) =>
                            updateRegistrationStatus(reg.id, e.target.value as any, reg.adminNote)
                          }
                          className="bg-neutral-950 border border-neutral-700 text-xs rounded px-2 py-1 text-white"
                        >
                          <option value="待確認">標記：待確認</option>
                          <option value="已聯繫">標記：已聯繫</option>
                          <option value="已完成報名">標記：已完成報名</option>
                          <option value="已取消">標記：已取消</option>
                        </select>
                      </div>

                      <button
                        onClick={() => {
                          if (window.confirm(`確定要刪除學員「${reg.fullName}」的報名紀錄嗎？`)) {
                            deleteRegistration(reg.id);
                          }
                        }}
                        className="text-xs text-neutral-500 hover:text-red-400 p-1"
                      >
                        刪除此紀錄
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-neutral-900 rounded-2xl border border-neutral-800">
                <p className="text-neutral-400 text-xs">查無符合條件的學員報名資料</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: BRAND SETTINGS & SEO OPEN GRAPH */}
        {adminTab === 'settings' && (
          <div className="space-y-6 animate-fade-in max-w-4xl">
            <div>
              <h3 className="text-lg font-bold text-white">品牌基本資訊與 SEO 社群分享設定</h3>
              <p className="text-xs text-neutral-400">
                修改學苑名稱、官方社群連結與 Facebook / Threads 分享時顯示的 OpenGraph 資訊
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    品牌中文名稱
                  </label>
                  <input
                    type="text"
                    value={localBrand.brandName}
                    onChange={(e) => setLocalBrand({ ...localBrand, brandName: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    英文品牌名稱
                  </label>
                  <input
                    type="text"
                    value={localBrand.englishName}
                    onChange={(e) => setLocalBrand({ ...localBrand, englishName: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    品牌核心 Slogan（首頁與分享標語）
                  </label>
                  <input
                    type="text"
                    value={localBrand.slogan}
                    onChange={(e) => setLocalBrand({ ...localBrand, slogan: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    SEO 網頁描述（Meta Description / 社群分享內文）
                  </label>
                  <textarea
                    rows={3}
                    value={localBrand.description}
                    onChange={(e) => setLocalBrand({ ...localBrand, description: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    社群分享預覽預設主圖 URL (OpenGraph Image 1200x630)
                  </label>
                  <input
                    type="url"
                    value={localBrand.ogImageUrl}
                    onChange={(e) => setLocalBrand({ ...localBrand, ogImageUrl: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    頂部公告快訊跑馬燈文案
                  </label>
                  <input
                    type="text"
                    value={localBrand.announcementTicker}
                    onChange={(e) =>
                      setLocalBrand({ ...localBrand, announcementTicker: e.target.value })
                    }
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="border-t border-neutral-800 pt-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  官方社群與客服連結
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">
                      LINE 官方帳號連結
                    </label>
                    <input
                      type="url"
                      value={localBrand.lineOfficialUrl}
                      onChange={(e) =>
                        setLocalBrand({ ...localBrand, lineOfficialUrl: e.target.value })
                      }
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">
                      Threads 官方帳號連結
                    </label>
                    <input
                      type="url"
                      value={localBrand.threadsUrl}
                      onChange={(e) =>
                        setLocalBrand({ ...localBrand, threadsUrl: e.target.value })
                      }
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">
                      Instagram 官方帳號連結
                    </label>
                    <input
                      type="url"
                      value={localBrand.instagramUrl}
                      onChange={(e) =>
                        setLocalBrand({ ...localBrand, instagramUrl: e.target.value })
                      }
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">
                      聯絡電話
                    </label>
                    <input
                      type="text"
                      value={localBrand.phone}
                      onChange={(e) => setLocalBrand({ ...localBrand, phone: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4 flex items-center justify-between border-t border-neutral-800">
                <button
                  onClick={() => setIsSharePreviewOpen(true)}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  開啟社群分享卡片預覽測試
                </button>

                <button
                  onClick={() => updateBrandConfig(localBrand)}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>儲存品牌設定並同步</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
