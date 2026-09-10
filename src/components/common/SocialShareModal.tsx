import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Share2,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Info,
} from 'lucide-react';

export const SocialShareModal: React.FC = () => {
  const { isSharePreviewOpen, setIsSharePreviewOpen, brandConfig, currentView, courses } = useApp();
  const [platform, setPlatform] = useState<'threads' | 'facebook' | 'line'>('threads');
  const [selectedTarget, setSelectedTarget] = useState<'home' | 'short-video' | 'mirrorless'>('home');
  const [copied, setCopied] = useState(false);
  const [copiedMeta, setCopiedMeta] = useState(false);

  if (!isSharePreviewOpen) return null;

  // Derive title, description, and image depending on selected target
  let ogTitle = `${brandConfig.brandName}｜${brandConfig.slogan}`;
  let ogDesc = brandConfig.description;
  let ogImage = brandConfig.ogImageUrl;
  let targetUrl = 'https://framecraft.tw';

  if (selectedTarget === 'short-video') {
    const c = courses.find((x) => x.id === 'course-short-video-01');
    if (c) {
      ogTitle = `${c.title}｜${brandConfig.brandName}`;
      ogDesc = `${c.subtitle} 專為 25-40 歲行銷人與創作者設計，2天帶走3支商業級爆款短影音成片。`;
      ogImage = c.featuredImage;
      targetUrl = 'https://framecraft.tw/#courses';
    }
  } else if (selectedTarget === 'mirrorless') {
    const c = courses.find((x) => x.id === 'course-mirrorless-cinematic');
    if (c) {
      ogTitle = `${c.title}｜${brandConfig.brandName}`;
      ogDesc = `${c.subtitle} 10年廣告導演親授，影棚實戰三點打光與電影級手動運鏡。`;
      ogImage = c.featuredImage;
      targetUrl = 'https://framecraft.tw/#courses';
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const metaTagSnippet = `<!-- 網頁標題與社群分享 Meta Tags (OpenGraph) -->
<title>${ogTitle}</title>
<meta name="description" content="${ogDesc}" />
<meta property="og:site_name" content="${brandConfig.brandName}" />
<meta property="og:title" content="${ogTitle}" />
<meta property="og:description" content="${ogDesc}" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="${targetUrl}" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${ogTitle}" />
<meta name="twitter:description" content="${ogDesc}" />
<meta name="twitter:image" content="${ogImage}" />`;

  const handleCopyMeta = () => {
    navigator.clipboard.writeText(metaTagSnippet);
    setCopiedMeta(true);
    setTimeout(() => setCopiedMeta(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                社群分享預覽模擬器
                <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Threads & FB 規範相容
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                驗證連結分享到社群平台時的 OpenGraph 標題、描述與縮圖顯示效果
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSharePreviewOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Target Page Selector & Platform Tabs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-400 font-medium">預覽網頁：</span>
              <select
                value={selectedTarget}
                onChange={(e) => setSelectedTarget(e.target.value as any)}
                className="bg-neutral-800 border border-neutral-700 text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
              >
                <option value="home">學苑官方首頁</option>
                <option value="short-video">商業短影音 0-1 爆款實戰班</option>
                <option value="mirrorless">微單相機商業運鏡一日精實班</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-neutral-950 p-1 rounded-xl border border-neutral-800 self-stretch sm:self-auto justify-center">
              <button
                onClick={() => setPlatform('threads')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  platform === 'threads'
                    ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span className="font-black text-xs">@</span>
                Threads 預覽
              </button>
              <button
                onClick={() => setPlatform('facebook')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  platform === 'facebook'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span className="font-black text-xs">f</span>
                Facebook 預覽
              </button>
              <button
                onClick={() => setPlatform('line')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  platform === 'line'
                    ? 'bg-[#06C755] text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                LINE 預覽
              </button>
            </div>
          </div>

          {/* Realistic Card Preview Box */}
          <div className="bg-neutral-950/80 rounded-2xl p-4 sm:p-6 border border-neutral-800">
            <div className="text-xs text-neutral-400 mb-3 flex items-center justify-between">
              <span className="font-semibold text-neutral-300">
                {platform === 'threads' && 'Threads 貼文連結卡片樣式'}
                {platform === 'facebook' && 'Facebook 動態時報連結卡片樣式'}
                {platform === 'line' && 'LINE 聊天室傳送連結預覽樣式'}
              </span>
              <span className="text-[11px] text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded">
                比例 1.91 : 1 (1200 x 630px)
              </span>
            </div>

            {/* Simulated Social Card */}
            {platform === 'threads' && (
              <div className="max-w-md mx-auto bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-xl">
                {/* Simulated Threads Post user bar */}
                <div className="p-3 border-b border-neutral-800 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-amber-400 text-xs">
                    FC
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      {brandConfig.threadsHandle}
                      <span className="text-[10px] text-neutral-500 font-normal">・剛剛</span>
                    </div>
                    <p className="text-[11px] text-neutral-300">
                      專為行銷人與自媒體打造的實戰工作坊開課了！推薦大家參考課綱 🎬
                    </p>
                  </div>
                </div>

                {/* The Embedded Link Card in Threads */}
                <div className="border-t border-neutral-800 group cursor-pointer">
                  <div className="aspect-[1.91/1] w-full bg-neutral-800 overflow-hidden relative">
                    <img
                      src={ogImage}
                      alt={ogTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] text-white">
                      framecraft.tw
                    </div>
                  </div>
                  <div className="p-3.5 space-y-1 bg-neutral-900">
                    <div className="text-xs text-neutral-400 uppercase tracking-wider">
                      FRAMECRAFT.TW
                    </div>
                    <div className="text-sm font-bold text-white leading-snug line-clamp-2">
                      {ogTitle}
                    </div>
                    <div className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {ogDesc}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {platform === 'facebook' && (
              <div className="max-w-lg mx-auto bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden shadow-xl">
                <div className="p-3 border-b border-neutral-800 flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold text-xs">
                    創映
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{brandConfig.brandName}</div>
                    <div className="text-[10px] text-neutral-500">公開・剛剛</div>
                  </div>
                </div>

                <div className="aspect-[1.91/1] w-full bg-neutral-800 overflow-hidden">
                  <img src={ogImage} alt={ogTitle} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 bg-neutral-800/90 border-t border-neutral-700 space-y-1">
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wide">
                    FRAMECRAFT.TW
                  </div>
                  <div className="text-sm font-bold text-white line-clamp-1">{ogTitle}</div>
                  <div className="text-xs text-neutral-300 line-clamp-2">{ogDesc}</div>
                </div>
              </div>
            )}

            {platform === 'line' && (
              <div className="max-w-sm mx-auto bg-[#849EB8] p-4 rounded-2xl">
                <div className="bg-white text-neutral-900 rounded-xl overflow-hidden shadow-md">
                  <div className="aspect-[1.91/1] w-full bg-neutral-100 overflow-hidden">
                    <img src={ogImage} alt={ogTitle} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 space-y-1">
                    <div className="text-sm font-bold text-neutral-900 line-clamp-1">{ogTitle}</div>
                    <div className="text-xs text-neutral-600 line-clamp-2">{ogDesc}</div>
                    <div className="text-[10px] text-neutral-400 pt-1">framecraft.tw</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions & Meta Tag Export */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleCopyLink}
              className="py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-2 border border-neutral-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? '已複製分享連結！' : '複製預覽頁面網址'}
            </button>
            <button
              onClick={handleCopyMeta}
              className="py-2.5 px-4 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 text-xs font-semibold flex items-center justify-center gap-2 border border-amber-500/30 transition-colors"
            >
              {copiedMeta ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {copiedMeta ? '已複製 OpenGraph 代碼！' : '複製完整 OpenGraph Meta 標籤'}
            </button>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-400">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              提示：本網站前台與每一頁面均已植入動態 OpenGraph
              規範標籤。若夥伴在後台修改品牌名稱、課程描述或更換主圖，此處與真實社群分享抓取的資料皆會自動同步更新。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
