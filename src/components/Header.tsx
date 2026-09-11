import React from 'react';
import { Sparkles, Video, Copy, Printer, Check, MessageCircle } from 'lucide-react';

interface HeaderProps {
  onExportMarkdown?: () => void;
  onPrint?: () => void;
  onShareWhatsApp?: () => void;
  hasResult: boolean;
  copiedAll: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onExportMarkdown,
  onPrint,
  onShareWhatsApp,
  hasResult,
  copiedAll,
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
            <Video className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-lg text-white font-serif">
                VISTA<span className="text-amber-400">.AI</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                <Sparkles className="w-2.5 h-2.5" /> Ad Director
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Visual Intelligence Storytelling & Transformation Architecture
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasResult && (
            <>
              <button
                type="button"
                onClick={onShareWhatsApp}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-sm cursor-pointer"
                title="Bagikan ringkasan brief lengkap kampanye ke WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Bagikan ke WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={onExportMarkdown}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-colors shadow-sm cursor-pointer"
                title="Salin semua naskah & strategi ke clipboard"
              >
                {copiedAll ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Salin Semua</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onPrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-colors shadow-sm"
                title="Cetak atau simpan ke PDF"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Cetak / PDF</span>
              </button>
            </>
          )}

          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI Ready</span>
          </div>
        </div>
      </div>
    </header>
  );
};
