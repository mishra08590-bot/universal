
export enum Platform {
  iOS = 'iOS Mobile',
  Android = 'Android Mobile',
  Web = 'Web Browser',
  HTML5 = 'HTML5 Games',
  Social = 'Social Apps',
  Desktop = 'Desktop Software',
  OTT = 'OTT / Smart TV'
}

export enum AdProvider {
  Unity = 'Unity Ads SDK',
  Propeller = 'PropellerAds',
  Meta = 'Meta Audience Network',
  Google = 'Google AdMob',
  AppLovin = 'AppLovin MAX',
  CustomDirect = 'Direct Sold Inventory',
  House = 'Internal House Ads'
}

export enum AdType {
  Rewarded = 'Rewarded Video',
  Interstitial = 'Interstitial Video/Static',
  Banner = 'Standard Banner',
  MREC = 'MREC (300x250)',
  Popunder = 'Popunder (OnClick)',
  Native = 'Native Advanced',
  Playable = 'Interactive Playable'
}

export interface AdUnit {
  id: string;
  name: string;
  type: AdType;
  provider: AdProvider;
  eCPM: number;
  status: 'active' | 'paused' | 'archived';
}

export interface HybridStrategyResponse {
  overview: string;
  channelBreakdown: {
    provider: AdProvider;
    priority: 'Critical' | 'High' | 'Standard';
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
