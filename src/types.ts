export interface BusinessInput {
  brandName: string;
  category: string;
  productDescription: string;
  targetAudience: string;
  mainProblem: string;
  usp: string;
  offerCta: string;
  toneOfVoice: string;
  platform: string;
}

export interface AdStrategy {
  brandPositioning: string;
  targetPersonaDetail: {
    demographics: string;
    psychographics: string;
    corePainPoint: string;
    hiddenDesire: string;
  };
  coreAngle: string;
  valueProposition: string;
  toneGuidelines: string;
  platformStrategy: {
    recommendedRatio: string;
    hookWindowSeconds: string;
    targetBudgetTips: string;
  };
}

export interface TalentCharacterDetail {
  gender: string; // Jenis kelamin
  ageRange: string; // Perkiraan usia
  attireStyle: string; // Pakaian / style
  facialExpression: string; // Ekspresi wajah
  bodyGesture: string; // Gestur tubuh saat berinteraksi dengan produk/kamera
}

export interface StoryboardScene {
  sceneNumber: number;
  sceneTitle: string;
  timing: string;
  talentCharacter: TalentCharacterDetail;
  visualDirection: string;
  dialogueScript: string;
  audioSfxBgm: string;
  textOnScreen: string;
  aiVideoPrompt: string;
}

export interface VideoPromptsCollection {
  masterPrompt: string;
  stylePreset: string;
  scenePrompts: Array<{
    sceneNumber: number;
    title: string;
    prompt: string;
    cameraMovement: string;
  }>;
}

export interface SocialCaptions {
  tiktokReels: {
    hook: string;
    body: string;
    cta: string;
    hashtags: string[];
  };
  instagramFeed: {
    hook: string;
    body: string;
    carouselNotes: string;
    cta: string;
    hashtags: string[];
  };
  metaAdsCopy: {
    primaryText: string;
    headline: string;
    description: string;
    ctaButton: string;
  };
}

export interface HookItem {
  id: number;
  formula: string;
  hookText: string;
  deliveryTip: string;
  retentionTier: string;
}

export interface FullCampaignResult {
  id: string;
  createdAt: string;
  businessInput: BusinessInput;
  strategy: AdStrategy;
  storyboard: StoryboardScene[];
  videoPrompts: VideoPromptsCollection;
  captions: SocialCaptions;
  hooks: HookItem[];
}
