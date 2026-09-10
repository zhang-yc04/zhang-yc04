export type CourseCategory = '短影音剪輯' | '商業運鏡與拍攝' | '影音行銷策略' | '調色與聲音設計';

export type CourseLevel = '入門零基礎' | '進階商業班' | '實體高階工作坊';

export type CourseStatus = 'open' | 'few_seats' | 'waitlist' | 'closed';

export interface CourseModule {
  title: string;
  duration: string;
  points: string[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: CourseCategory;
  level: CourseLevel;
  price: number;
  originalPrice: number;
  duration: string;
  targetAudience: string[];
  location: string;
  dateInfo: string;
  scheduleDates: string[];
  maxSeats: number;
  remainingSeats: number;
  status: CourseStatus;
  featuredImage: string;
  badge?: string;
  summary: string;
  learningOutcomes: string[];
  syllabus: CourseModule[];
  includedEquipment: string[];
  recommendedEquipment: string;
  rating?: number;
  matchPercentage?: number;
  trailerLength?: string;
  cinematicBadge?: string;
  backdropImage?: string;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  role: string;
  avatar: string;
  coverImage?: string;
  yearsExperience: number;
  bio: string;
  quote: string;
  expertise: string[];
  pastClients: string[];
  stats: {
    label: string;
    value: string;
  }[];
}

export interface Announcement {
  id: string;
  title: string;
  category: '開課快訊' | '活動講座' | '學員捷報' | '實戰專欄';
  publishedAt: string;
  summary: string;
  content: string;
  image?: string;
  isPinned?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export interface RegistrationSubmission {
  id: string;
  courseId: string;
  courseTitle: string;
  selectedDate: string;
  fullName: string;
  email: string;
  phone: string;
  ageGroup: '20-25 歲' | '26-30 歲' | '31-35 歲' | '36-40 歲' | '41 歲以上';
  currentDevice: 'iPhone / Android 高階手機' | '入門微單 / 單眼相機' | '專業電影機或工作用相機' | '目前尚無設備';
  experienceLevel: '完全無經驗的新手' | '偶爾用手機剪片' | '會使用剪輯軟體但缺商業思維' | '已有接案經驗想精進';
  learningGoal: string;
  invoiceType: '個人二聯發票' | '公司三聯發票 (需統編抬頭)';
  taxId?: string;
  companyName?: string;
  status: '待確認' | '已聯繫' | '已完成報名' | '已取消';
  createdAt: string;
  adminNote?: string;
}

export interface StudentShowcase {
  id: string;
  studentName: string;
  identity: string;
  courseName: string;
  result: string;
  quote: string;
  coverImage: string;
  viewsOrMetric: string;
}

export interface BrandConfig {
  brandName: string;
  englishName: string;
  slogan: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  studioHours: string;
  lineOfficialId: string;
  lineOfficialUrl: string;
  instagramHandle: string;
  instagramUrl: string;
  threadsHandle: string;
  threadsUrl: string;
  youtubeChannel: string;
  announcementTicker: string;
  ogImageUrl: string;
}
