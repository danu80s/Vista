import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, Maximize2, Minimize2, Mic, MessageCircle } from 'lucide-react';
import { StoryboardScene } from '../types';
import { openWhatsAppShare } from '../utils/share';

interface TeleprompterModalProps {
  isOpen: boolean;
  onClose: () => void;
  storyboard: StoryboardScene[];
  brandName: string;
}

export const TeleprompterModal: React.FC<TeleprompterModalProps> = ({
  isOpen,
  onClose,
  storyboard,
  brandName,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(2); // 1 to 5
  const [fontSize, setFontSize] = useState(28); // px
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleShareTeleprompterWhatsApp = () => {
    const dialogLines = storyboard
      .map((s) => (
`*Scene ${s.sceneNumber} (${s.timing}):*
🎭 *Talent:* ${s.talentCharacter?.gender || 'Pria/Wanita'} (${s.talentCharacter?.ageRange || '25-32 thn'}) | Outfit: ${s.talentCharacter?.attireStyle || '-'}
😊 *Ekspresi:* ${s.talentCharacter?.facialExpression || '-'}
👉 *Gestur:* ${s.talentCharacter?.bodyGesture || '-'}
🎙️ *Dialog:*
"${s.dialogueScript}"
`
      ))
      .join('\n');

    const text = `*🎙️ NASKAH TELEPROMPTER TALENT: ${brandName}*
*Format:* Dialog Gaya Podcast/Prolog UGC (7 Scenes Lengkap Karakter Talent)

${dialogLines}
_Dibuat dengan VISTA (Visual Intelligence Storytelling & Transformation Architecture)_`;
    openWhatsAppShare(text);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setSecondsElapsed(0);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
  }, [isOpen]);

  // Timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  // Smooth scroll
  useEffect(() => {
    let animationId: number;
    const scrollContainer = scrollRef.current;

    const scrollLoop = () => {
      if (isPlaying && scrollContainer) {
        scrollContainer.scrollTop += speed * 0.8;
      }
      animationId = requestAnimationFrame(scrollLoop);
    };

    if (isPlaying) {
      animationId = requestAnimationFrame(scrollLoop);
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying, speed]);

  const handleReset = () => {
    setIsPlaying(false);
    setSecondsElapsed(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col transition-all ${
        isFullscreen ? 'p-0' : 'p-3 sm:p-6'
      }`}
    >
      <div className="max-w-5xl w-full mx-auto flex-1 flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Teleprompter Top Bar */}
        <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
              <Mic className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Teleprompter Naskah Dialog Podcast ({brandName})
              </h3>
              <span className="text-[11px] text-slate-400">
                Latihan membaca naskah 7 scene dengan intonasi natural
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Timer display */}
            <div className="font-mono text-sm font-bold px-3 py-1 bg-slate-950 rounded-lg border border-slate-800 text-amber-400">
              ⏱️ {formatTime(secondsElapsed)}
            </div>

            {/* Play/Pause */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Jeda</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Mulai Scroll</span>
                </>
              )}
            </button>

            {/* Reset */}
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Reset ke awal"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Speed slider */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300">
              <span className="text-[10px] text-slate-400">Speed:</span>
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-16 accent-amber-400"
              />
              <span className="font-mono text-xs w-5">{speed}x</span>
            </div>

            {/* Font size */}
            <div className="hidden sm:flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setFontSize((s) => Math.max(18, s - 3))}
                className="w-6 h-6 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center justify-center font-bold"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSize((s) => Math.min(48, s + 3))}
                className="w-6 h-6 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center justify-center font-bold"
              >
                A+
              </button>
            </div>

            {/* Share to WhatsApp */}
            <button
              type="button"
              onClick={handleShareTeleprompterWhatsApp}
              className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
              title="Kirim naskah dialog teleprompter ke WhatsApp talent"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </button>

            {/* Fullscreen toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/80 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrolling Prompt Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-6 sm:px-16 py-12 scrollbar-none select-none text-center"
        >
          <div className="max-w-3xl mx-auto space-y-16 pb-48">
            <div className="text-slate-500 text-xs uppercase tracking-widest font-mono">
              --- MULAI REKAMAN PROLOG / PODCAST ---
            </div>

            {storyboard.map((scene) => (
              <div key={scene.sceneNumber} className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                  <span>Scene {scene.sceneNumber}: {scene.sceneTitle}</span>
                  <span>•</span>
                  <span>{scene.timing}</span>
                </div>

                {scene.talentCharacter && (
                  <div className="text-[11px] text-indigo-300 bg-indigo-950/40 border border-indigo-500/30 px-3.5 py-2 rounded-xl max-w-xl mx-auto flex flex-wrap items-center justify-center gap-2">
                    <span className="font-semibold text-indigo-200">🎭 {scene.talentCharacter.gender} ({scene.talentCharacter.ageRange})</span>
                    <span>•</span>
                    <span className="text-slate-300">Outfit: {scene.talentCharacter.attireStyle}</span>
                    <span>•</span>
                    <span className="text-amber-300">Ekspresi: {scene.talentCharacter.facialExpression}</span>
                  </div>
                )}

                <div
                  style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
                  className="font-bold text-white tracking-wide whitespace-pre-line"
                >
                  {scene.dialogueScript}
                </div>

                <div className="text-xs font-mono text-slate-400 bg-slate-900/60 p-2 rounded-lg max-w-md mx-auto">
                  TOS: {scene.textOnScreen}
                </div>
              </div>
            ))}

            <div className="text-slate-500 text-xs uppercase tracking-widest font-mono">
              --- AKHIR DARI NASKAH 7 SCENE ---
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
