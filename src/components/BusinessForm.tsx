import React, { useState } from 'react';
import { Sparkles, ArrowRight, Wand2, RefreshCw, Layers, SlidersHorizontal } from 'lucide-react';
import { BusinessInput } from '../types';
import { PRESET_BUSINESSES, PresetBusiness } from '../data/presets';

interface BusinessFormProps {
  formData: BusinessInput;
  onChange: (data: BusinessInput) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const BusinessForm: React.FC<BusinessFormProps> = ({
  formData,
  onChange,
  onSubmit,
  isLoading,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...formData,
      [name]: value,
    });
  };

  const applyPreset = (preset: PresetBusiness) => {
    onChange(preset.data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.brandName.trim()) {
      alert('Mohon masukkan Nama Brand/Bisnis terlebih dahulu.');
      return;
    }
    onSubmit();
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl backdrop-blur-sm">
      {/* Preset bar */}
      <div className="mb-6 pb-5 border-b border-slate-800/80">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            Pilih Contoh Bisnis Siap Pakai (1-Klik):
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Klik salah satu untuk mencoba langsung
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_BUSINESSES.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-2 ${
                formData.brandName === preset.data.brandName
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-medium'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700/80 hover:border-slate-600'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{preset.name}</span>
              <span className="text-[10px] text-slate-400 opacity-80">({preset.badge})</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Brand Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="brandName">
              Nama Bisnis / Brand <span className="text-amber-400">*</span>
            </label>
            <input
              id="brandName"
              name="brandName"
              type="text"
              required
              value={formData.brandName}
              onChange={handleInputChange}
              placeholder="Contoh: Kopi Seduhjiwa, Lumina Skincare, dsb."
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="category">
              Kategori Industri & Produk
            </label>
            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Contoh: F&B Kafe, Skincare, B2B SaaS, Fashion"
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
          </div>
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="productDescription">
            Deskripsi Produk / Layanan Utama <span className="text-amber-400">*</span>
          </label>
          <textarea
            id="productDescription"
            name="productDescription"
            rows={2}
            value={formData.productDescription}
            onChange={handleInputChange}
            placeholder="Jelaskan apa yang dijual, bagaimana cara kerjanya, dan nilai yang ditawarkan..."
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Main Problem / Pain Point */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="mainProblem">
              Masalah Utama Konsumen (Pain Point) <span className="text-amber-400">*</span>
            </label>
            <textarea
              id="mainProblem"
              name="mainProblem"
              rows={2}
              value={formData.mainProblem}
              onChange={handleInputChange}
              placeholder="Apa hal yang bikin mereka frustasi atau lelah? (misal: maag kambuh kalau minum kopi biasa)"
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all resize-none"
            />
          </div>

          {/* USP */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="usp">
              Unique Selling Proposition (Keunggulan Unik) <span className="text-amber-400">*</span>
            </label>
            <textarea
              id="usp"
              name="usp"
              rows={2}
              value={formData.usp}
              onChange={handleInputChange}
              placeholder="Apa yang membedakan produk Anda dari kompetitor? (misal: 100% Arabika Flores + Oatmilk organik)"
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all resize-none"
            />
          </div>
        </div>

        {/* Offer / CTA & Target Audience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="offerCta">
              Penawaran / Promo / CTA
            </label>
            <input
              id="offerCta"
              name="offerCta"
              type="text"
              value={formData.offerCta}
              onChange={handleInputChange}
              placeholder="Contoh: Diskon 30% + Free Ongkir, Beli 2 Gratis 1, dsb."
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="targetAudience">
              Target Audiens
            </label>
            <input
              id="targetAudience"
              name="targetAudience"
              type="text"
              value={formData.targetAudience}
              onChange={handleInputChange}
              placeholder="Contoh: Pekerja kantoran 22-35 tahun yang aktif di TikTok"
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
          </div>
        </div>

        {/* Toggle Advanced */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-amber-300 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showAdvanced ? 'Sembunyikan Opsi Gaya & Platform' : 'Pengaturan Gaya Bahasa & Platform (+)'}</span>
          </button>
        </div>

        {showAdvanced && (
          <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="toneOfVoice">
                Gaya Bahasa / Tone of Voice
              </label>
              <select
                id="toneOfVoice"
                name="toneOfVoice"
                value={formData.toneOfVoice}
                onChange={handleInputChange}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
              >
                <option value="Santai & Akrab ala Podcast (warm, candid, seperti ngobrol sama sahabat di studio)">
                  🎙️ Santai & Akrab ala Podcast (Warm, Candid, Monolog Bersahabat)
                </option>
                <option value="Empatik & Edukatif (mengupas masalah dengan fakta dan simpati mendalam)">
                  💡 Empatik & Edukatif (Berdasarkan Solusi & Fakta)
                </option>
                <option value="Inspiratif & Memotivasi (mengangkat semangat audiens untuk bertindak)">
                  🔥 Inspiratif & Memotivasi (Storytelling Transformatif)
                </option>
                <option value="Otoritatif & Profesional (berwibawa, tajam, cocok untuk B2B dan jasa)">
                  👔 Otoritatif & Profesional (Tajam & Berbobot)
                </option>
                <option value="Lucu, Sarkas & Relatable (menghibur, sindiran halus kehidupan sehari-hari)">
                  😂 Lucu & Relatable (Humor Keseharian)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="platform">
                Platform Utama Iklan
              </label>
              <select
                id="platform"
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
              >
                <option value="TikTok & Instagram Reels (9:16 Vertical Video)">
                  📱 TikTok & Instagram Reels (9:16 Vertical Storyboard)
                </option>
                <option value="Meta Video Ads (Facebook & Instagram Feed/Stories)">
                  🎯 Meta Video Ads (Direct Response Ads)
                </option>
                <option value="YouTube Shorts & TrueView Video">
                  ▶️ YouTube Shorts & Video Ads
                </option>
                <option value="Omni-Channel (TikTok, Reels, Feed, Ads)">
                  🌐 Multi-Platform (Omni-Channel)
                </option>
              </select>
            </div>
          </div>
        )}

        {/* Submit button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 transition-all duration-200 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>VISTA Sedang Merumuskan Strategi & Storyboard...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Buat Strategi Iklan, 7 Scene Storyboard & 10 Hooks Sekarang</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-500 mt-2">
            Menghasilkan: Strategi Iklan • 7 Scene Dialog Podcast • AI Video Prompts • Caption Medsos • 10 Hook Generator
          </p>
        </div>
      </form>
    </div>
  );
};
