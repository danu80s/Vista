import React, { useState } from 'react';
import { Film, Mic, Eye, Music, Type, Copy, Check, PlayCircle, Video, MessageCircle, User, Shirt, Smile, Move } from 'lucide-react';
import { StoryboardScene } from '../types';
import { openWhatsAppShare } from '../utils/share';

interface StoryboardViewProps {
  storyboard: StoryboardScene[];
  brandName: string;
  onOpenTeleprompter: () => void;
}

export const StoryboardView: React.FC<StoryboardViewProps> = ({
  storyboard,
  brandName,
  onOpenTeleprompter,
}) => {
  const [copiedScene, setCopiedScene] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | number>('all');

  const handleCopyScene = (scene: StoryboardScene) => {
    const text = `[${scene.sceneTitle} (${scene.timing})]
KARAKTER TALENT:
- Profil: ${scene.talentCharacter?.gender || 'Pria/Wanita'}, ${scene.talentCharacter?.ageRange || '25-32 thn'}
- Pakaian/Style: ${scene.talentCharacter?.attireStyle || '-'}
- Ekspresi Wajah: ${scene.talentCharacter?.facialExpression || '-'}
- Gestur & Interaksi: ${scene.talentCharacter?.bodyGesture || '-'}

VISUAL: ${scene.visualDirection}
DIALOG (Gaya Podcast): ${scene.dialogueScript}
AUDIO / SFX: ${scene.audioSfxBgm}
TEXT ON SCREEN: ${scene.textOnScreen}
AI VIDEO PROMPT: ${scene.aiVideoPrompt}`;

    navigator.clipboard.writeText(text);
    setCopiedScene(scene.sceneNumber);
    setTimeout(() => setCopiedScene(null), 2000);
  };

  const handleShareSceneWhatsApp = (scene: StoryboardScene) => {
    const text = `*🎬 NASKAH IKLAN: SCENE ${scene.sceneNumber} (${scene.timing})*
*Brand:* ${brandName}
*Judul:* ${scene.sceneTitle}

🎭 *Karakter Talent:*
• *Profil:* ${scene.talentCharacter?.gender || 'Pria/Wanita'} (${scene.talentCharacter?.ageRange || '25-32 thn'})
• *Style/Pakaian:* ${scene.talentCharacter?.attireStyle || '-'}
• *Ekspresi:* ${scene.talentCharacter?.facialExpression || '-'}
• *Gestur & Interaksi:* ${scene.talentCharacter?.bodyGesture || '-'}

🎙️ *Dialog (Gaya Podcast/Prolog):*
"${scene.dialogueScript}"

👀 *Visual Direction:*
${scene.visualDirection}

📱 *Text on Screen:*
${scene.textOnScreen}

🎵 *Audio/SFX:* ${scene.audioSfxBgm}
🤖 *AI Video Prompt:* ${scene.aiVideoPrompt}

_Dibuat dengan VISTA (Visual Intelligence Storytelling & Transformation Architecture)_`;
    openWhatsAppShare(text);
  };

  const handleShareAllStoryboardWhatsApp = () => {
    const formattedScenes = storyboard.map((s) => (
`*SCENE ${s.sceneNumber}: ${s.sceneTitle} (${s.timing})*
🎭 *Talent:* ${s.talentCharacter?.gender || 'Pria/Wanita'} (${s.talentCharacter?.ageRange || '25-32 thn'}) | Outfit: ${s.talentCharacter?.attireStyle || '-'}
😊 *Ekspresi & Gestur:* ${s.talentCharacter?.facialExpression || '-'} | ${s.talentCharacter?.bodyGesture || '-'}
🎙️ *Dialog:* "${s.dialogueScript}"
👀 *Visual:* ${s.visualDirection}
📱 *TOS:* ${s.textOnScreen}
`
    )).join('\n---\n\n');

    const text = `*🎬 7-SCENE STORYBOARD (LENGKAP DETAIL KARAKTER TALENT)*
*Brand:* ${brandName}

${formattedScenes}
_Dibuat dengan VISTA (Visual Intelligence Storytelling & Transformation Architecture)_`;
    openWhatsAppShare(text);
  };

  const filteredScenes = activeFilter === 'all'
    ? storyboard
    : storyboard.filter((s) => s.sceneNumber === activeFilter);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Film className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Storyboard 7 Scene (Dialog Gaya Podcast)
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  7 Scenes Lengkap
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Naskah bercerita, visual b-roll, audio SFX, dan overlay teks untuk <span className="text-amber-300 font-semibold">{brandName}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleShareAllStoryboardWhatsApp}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
            title="Bagikan seluruh 7 naskah scene ke WhatsApp tim/talent"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Bagikan ke WA</span>
          </button>

          <button
            type="button"
            onClick={onOpenTeleprompter}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 transition-all shadow-md shadow-amber-500/10 cursor-pointer"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Mode Baca Teleprompter</span>
          </button>
        </div>
      </div>

      {/* Quick Scene Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
            activeFilter === 'all'
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          Semua Scene (1-7)
        </button>
        {storyboard.map((scene) => (
          <button
            key={scene.sceneNumber}
            type="button"
            onClick={() => setActiveFilter(scene.sceneNumber)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
              activeFilter === scene.sceneNumber
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Scene {scene.sceneNumber} ({scene.timing})
          </button>
        ))}
      </div>

      {/* Scene Cards Stack */}
      <div className="space-y-5">
        {filteredScenes.map((scene) => (
          <div
            key={scene.sceneNumber}
            className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden transition-all shadow-lg"
          >
            {/* Scene Header */}
            <div className="px-5 py-3.5 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-black flex items-center justify-center">
                  #{scene.sceneNumber}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">{scene.sceneTitle}</h3>
                  <span className="text-[11px] text-amber-400/90 font-mono">
                    Durasi: {scene.timing}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleShareSceneWhatsApp(scene)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] bg-emerald-700/60 hover:bg-emerald-600 text-emerald-100 border border-emerald-600/60 transition-colors cursor-pointer"
                  title="Bagikan naskah scene ini ke WhatsApp"
                >
                  <MessageCircle className="w-3 h-3 fill-current" />
                  <span className="hidden sm:inline">Kirim ke WA</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyScene(scene)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                  title="Salin scene ini"
                >
                  {copiedScene === scene.sceneNumber ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>Salin Scene</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Scene Body */}
            <div className="p-5 space-y-4">
              {/* Dedicated Karakter Talent Detail Box (WAJIB: Profil, Style, Ekspresi & Gestur) */}
              {scene.talentCharacter && (
                <div className="bg-gradient-to-r from-indigo-950/40 via-slate-950 to-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-indigo-300" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-indigo-300 tracking-wide uppercase">
                          Karakter Talent & Detail Aktor
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          Visualisasi profil pemeran di Scene {scene.sceneNumber}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-500/25 text-indigo-200 border border-indigo-500/40">
                        {scene.talentCharacter.gender}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        Perkiraan Usia: {scene.talentCharacter.ageRange}
                      </span>
                    </div>
                  </div>

                  {/* 3 Detail Boxes: Pakaian, Ekspresi, Gestur Interaksi */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Pakaian / Style */}
                    <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800/90 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                        <Shirt className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="uppercase tracking-wider text-[10px] text-cyan-300">Pakaian / Style</span>
                      </div>
                      <p className="text-slate-200 leading-relaxed">
                        {scene.talentCharacter.attireStyle}
                      </p>
                    </div>

                    {/* Ekspresi Wajah */}
                    <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800/90 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                        <Smile className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="uppercase tracking-wider text-[10px] text-amber-300">Ekspresi Wajah</span>
                      </div>
                      <p className="text-slate-200 leading-relaxed">
                        {scene.talentCharacter.facialExpression}
                      </p>
                    </div>

                    {/* Gestur Tubuh & Interaksi Kamera/Produk */}
                    <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800/90 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                        <Move className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="uppercase tracking-wider text-[10px] text-emerald-300">Gestur & Interaksi</span>
                      </div>
                      <p className="text-slate-200 leading-relaxed">
                        {scene.talentCharacter.bodyGesture}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid 2 Columns: Dialogue & Directions */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Left Column: Dialogue & Text on Screen (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Dialogue Box (Gaya Prolog/Podcast) */}
                  <div className="bg-gradient-to-br from-amber-500/5 via-slate-950 to-slate-950 p-4 rounded-xl border border-amber-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                        <Mic className="w-3.5 h-3.5" />
                        Naskah Dialog (Gaya Prolog / Podcast)
                      </span>
                      <span className="text-[10px] text-slate-500">Conversational Indonesian</span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans italic whitespace-pre-line">
                      {scene.dialogueScript}
                    </p>
                  </div>

                  {/* Text on Screen (TOS) */}
                  <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                      <Type className="w-3.5 h-3.5 text-sky-400" />
                      <span>Text on Screen / Graphic Overlay</span>
                    </div>
                    <div className="px-3 py-2 bg-slate-900 rounded-lg border border-slate-800/80 text-xs sm:text-sm font-semibold text-amber-300 font-mono">
                      {scene.textOnScreen}
                    </div>
                  </div>
                </div>

                {/* Right Column: Visual Direction, Audio & AI Prompt (5 cols) */}
                <div className="lg:col-span-5 space-y-3.5">
                  {/* Visual Direction */}
                  <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Arahan Visual & Kamera</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{scene.visualDirection}</p>
                  </div>

                  {/* Audio SFX & BGM */}
                  <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                      <Music className="w-3.5 h-3.5 text-purple-400" />
                      <span>Audio / SFX & BGM</span>
                    </div>
                    <p className="text-purple-200/90 leading-relaxed">{scene.audioSfxBgm}</p>
                  </div>

                  {/* AI Video Prompt */}
                  <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-300 uppercase tracking-wider">
                        <Video className="w-3.5 h-3.5 text-amber-400" />
                        <span>AI Video Prompt (Runway/Sora)</span>
                      </div>
                    </div>
                    <p className="text-slate-400 font-mono text-[11px] bg-slate-900 p-2.5 rounded-lg border border-slate-800 leading-relaxed break-words">
                      {scene.aiVideoPrompt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
