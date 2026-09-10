import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Info,
  User,
  Phone,
  Mail,
  Camera,
  Layers,
  FileText,
} from 'lucide-react';

export const RegistrationSection: React.FC = () => {
  const { courses, selectedCourseId, setSelectedCourseId, addRegistration, setCurrentView } =
    useApp();

  const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const [formData, setFormData] = useState({
    courseId: currentCourse.id,
    selectedDate: currentCourse.scheduleDates[0] || '',
    fullName: '',
    email: '',
    phone: '',
    ageGroup: '26-30 歲' as const,
    currentDevice: 'iPhone / Android 高階手機' as const,
    experienceLevel: '偶爾用手機剪片' as const,
    learningGoal: '',
    invoiceType: '個人二聯發票' as const,
    taxId: '',
    companyName: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ id: string; courseTitle: string } | null>(null);

  const handleCourseChange = (id: string) => {
    const c = courses.find((item) => item.id === id);
    setSelectedCourseId(id);
    setFormData((prev) => ({
      ...prev,
      courseId: id,
      selectedDate: c?.scheduleDates[0] || '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('請填寫完整的姓名、手機號碼與電子郵件！');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newId = addRegistration({
        courseId: formData.courseId,
        courseTitle: currentCourse.title,
        selectedDate: formData.selectedDate,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        ageGroup: formData.ageGroup,
        currentDevice: formData.currentDevice,
        experienceLevel: formData.experienceLevel,
        learningGoal: formData.learningGoal,
        invoiceType: formData.invoiceType,
        taxId: formData.taxId,
        companyName: formData.companyName,
      });

      setSuccessInfo({
        id: newId,
        courseTitle: currentCourse.title,
      });
      setIsSubmitting(false);
    }, 600);
  };

  if (successInfo) {
    return (
      <div className="py-16 sm:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              報名預約成功
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              已收到您的席次保留申請！
            </h1>
            <p className="text-sm text-neutral-400">
              報名編號：<span className="font-mono text-amber-400 font-bold">{successInfo.id}</span>
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-left space-y-4">
            <div className="text-sm font-bold text-white border-b border-neutral-800 pb-3">
              已保留班別：{successInfo.courseTitle}
            </div>
            <div className="text-xs text-neutral-300 space-y-2 leading-relaxed">
              <p>• 選擇梯次：{formData.selectedDate}</p>
              <p>• 預約人：{formData.fullName}（{formData.phone}）</p>
              <p>• 上課基地：{currentCourse.location}</p>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-amber-300/90 leading-relaxed">
              📌 後續步驟：學苑專案顧問將於 24
              小時內以電話或簡訊與您聯繫，確認學員設備需求與發送正式入學繳費通知信。
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setSuccessInfo(null);
                setCurrentView('home');
              }}
              className="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-bold"
            >
              返回學苑首頁
            </button>
            <button
              onClick={() => {
                setSuccessInfo(null);
                setCurrentView('courses');
              }}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-sm font-black shadow-md"
            >
              繼續瀏覽其他班別
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            席次有限・即刻預約
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            線上報名與席次保留表單
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            為維持 10-14
            人高規格小班手把手教學品質，滿班即關閉。填表後無需立即刷卡，專案顧問將與您電話確認後再發送正式繳費通知。
          </p>
        </div>

        {/* Selected Course Summary Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-8 shadow-xl">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            當前選定報名課程
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-8 space-y-2">
              <select
                value={formData.courseId}
                onChange={(e) => handleCourseChange(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-xl px-3.5 py-2 text-sm font-bold focus:border-amber-500 focus:outline-none"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} — NT$ {c.price.toLocaleString()} ({c.duration})
                  </option>
                ))}
              </select>

              <div className="text-xs text-neutral-400 flex flex-wrap gap-4 pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {currentCourse.duration}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {currentCourse.location}
                </span>
                <span className="text-amber-400 font-bold">
                  剩餘 {currentCourse.remainingSeats} 席
                </span>
              </div>
            </div>

            <div className="sm:col-span-4 bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-right">
              <div className="text-[11px] text-neutral-400">早鳥學費特惠</div>
              <div className="text-2xl font-black text-white">
                NT$ {currentCourse.price.toLocaleString()}
              </div>
              <div className="text-[10px] text-neutral-500 line-through">
                原價 NT$ {currentCourse.originalPrice.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* The Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl"
        >
          {/* Step 1: Select Session Date */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">步驟 1：選擇參與開課梯次</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentCourse.scheduleDates.map((dateStr, idx) => (
                <label
                  key={idx}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                    formData.selectedDate === dateStr
                      ? 'bg-amber-500/15 border-amber-500 text-white font-bold'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="selectedDate"
                      value={dateStr}
                      checked={formData.selectedDate === dateStr}
                      onChange={(e) => setFormData({ ...formData, selectedDate: e.target.value })}
                      className="accent-amber-500"
                    />
                    <span>{dateStr}</span>
                  </div>
                  <span className="text-[10px] text-amber-400 bg-black/40 px-2 py-0.5 rounded">
                    梯次 0{idx + 1}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Step 2: Personal Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
              <User className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">步驟 2：學員基本聯絡資料</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  中文姓名 <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="例：陳冠宇"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  行動電話 <span className="text-amber-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="例：0912-345-678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  電子郵件 (收取課前通知信) <span className="text-amber-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="例：yourname@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  您的年齡層
                </label>
                <select
                  value={formData.ageGroup}
                  onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value as any })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="20-25 歲">20-25 歲</option>
                  <option value="26-30 歲">26-30 歲（核心主力學員）</option>
                  <option value="31-35 歲">31-35 歲（核心主力學員）</option>
                  <option value="36-40 歲">36-40 歲（核心主力學員）</option>
                  <option value="41 歲以上">41 歲以上</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Equipment & Learning Goal */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
              <Camera className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">步驟 3：設備與學習現況</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  目前手邊主要拍攝設備
                </label>
                <select
                  value={formData.currentDevice}
                  onChange={(e) => setFormData({ ...formData, currentDevice: e.target.value as any })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="iPhone / Android 高階手機">iPhone / Android 高階手機</option>
                  <option value="入門微單 / 單眼相機">入門微單 / 單眼相機 (Sony/Canon/Nikon/Fuji)</option>
                  <option value="專業電影機或工作用相機">專業電影機或工作用相機 (FX3/FX30/BMPCC)</option>
                  <option value="目前尚無設備">目前尚無設備（上課免費向學苑借用）</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  剪輯與拍攝經驗程度
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) =>
                    setFormData({ ...formData, experienceLevel: e.target.value as any })
                  }
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="完全無經驗的新手">完全無經驗的新手（從 0 開始）</option>
                  <option value="偶爾用手機剪片">偶爾用手機剪片（常遇到節奏卡點）</option>
                  <option value="會使用剪輯軟體但缺商業思維">
                    會用 Premiere/CapCut 但缺爆款思維
                  </option>
                  <option value="已有接案經驗想精進">已有接案經驗想精進打光與調色</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  您最希望透過本課程解決什麼痛點或達成什麼目標？
                </label>
                <textarea
                  rows={3}
                  placeholder="例：想經營自己餐飲品牌的 IG Reels 提高假日訂位率；或是希望能學會相機三點布光拍出質感訪談。"
                  value={formData.learningGoal}
                  onChange={(e) => setFormData({ ...formData, learningGoal: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none placeholder-neutral-600"
                />
              </div>
            </div>
          </div>

          {/* Step 4: Invoice */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">步驟 4：發票開立需求</h2>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="radio"
                  name="invoiceType"
                  value="個人二聯發票"
                  checked={formData.invoiceType === '個人二聯發票'}
                  onChange={() => setFormData({ ...formData, invoiceType: '個人二聯發票' })}
                  className="accent-amber-500"
                />
                <span>個人二聯電子發票</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="radio"
                  name="invoiceType"
                  value="公司三聯發票 (需統編抬頭)"
                  checked={formData.invoiceType === '公司三聯發票 (需統編抬頭)'}
                  onChange={() =>
                    setFormData({ ...formData, invoiceType: '公司三聯發票 (需統編抬頭)' })
                  }
                  className="accent-amber-500"
                />
                <span>公司報帳三聯發票（統編與抬頭）</span>
              </label>
            </div>

            {formData.invoiceType === '公司三聯發票 (需統編抬頭)' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800 animate-fade-in">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    統一編號 (8 碼)
                  </label>
                  <input
                    type="text"
                    placeholder="例：54896210"
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    公司發票抬頭
                  </label>
                  <input
                    type="text"
                    placeholder="例：創映行銷有限公司"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit CTA */}
          <div className="pt-4 border-t border-neutral-800 space-y-3">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
              <span>
                送出後我們將嚴格保護您的個資，絕不主動推銷或轉售第三方。
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-black text-base text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>正在保留席次資料...</span>
              ) : (
                <>
                  <span>確認送出預約申請・保留小班名額</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
