import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  HelpCircle,
  Send,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { brandConfig, showToast, navigateToRegister } = useApp();

  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    topic: '個人課程詢問',
    message: '',
  });
  const [inquirySent, setInquirySent] = useState(false);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: '我完全沒有影音剪輯經驗，對相機也是門外漢，真的跟得上嗎？',
      a: '完全不用擔心！我們的《商業短影音 0-1 班》與《微單一日工作坊》就是專門為零基礎或僅有手機隨手拍經驗的行銷人、創作者設計的。每班嚴格限制 10-14 人，由導師親自在旁手把手指導參數與分鏡，保證下課前帶走屬於自己的完整成片。',
    },
    {
      q: '一定要先買昂貴的單眼或電影機嗎？手機拍出的短影音真的能用於商業推廣？',
      a: '千萬不要陷入器材迷思！如今各大社群平台（IG Reels、TikTok）上超過 80% 的破百萬播放短影音皆是用智慧型手機拍攝完成。只要掌握好光影角度與收音降噪，手機成品質感已足以應付大部分商業宣傳。若想體驗專業微單，創映教室現場備有 Sony FX30 / A7C2 供學員免費借用實機練習。',
    },
    {
      q: '公司行銷預算需要報帳，學費可以開立抬頭統編三聯式發票嗎？',
      a: '可以的！報名表單中勾選「公司三聯發票」並填入統一編號與公司抬頭，學苑將於確認繳費後開立合規電子發票並寄送至您的電子信箱，方便您向公司財務請款報銷。',
    },
    {
      q: '若報名後臨時加班或生病請假，是否有補課機制？',
      a: '我們提供彈性的補課機制：若因不可抗力或工作臨時排程於開課 3 天前通知，可免費順延至下一個月的梯次；此外，所有課堂實體錄音與講義、精華複習影片均會在課後學員社群保留，確保您的學習進度不中斷。',
    },
    {
      q: '上完課回到家或公司拍片卡關怎麼辦？導師會看作業嗎？',
      a: '這正是創映最受學員好評的特色！結業後可加入專屬 Discord 與 LINE 終身學員社群，享有「課後 30 天作品陪跑服務」。只要你在社群上傳拍攝毛片或初剪，Mark 導演與 Emily 總監都會親自逐幀點評修剪意見。',
    },
    {
      q: '我們公司想規劃行銷團隊或實體門市專員影音培訓，可以客製包班嗎？',
      a: '可以！創映已為多家餐飲、電商、美妝與科技品牌量身打造 1-2 天企業影音內訓。歡迎直接填寫下方諮詢表單或私訊官方 LINE，專案經理將於 1 個工作日內為您提供客製化提案與報價。',
    },
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.message) {
      alert('請填寫完整諮詢內容！');
      return;
    }
    setInquirySent(true);
    showToast('諮詢留言已送出！專案經理將於 1 個工作天內回覆您。', 'success');
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            實體基地與諮詢服務
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            與我們聯繫・開啟你的影像實戰之旅
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            想了解更多課程細節、參觀實體影棚、或是洽詢企業影音內訓包班？歡迎直接來電、LINE
            線上洽詢或填寫下方留言。
          </p>
        </div>

        {/* Contact Info & Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-900/90 rounded-3xl border border-neutral-800 p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                創映影像學苑實體基地
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <div className="text-neutral-400 font-semibold text-xs">實體基地地址</div>
                  <div className="text-white font-medium">{brandConfig.address}</div>
                  <div className="text-amber-400 text-xs pt-1">
                    🚇 交通指南：台北捷運藍線【永春站】4 號出口，步行僅需 2 分鐘
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <div className="text-neutral-400 font-semibold text-xs">客服專線與信箱</div>
                  <div className="text-white font-medium">電話：{brandConfig.phone}</div>
                  <div className="text-white font-medium">信箱：{brandConfig.email}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <div className="text-neutral-400 font-semibold text-xs">影棚與學苑開放時間</div>
                  <div className="text-white font-medium">{brandConfig.studioHours}</div>
                </div>
              </div>

              {/* LINE Official QR Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#06C755]/20 to-neutral-950 border border-[#06C755]/30 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-[#06C755] fill-[#06C755]" />
                    LINE 官方即時客服
                  </div>
                  <div className="text-xs text-neutral-400">
                    ID: <span className="text-white font-mono">{brandConfig.lineOfficialId}</span>
                  </div>
                </div>
                <a
                  href={brandConfig.lineOfficialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-bold shrink-0 transition-colors"
                >
                  立即加入對話 →
                </a>
              </div>
            </div>
          </div>

          {/* Right: Interactive Inquiry Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-900/90 rounded-3xl border border-neutral-800 p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">專案諮詢留言</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  有任何客製需求或疑難雜症？填寫表單後專案經理將主動與您聯繫。
                </p>
              </div>

              {inquirySent ? (
                <div className="p-8 text-center bg-neutral-950 border border-neutral-800 rounded-2xl space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">感謝您的留言諮詢！</h4>
                  <p className="text-xs text-neutral-400">
                    我們已收到您的訊息，專案經理將於 24 小時內以 Email 或電話與您聯繫。
                  </p>
                  <button
                    onClick={() => {
                      setInquirySent(false);
                      setInquiryForm({
                        name: '',
                        phone: '',
                        email: '',
                        topic: '個人課程詢問',
                        message: '',
                      });
                    }}
                    className="mt-2 text-xs text-amber-400 underline font-semibold"
                  >
                    再傳送一則訊息
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        聯絡人姓名 *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="例：林小姐"
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        電話或手機 *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="例：0987-654-321"
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        電子郵件 *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="例：service@brand.com"
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        諮詢主旨類型
                      </label>
                      <select
                        value={inquiryForm.topic}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, topic: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                      >
                        <option value="個人課程詢問">個人課程詢問與程度評估</option>
                        <option value="企業影音內訓包班">企業影音內訓與包班專案</option>
                        <option value="影棚租借合作">實體攝影棚租借與拍攝合作</option>
                        <option value="講師商業合作">名師商案執導或講座邀約</option>
                        <option value="其他問題">其他事項</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      諮詢內容說明 *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="請簡述您的需求，例如：預計受訓人數、期望達成之影音成效、或目前遇到的拍攝剪輯問題..."
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none placeholder-neutral-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>送出專案諮詢</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="bg-neutral-900/60 rounded-3xl border border-neutral-800 p-6 sm:p-10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 text-amber-400 text-xs font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              常見問題 FAQ
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">常見疑問解答</h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              整理學員在報名前最常詢問的 6 大核心問題
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-amber-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-900 pt-3 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => navigateToRegister()}
              className="px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              已有明確目標？立即報名保留席次 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
