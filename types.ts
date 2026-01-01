
export enum Platform {
  iOS = 'iOS Mobile',
  Android = 'Android Mobile',
  Web = 'Websites / Blogs',
  HTML5 = 'Web Games (HTML5)',
  Social = 'Social Media (FB/IG/TikTok)',
  Desktop = 'Desktop Apps',
  SmartTV = 'Smart TV / OTT'
}

export enum AdProvider {
  Unity = 'Unity Ads',
  Propeller = 'Propeller Ads',
  Meta = 'Meta (FB/IG)',
  Google = 'Google (AdMob/AdSense)',
  AppLovin = 'AppLovin / MAX',
  Custom = 'Custom SDK'
}

export enum AdType {
  // Unity Types
  Rewarded = 'Rewarded Video',
  Interstitial = 'Interstitial',
  Banner = 'Banner',
  MREC = 'MREC',
  // Propeller Types
  Popunder = 'OnClick (Popunder)',
  Push = 'Push Notifications',
  InPagePush = 'In-Page Push',
  DirectLink = 'Direct Link',
  // Meta Types
  MetaStories = 'Instagram Stories',
  MetaReels = 'Facebook/IG Reels',
  MetaFeed = 'Social Feed Ad',
  // Google Types
  AppOpen = 'App Open (AdMob)',
  Native = 'Native Advanced',
  Search = 'Search Ads',
  AdaptiveBanner = 'Adaptive Banner'
}

export interface AdUnit {
  id: string;
  name: string;
  type: AdType;
  provider: AdProvider;
  eCPM: number;
  status: 'active' | 'inactive';
}

export interface HybridStrategyResponse {
  overview: string;
  channelBreakdown: {
    provider: AdProvider;
    priority: 'High' | 'Medium' | 'Low';
    placements: {
      name: string;
      trigger: string;
      optimizationTip: string;
    }[];
  }[];
  globalReachPlan: {
    phase: string;
    action: string;
    target: string;
  }[];
  monetizationTips: string[];
}
