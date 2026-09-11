import React, { useState } from 'react';
import { Anchor, Copy, Check, Sparkles, Zap, Flame, MessageCircle } from 'lucide-react';
import { HookItem } from '../types';
import { openWhatsAppShare } from '../utils/share';

interface HooksViewProps {
  hooks: HookItem[];
  brandName: string;
}

export const HooksView: React.FC<HooksViewProps> = ({ hooks, brandName }) => {
  const [copiedId, setCopiedId] = useState<number | 'all' | null>(null);

  const handleCopySingle = (hook: HookItem) => {
    navigator.clipboard.writeText(hook.hookText);
    setCopiedId(hook.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAllHooks = () => {
    const allText = hooks
      .map((h, i) => `${i + 1}. [${h.formula}]\n"${h.hookText}"\n👉 Tips Delivery: ${h.deliveryTip}\n`)
      .join('\n');
    navigator.clipboard.writeText(allText);
    setCopiedId('all');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShareAllHooksWhatsApp = () => {
    const allText = hooks
      .map((h, i) => `*${i + 1}. [${h.formula}]* (${h.retentionTier || 'Viral'})\n"${h.hookText}"\n💡 _Tips:_ ${h.deliveryTip}\n`)
      .join('\n');

    const text = `*🎣 10 HOOK GENERATOR (3 DETIK PERTAMA)*
*Brand:* ${brandName}

${allText}
_Dibuat dengan VISTA (Visual Intelligence Storytelling & Transformation Architecture)_`;
    openWhatsAppShare(text);
  };

  const handleShareSingleHookWhatsApp = (hook: HookItem) => {
    const text = `*🎣 HOOK FORMULA: [${hook.formula}]*
*Brand:* ${brandName}
*Tier:* ${hook.retentionTier || 'High Retention'}

"${hook.hookText}"

💡 *Tips Delivery & Aksi Kamera:*
${hook.deliveryTip}

_Dibuat dengan VISTA (Visual Intelligence Storytelling & Transformation Architecture)_`;
    openWhatsAppShare(text);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Anchor className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  10 Hook Generator (Formula 3 Detik Pertama)
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-rose-400" />
                  10 Varian Teruji
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Variasi hook pembuka video TikTok / Reels dengan rumus psikologi retensi tinggi untuk <span className="text-amber-300 font-semibold">{brandName}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleShareAllHooksWhatsApp}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
            title="Bagikan 10 hook ke WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Bagikan ke WA</span>
          </button>

          <button
            type="button"
            onClick={handleCopyAllHooks}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-sm cursor-pointer"
          >
            {copiedId === 'all' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>10 Hook Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Semua 10 Hook</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grid of 10 Hooks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hooks.map((hook) => (
          <div
            key={hook.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between transition-all group hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {hook.formula}
                </span>

                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <Zap className="w-3 h-3" />
                  <span>{hook.retentionTier || 'High Retention'}</span>
                </div>
              </div>

              <div className="my-3 p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80">
                <p className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                  {hook.hookText}
                </p>
              </div>

              <div className="text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/50 mb-3">
                <span className="text-amber-400 font-semibold block text-[10px] uppercase tracking-wider mb-0.5">
                  💡 Tips Delivery & Aksi Kamera:
                </span>
                <p className="text-slate-300 text-xs">{hook.deliveryTip}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleShareSingleHookWhatsApp(hook)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700/60 hover:bg-emerald-600 text-emerald-100 border border-emerald-600/60 transition-colors w-1/2 justify-center cursor-pointer"
                title="Kirim hook ini ke WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Kirim ke WA</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopySingle(hook)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors w-1/2 justify-center cursor-pointer"
              >
                {copiedId === hook.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Salin Hook</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
