import React, { useState } from 'react';
import { Video, Copy, Check, Sparkles, Sliders, Clapperboard, MessageCircle } from 'lucide-react';
import { VideoPromptsCollection } from '../types';
import { openWhatsAppShare } from '../utils/share';

interface VideoPromptsViewProps {
  videoPrompts: VideoPromptsCollection;
  brandName: string;
}

export const VideoPromptsView: React.FC<VideoPromptsViewProps> = ({
  videoPrompts,
  brandName,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | 'master' | null>(null);

  const handleCopy = (text: string, index: number | 'master') => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleShareAllPromptsWhatsApp = () => {
    const sceneText = videoPrompts.scenePrompts
      .map((p) => `*Scene ${p.sceneNumber} (${p.title}):*\n\`\`\`${p.prompt}\`\`\`\n🎥 Gerakan Kamera: ${p.cameraMovement}\n`)
      .join('\n');

    const text = `*🎥 PROMPT VIDEO AI (SORA / RUNWAY / KLING)*
*Brand:* ${brandName}
*Style Preset:* ${videoPrompts.stylePreset}

🎬 *Master Prompt:*
\`\`\`
${videoPrompts.masterPrompt}
\`\`\`

---
*PROMPT PER SCENE:*
${sceneText}
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
              <Clapperboard className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Prompt Video AI Siap Pakai
              </h2>
              <p className="text-xs text-slate-400">
                Dioptimalkan untuk Runway Gen-3 Alpha, OpenAI Sora, Kling AI, Luma Dream Machine & Midjourney v6
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleShareAllPromptsWhatsApp}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
            title="Bagikan semua prompt video AI ke WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Bagikan ke WA</span>
          </button>

          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-amber-300 border border-slate-700">
            {videoPrompts.stylePreset || 'Cinematic 4K 9:16'}
          </span>
        </div>
      </div>

      {/* Master Video Prompt Card */}
      <div className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Master Video Prompt (Style & Grading Consistency)</span>
          </div>
          <button
            type="button"
            onClick={() => handleCopy(videoPrompts.masterPrompt, 'master')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-sm cursor-pointer"
          >
            {copiedIndex === 'master' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Master Prompt</span>
              </>
            )}
          </button>
        </div>

        <p className="text-sm font-mono text-slate-200 bg-slate-950/80 p-4 rounded-xl border border-slate-800 leading-relaxed break-words">
          {videoPrompts.masterPrompt}
        </p>

        <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-400">
          <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">Aspect Ratio: 9:16 (Vertical)</span>
          <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">Lighting: Soft Studio Bokeh</span>
          <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">Lens: 35mm / 50mm Prime</span>
          <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">Brand: {brandName}</span>
        </div>
      </div>

      {/* Scene-by-scene AI Prompts */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <Video className="w-4 h-4 text-sky-400" />
          <span>Prompt Video Per-Scene (1 s/d 7)</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {videoPrompts.scenePrompts.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-slate-800 text-amber-300 font-bold text-xs flex items-center justify-center">
                    {item.sceneNumber || idx + 1}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{item.title}</h4>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(item.prompt, idx)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>Salin Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs font-mono text-slate-300 bg-slate-950/70 p-3 rounded-lg border border-slate-800/80 leading-relaxed break-words">
                {item.prompt}
              </p>

              {item.cameraMovement && (
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-amber-400/90 font-medium">
                  <Sliders className="w-3 h-3" />
                  <span>Gerakan Kamera: {item.cameraMovement}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
