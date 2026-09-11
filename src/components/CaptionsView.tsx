import React, { useState } from 'react';
import { PenSquare, Copy, Check, Hash, MessageCircle, Instagram, Megaphone } from 'lucide-react';
import { SocialCaptions } from '../types';
import { openWhatsAppShare } from '../utils/share';

interface CaptionsViewProps {
  captions: SocialCaptions;
  brandName: string;
}

export const CaptionsView: React.FC<CaptionsViewProps> = ({ captions, brandName }) => {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [activePlatform, setActivePlatform] = useState<'tiktok' | 'instagram' | 'meta'>('tiktok');

  const handleCopy = (text: string, tabId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabId);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const fullTiktokText = `${captions.tiktokReels.hook}\n\n${captions.tiktokReels.body}\n\n👉 ${captions.tiktokReels.cta}\n\n${captions.tiktokReels.hashtags.join(' ')}`;

  const fullInstagramText = `${captions.instagramFeed.hook}\n\n${captions.instagramFeed.body}\n\n${captions.instagramFeed.carouselNotes ? `[Struktur Slide Carousel]:\n${captions.instagramFeed.carouselNotes}\n\n` : ''}👉 ${captions.instagramFeed.cta}\n\n${captions.instagramFeed.hashtags.join(' ')}`;

  const fullMetaAdsText = `[PRIMARY TEXT]:\n${captions.metaAdsCopy.primaryText}\n\n[HEADLINE]: ${captions.metaAdsCopy.headline}\n[DESCRIPTION]: ${captions.metaAdsCopy.description}\n[CALL TO ACTION BUTTON]: ${captions.metaAdsCopy.ctaButton}`;

  const handleShareWhatsApp = (platform: 'tiktok' | 'instagram' | 'meta') => {
    let text = '';
    if (platform === 'tiktok') {
      text = `*📱 CAPTION TIKTOK & REELS: ${brandName}*

*Hook:*
${captions.tiktokReels.hook}

*Body:*
${captions.tiktokReels.body}

*CTA:*
👉 ${captions.tiktokReels.cta}

${captions.tiktokReels.hashtags.join(' ')}

_Dibuat dengan VISTA (Visual Intelligence Storytelling & Transformation Architecture)_`;
    } else if (platform === 'instagram') {
      text = `*📸 CAPTION INSTAGRAM CAROUSEL / FEED: ${brandName}*

*Hook:*
${captions.instagramFeed.hook}

*Isi:*
${captions.instagramFeed.body}

${captions.instagramFeed.carouselNotes ? `*Struktur Carousel:* ${captions.instagramFeed.carouselNotes}\n\n` : ''}*CTA:*
👉 ${captions.instagramFeed.cta}

${captions.instagramFeed.hashtags.join(' ')}

_Dibuat dengan VISTA (Visual Intelligence Storytelling & Transformation Architecture)_`;
    } else {
      text = `*📢 META ADS COPY (FB & IG ADS): ${brandName}*

*Primary Text:*
${captions.metaAdsCopy.primaryText}

*Headline:* ${captions.metaAdsCopy.headline}
*Description:* ${captions.metaAdsCopy.description}
*CTA Button:* ${captions.metaAdsCopy.ctaButton}

_Dibuat dengan VISTA (Visual Intelligence Storytelling & Transformation Architecture)_`;
    }
    openWhatsAppShare(text);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <PenSquare className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Caption Media Sosial Multi-Format
              </h2>
              <p className="text-xs text-slate-400">
                Copywriting siap upload untuk TikTok / Reels, Feed/Carousel, dan Meta Ads
              </p>
            </div>
          </div>
        </div>

        {/* Platform Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            type="button"
            onClick={() => setActivePlatform('tiktok')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activePlatform === 'tiktok'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>TikTok & Reels</span>
          </button>
          <button
            type="button"
            onClick={() => setActivePlatform('instagram')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activePlatform === 'instagram'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>IG Feed / Carousel</span>
          </button>
          <button
            type="button"
            onClick={() => setActivePlatform('meta')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activePlatform === 'meta'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Meta Ads Copy</span>
          </button>
        </div>
      </div>

      {/* Content Area Based on Active Platform */}
      {activePlatform === 'tiktok' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white">Format TikTok & Instagram Reels</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleShareWhatsApp('tiktok')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                title="Kirim caption TikTok ini ke WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Bagikan ke WA</span>
              </button>
              <button
                type="button"
                onClick={() => handleCopy(fullTiktokText, 'tiktok')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              >
                {copiedTab === 'tiktok' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Caption Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Salin Lengkap</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
              <span className="text-[11px] font-semibold text-amber-400 block uppercase tracking-wider mb-1">
                Baris Pertama (Hook Scroll Stopper)
              </span>
              <p className="font-bold text-white">{captions.tiktokReels.hook}</p>
            </div>

            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider mb-1">
                Isi Cerita (Body)
              </span>
              <p className="text-slate-300 whitespace-pre-line leading-relaxed">
                {captions.tiktokReels.body}
              </p>
            </div>

            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
              <span className="text-[11px] font-semibold text-emerald-400 block uppercase tracking-wider mb-1">
                Call to Action (CTA)
              </span>
              <p className="text-slate-200 font-medium">{captions.tiktokReels.cta}</p>
            </div>

            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                <Hash className="w-3 h-3 text-amber-400" />
                <span>Rekomendasi Hashtags ({captions.tiktokReels.hashtags.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {captions.tiktokReels.hashtags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded-md text-[11px] text-amber-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activePlatform === 'instagram' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
              <h3 className="text-sm font-bold text-white">Format Instagram Feed / Carousel Post</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleShareWhatsApp('instagram')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                title="Kirim caption Instagram ini ke WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Bagikan ke WA</span>
              </button>
              <button
                type="button"
                onClick={() => handleCopy(fullInstagramText, 'instagram')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              >
                {copiedTab === 'instagram' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Caption Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Salin Lengkap</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
              <span className="text-[11px] font-semibold text-pink-400 block uppercase tracking-wider mb-1">
                Opening Hook
              </span>
              <p className="font-bold text-white">{captions.instagramFeed.hook}</p>
            </div>

            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider mb-1">
                Isi Edukasi & Storytelling
              </span>
              <p className="text-slate-300 whitespace-pre-line leading-relaxed">
                {captions.instagramFeed.body}
              </p>
            </div>

            {captions.instagramFeed.carouselNotes && (
              <div className="p-3.5 bg-indigo-950/20 rounded-xl border border-indigo-900/40">
                <span className="text-[11px] font-semibold text-indigo-400 block uppercase tracking-wider mb-1">
                  Struktur Slide Carousel
                </span>
                <p className="text-indigo-200 font-mono text-xs">{captions.instagramFeed.carouselNotes}</p>
              </div>
            )}

            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
              <span className="text-[11px] font-semibold text-emerald-400 block uppercase tracking-wider mb-1">
                Call to Action
              </span>
              <p className="text-slate-200 font-medium">{captions.instagramFeed.cta}</p>
            </div>

            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                <Hash className="w-3 h-3 text-pink-400" />
                <span>Niche & Viral Hashtags</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {captions.instagramFeed.hashtags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded-md text-[11px] text-pink-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activePlatform === 'meta' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <h3 className="text-sm font-bold text-white">Meta Ads Manager Copy (Facebook / Instagram)</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleShareWhatsApp('meta')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                title="Kirim naskah iklan Meta Ads ini ke WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Bagikan ke WA</span>
              </button>
              <button
                type="button"
                onClick={() => handleCopy(fullMetaAdsText, 'meta')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              >
                {copiedTab === 'meta' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copywriting Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Salin Ad Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
              <span className="text-[11px] font-semibold text-blue-400 block uppercase tracking-wider mb-1">
                Primary Text (Naskah Utama Iklan)
              </span>
              <p className="text-slate-200 whitespace-pre-line leading-relaxed">
                {captions.metaAdsCopy.primaryText}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider mb-1">
                  Headline (Judul Utama Iklan)
                </span>
                <p className="font-bold text-white text-base">{captions.metaAdsCopy.headline}</p>
              </div>

              <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider mb-1">
                  Description (Teks Tambahan Bawah Headline)
                </span>
                <p className="text-slate-300">{captions.metaAdsCopy.description}</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider mb-0.5">
                  Tombol Call to Action (CTA Button)
                </span>
                <span className="text-slate-200 font-bold">{captions.metaAdsCopy.ctaButton}</span>
              </div>
              <span className="px-3 py-1.5 bg-blue-600/30 text-blue-300 font-semibold rounded-lg border border-blue-500/40 text-xs">
                {captions.metaAdsCopy.ctaButton}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
