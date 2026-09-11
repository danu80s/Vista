import React, { useState } from 'react';
import { Target, Lightbulb, Compass, Users, Sparkles, Check, Copy, MessageCircle } from 'lucide-react';
import { AdStrategy, BusinessInput } from '../types';
import { openWhatsAppShare } from '../utils/share';

interface StrategyViewProps {
  strategy: AdStrategy;
  businessInput: BusinessInput;
}

export const StrategyView: React.FC<StrategyViewProps> = ({ strategy, businessInput }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyStrategy = () => {
    const text = `=== STRATEGI IKLAN & BRAND POSITIONING: ${businessInput.brandName} ===
Posisi Brand: ${strategy.brandPositioning}
The Big Idea / Angle Iklan: ${strategy.coreAngle}
Value Proposition: ${strategy.valueProposition}

TARGET PERSONA:
- Demografi: ${strategy.targetPersonaDetail.demographics}
- Psikografi: ${strategy.targetPersonaDetail.psychographics}
- Core Pain Point: ${strategy.targetPersonaDetail.corePainPoint}
- Keinginan Tersembunyi: ${strategy.targetPersonaDetail.hiddenDesire}

PEDOMAN GAYA & PLATFORM:
- Tone of Voice: ${strategy.toneGuidelines}
- Format Rekomendasi: ${strategy.platformStrategy.recommendedRatio}
- Hook Window: ${strategy.platformStrategy.hookWindowSeconds}
- Tips Budget & Media Buying: ${strategy.platformStrategy.targetBudgetTips}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = `*🎯 STRATEGI IKLAN & POSITIONING: ${businessInput.brandName}*

📌 *Posisi Brand:*
${strategy.brandPositioning}

💡 *The Big Idea / Angle Iklan:*
${strategy.coreAngle}

💎 *Value Proposition:*
${strategy.valueProposition}

👥 *TARGET PERSONA:*
• Demografi: ${strategy.targetPersonaDetail.demographics}
• Psikografi: ${strategy.targetPersonaDetail.psychographics}
• Core Pain: ${strategy.targetPersonaDetail.corePainPoint}
• Hidden Desire: ${strategy.targetPersonaDetail.hiddenDesire}

🎙️ *PEDOMAN GAYA & PLATFORM:*
• Tone of Voice: ${strategy.toneGuidelines}
• Format: ${strategy.platformStrategy.recommendedRatio}
• Golden Hook: ${strategy.platformStrategy.hookWindowSeconds}
• Media Buying: ${strategy.platformStrategy.targetBudgetTips}

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
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Strategi Iklan & Persona Positioning
              </h2>
              <p className="text-xs text-slate-400">
                Landasan psikologi kampanye untuk <span className="text-amber-300 font-semibold">{businessInput.brandName}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
            title="Kirim brief strategi ke WhatsApp tim / klien"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Bagikan ke WA</span>
          </button>

          <button
            type="button"
            onClick={handleCopyStrategy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors w-fit cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Salin Dokumen Strategi</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Core Angle Card */}
      <div className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-lg">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Lightbulb className="w-4 h-4" />
          The Big Idea / Ad Angle Utama
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-3">
          {strategy.coreAngle}
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          {strategy.brandPositioning}
        </p>
      </div>

      {/* Target Persona Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
            <Users className="w-4 h-4 text-sky-400" />
            <span>Target Persona Detail</span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60">
              <span className="text-slate-400 block text-[11px] font-medium uppercase tracking-wider mb-1">
                Demografi & Profil
              </span>
              <p className="text-slate-200">{strategy.targetPersonaDetail.demographics}</p>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60">
              <span className="text-slate-400 block text-[11px] font-medium uppercase tracking-wider mb-1">
                Psikografi & Pola Pikir
              </span>
              <p className="text-slate-200">{strategy.targetPersonaDetail.psychographics}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
            <Target className="w-4 h-4 text-rose-400" />
            <span>Pain Point vs Hidden Desire</span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3 bg-rose-950/20 rounded-xl border border-rose-900/30">
              <span className="text-rose-400 block text-[11px] font-medium uppercase tracking-wider mb-1">
                Core Pain Point (Titik Frustrasi Terbesar)
              </span>
              <p className="text-rose-200">{strategy.targetPersonaDetail.corePainPoint}</p>
            </div>

            <div className="p-3 bg-emerald-950/20 rounded-xl border border-emerald-900/30">
              <span className="text-emerald-400 block text-[11px] font-medium uppercase tracking-wider mb-1">
                Keinginan Tersembunyi (The Hidden Desire)
              </span>
              <p className="text-emerald-200">{strategy.targetPersonaDetail.hiddenDesire}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Value Stack & Platform Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Value Proposition & Tone of Voice</span>
          </div>
          <div className="space-y-3 text-xs sm:text-sm">
            <div>
              <span className="text-slate-400 text-[11px] block uppercase font-medium mb-1">
                Unique Value Stack
              </span>
              <p className="text-slate-200 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                {strategy.valueProposition}
              </p>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block uppercase font-medium mb-1">
                Panduan Gaya Bertutur (Podcast Tone)
              </span>
              <p className="text-slate-200 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                {strategy.toneGuidelines}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm mb-3">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>Distribusi Platform & Media Buying</span>
          </div>
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-start justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800/60 gap-3">
              <div>
                <span className="text-slate-400 text-[11px] block uppercase font-medium mb-0.5">
                  Format Video Utama
                </span>
                <span className="text-slate-200 font-medium">{strategy.platformStrategy.recommendedRatio}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Optimal
              </span>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60">
              <span className="text-slate-400 text-[11px] block uppercase font-medium mb-0.5">
                Critical Hook Window
              </span>
              <span className="text-amber-400 font-semibold">{strategy.platformStrategy.hookWindowSeconds}</span>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60">
              <span className="text-slate-400 text-[11px] block uppercase font-medium mb-0.5">
                Alokasi Budget & Testing Strategy
              </span>
              <p className="text-slate-300 text-xs mt-1">{strategy.platformStrategy.targetBudgetTips}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
