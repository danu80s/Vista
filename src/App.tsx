import React, { useState } from 'react';
import { Header } from './components/Header';
import { BusinessForm } from './components/BusinessForm';
import { StrategyView } from './components/StrategyView';
import { StoryboardView } from './components/StoryboardView';
import { VideoPromptsView } from './components/VideoPromptsView';
import { CaptionsView } from './components/CaptionsView';
import { HooksView } from './components/HooksView';
import { TeleprompterModal } from './components/TeleprompterModal';
import { BusinessInput, FullCampaignResult } from './types';
import { PRESET_BUSINESSES } from './data/presets';
import {
  Film,
  Compass,
  Video,
  PenSquare,
  Anchor,
  Sparkles,
  Download,
  AlertCircle,
  PlayCircle
} from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState<BusinessInput>(PRESET_BUSINESSES[0].data);
  const [campaignResult, setCampaignResult] = useState<FullCampaignResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'storyboard' | 'strategy' | 'videoprompts' | 'captions' | 'hooks'>('storyboard');
  const [isTeleprompterOpen, setIsTeleprompterOpen] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  React.useEffect(() => {
    // Generate initial campaign for Syagha Body Repair on first load
    handleGenerate();
  }, []);

  const handleGenerate = async (customData?: BusinessInput) => {
    const dataToSend = customData || formData;
    setIsLoading(true);
    setErrorMessage(null);

    try {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
  });

  const responseText = await response.text();
  let resultData;
  
  try {
    resultData = JSON.parse(responseText);
  } catch (e) {
    throw new Error(`Server error: ${responseText.substring(0, 100)}`);
  }

  if (!response.ok) {
    throw new Error(resultData.error || 'Terjadi kesalahan pada server.');
  }

  setCampaignResult(resultData);
} catch (err) {
  console.error('Generation error:', err);
  setErrorMessage(err.message || 'Terjadi kesalahan sistem.');
} finally {
  setIsLoading(false);
  }
    }
  };

  const handleExportMarkdown = () => {
    if (!campaignResult) return;

    const md = `# VISTA (Visual Intelligence Storytelling & Transformation Architecture) — CAMPAIGN & STORYBOARD BRIEF
**Brand:** ${campaignResult.businessInput.brandName}
**Kategori:** ${campaignResult.businessInput.category}
**Tanggal Dibuat:** ${new Date(campaignResult.createdAt).toLocaleDateString('id-ID')}

---

## 1. STRATEGI IKLAN & POSITIONING
- **Brand Positioning:** ${campaignResult.strategy.brandPositioning}
- **The Big Idea / Angle:** ${campaignResult.strategy.coreAngle}
- **Value Proposition:** ${campaignResult.strategy.valueProposition}
- **Tone Guidelines:** ${campaignResult.strategy.toneGuidelines}
- **Demografi:** ${campaignResult.strategy.targetPersonaDetail.demographics}
- **Psikografi:** ${campaignResult.strategy.targetPersonaDetail.psychographics}
- **Core Pain Point:** ${campaignResult.strategy.targetPersonaDetail.corePainPoint}
- **Hidden Desire:** ${campaignResult.strategy.targetPersonaDetail.hiddenDesire}

---

## 2. STORYBOARD 7 SCENE (DIALOG GAYA PODCAST & DETAIL KARAKTER TALENT)
${campaignResult.storyboard
  .map(
    (s) => `### ${s.sceneTitle} (${s.timing})
- **Karakter Talent:**
  - Profil: ${s.talentCharacter?.gender || 'Pria/Wanita'} (${s.talentCharacter?.ageRange || '25-32 tahun'})
  - Pakaian / Style: ${s.talentCharacter?.attireStyle || '-'}
  - Ekspresi Wajah: ${s.talentCharacter?.facialExpression || '-'}
  - Gestur Tubuh & Interaksi: ${s.talentCharacter?.bodyGesture || '-'}
- **Visual Direction:** ${s.visualDirection}
- **Dialog Naskah (Podcast):** ${s.dialogueScript}
- **Audio / SFX & BGM:** ${s.audioSfxBgm}
- **Text on Screen:** ${s.textOnScreen}
- **AI Video Prompt:** ${s.aiVideoPrompt}
`
  )
  .join('\n')}

---

## 3. PROMPT VIDEO AI
**Master Prompt:**
\`\`\`
${campaignResult.videoPrompts.masterPrompt}
\`\`\`

**Scene Prompts:**
${campaignResult.videoPrompts.scenePrompts
  .map((p) => `- **Scene ${p.sceneNumber} (${p.title}):** ${p.prompt} (Kamera: ${p.cameraMovement})`)
  .join('\n')}

---

## 4. CAPTION MEDIA SOSIAL

### A. TikTok & Reels:
${campaignResult.captions.tiktokReels.hook}

${campaignResult.captions.tiktokReels.body}

${campaignResult.captions.tiktokReels.cta}
${campaignResult.captions.tiktokReels.hashtags.join(' ')}

### B. Instagram Feed / Carousel:
${campaignResult.captions.instagramFeed.hook}

${campaignResult.captions.instagramFeed.body}

Struktur Carousel: ${campaignResult.captions.instagramFeed.carouselNotes}
${campaignResult.captions.instagramFeed.cta}
${campaignResult.captions.instagramFeed.hashtags.join(' ')}

### C. Meta Ads Copy:
**Primary Text:**
${campaignResult.captions.metaAdsCopy.primaryText}

**Headline:** ${campaignResult.captions.metaAdsCopy.headline}
**Description:** ${campaignResult.captions.metaAdsCopy.description}
**CTA Button:** ${campaignResult.captions.metaAdsCopy.ctaButton}

---

## 5. 10 HOOK GENERATOR (RETENSI TINGGI)
${campaignResult.hooks
  .map((h, i) => `${i + 1}. [${h.formula}] (${h.retentionTier})\n"${h.hookText}"\nTips Delivery: ${h.deliveryTip}\n`)
  .join('\n')}
`;

    navigator.clipboard.writeText(md);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header
        onExportMarkdown={handleExportMarkdown}
        onPrint={handlePrint}
        hasResult={Boolean(campaignResult)}
        copiedAll={copiedAll}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Intro Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-950 border border-amber-500/20 p-6 sm:p-8">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Creative Director AI untuk Kampanye Video & Iklan Berkonversi</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Selamat datang di <span className="text-amber-400">VISTA</span> (Visual Intelligence Storytelling & Transformation Architecture).
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Saya siap membuatkan <strong>strategi iklan</strong>, <strong>storyboard 7 scene</strong> lengkap dengan naskah dialog gaya prolog/podcast yang natural, <strong>prompt video AI</strong> (Sora, Runway, Kling), <strong>caption medsos</strong> multi-platform, serta <strong>10 hook generator</strong> teruji berdasarkan input bisnis Anda.
            </p>
          </div>

          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Input Form Section */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Langkah 1: Masukkan Data Bisnis Anda</span>
            </h2>
            <span className="text-xs text-slate-400">
              Isi formulir atau pilih contoh instan di bawah
            </span>
          </div>

          <BusinessForm
            formData={formData}
            onChange={setFormData}
            onSubmit={handleGenerate}
            isLoading={isLoading}
          />
        </section>

        {/* Error message alert */}
        {errorMessage && (
          <div className="p-4 bg-rose-950/40 border border-rose-800 rounded-xl flex items-center gap-3 text-sm text-rose-300">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Results Section */}
        {campaignResult ? (
          <section className="space-y-6 pt-4" id="results-section">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Hasil Generasi VISTA
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Paket Iklan: {campaignResult.businessInput.brandName}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsTeleprompterOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Mode Latihan Teleprompter</span>
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800/80 overflow-x-auto pb-1 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveTab('storyboard')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'storyboard'
                    ? 'border-amber-400 text-amber-300 bg-amber-500/10 rounded-t-xl'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Film className="w-4 h-4" />
                <span>🎬 Storyboard 7 Scene (Dialog Podcast)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('strategy')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'strategy'
                    ? 'border-amber-400 text-amber-300 bg-amber-500/10 rounded-t-xl'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>📑 Strategi Iklan & Persona</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('videoprompts')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'videoprompts'
                    ? 'border-amber-400 text-amber-300 bg-amber-500/10 rounded-t-xl'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>🎥 Prompt Video AI (Runway/Sora)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('captions')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'captions'
                    ? 'border-amber-400 text-amber-300 bg-amber-500/10 rounded-t-xl'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <PenSquare className="w-4 h-4" />
                <span>✍️ Caption Medsos & Ads</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('hooks')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'hooks'
                    ? 'border-amber-400 text-amber-300 bg-amber-500/10 rounded-t-xl'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Anchor className="w-4 h-4" />
                <span>🎣 10 Hook Generator</span>
              </button>
            </div>

            {/* Active Tab View */}
            <div className="pt-2">
              {activeTab === 'storyboard' && (
                <StoryboardView
                  storyboard={campaignResult.storyboard}
                  brandName={campaignResult.businessInput.brandName}
                  onOpenTeleprompter={() => setIsTeleprompterOpen(true)}
                />
              )}

              {activeTab === 'strategy' && (
                <StrategyView
                  strategy={campaignResult.strategy}
                  businessInput={campaignResult.businessInput}
                />
              )}

              {activeTab === 'videoprompts' && (
                <VideoPromptsView
                  videoPrompts={campaignResult.videoPrompts}
                  brandName={campaignResult.businessInput.brandName}
                />
              )}

              {activeTab === 'captions' && (
                <CaptionsView
                  captions={campaignResult.captions}
                  brandName={campaignResult.businessInput.brandName}
                />
              )}

              {activeTab === 'hooks' && (
                <HooksView
                  hooks={campaignResult.hooks}
                  brandName={campaignResult.businessInput.brandName}
                />
              )}
            </div>
          </section>
        ) : (
          /* Empty placeholder guidance */
          <div className="border border-dashed border-slate-800 rounded-2xl p-8 sm:p-12 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Film className="w-6 h-6" />
            </div>
            <div className="max-w-md mx-auto">
              <h3 className="text-base font-bold text-white mb-1">
                Belum ada kampanye yang dibuat
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pilih salah satu contoh bisnis siap pakai di atas atau isi data brand Anda sendiri, lalu tekan tombol <strong>"Buat Strategi Iklan, 7 Scene Storyboard & 10 Hooks Sekarang"</strong>.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Teleprompter Modal */}
      {campaignResult && (
        <TeleprompterModal
          isOpen={isTeleprompterOpen}
          onClose={() => setIsTeleprompterOpen(false)}
          storyboard={campaignResult.storyboard}
          brandName={campaignResult.businessInput.brandName}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <p>
          VISTA (Visual Intelligence Storytelling & Transformation Architecture) • Dedicated Creative Strategy & 7-Scene Video Storyboard Engine
        </p>
      </footer>
    </div>
  );
}
