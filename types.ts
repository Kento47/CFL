
export interface RateEntry {
  id: string;
  destination: string;
  label: string;
  value: string;
}

export interface ContactDetails {
  phoneKantoor: string;
  phoneKlantenservice: string;
  phoneRadj: string;
  whatsapp: string;
  email: string;
}

export interface SailingEntry {
  id: string;
  destination: string;
  closingDate: string;
  departureDate: string;
  arrivalDate: string;
  vessel?: string;
}

export interface CountryCard {
  id: string;
  name: string;
  flag: string;
  flagUrl?: string;
  tagline: string;
  closingDays: string;
  handlingInfo: string;
  handlerName: string;
  footerInfo: string;
}

export interface SeaFreightCountry {
  id: string;
  name: string;
  flag: string;
  flagUrl?: string;
  type: 'Particulieren' | 'Zakelijk';
  details: string[];
}

export interface Branding {
  logoUrl: string;
  companyName: string;
  heroImages: string[];
  footerCopyrightText: string;
}

export interface SocialLink {
  id: string;
  platform: 'Instagram' | 'Facebook' | 'LinkedIn' | 'WhatsApp' | 'X' | 'YouTube';
  url: string;
}

export interface LegalContent {
  algemeneVoorwaarden: string;
  privacyPolicy: string;
  termsOfUse: string;
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string;
  shareImage: string;
}

export interface AppContent {
  rates: RateEntry[];
  contact: ContactDetails;
  heroText: string;
  heroTitle: string;
  importExportText: string;
  airFreightIntro: string;
  airFreightCountries: CountryCard[];
  seaFreightIntro: string;
  seaFreightCountries: SeaFreightCountry[];
  sailingSchedules: SailingEntry[];
  branding: Branding;
  socialLinks: SocialLink[];
  legalContent: LegalContent;
  theme: Theme;
  seo: {
    home: SEOSettings;
    luchtvracht: SEOSettings;
    zeevracht: SEOSettings;
    diensten: SEOSettings;
    afvaart: SEOSettings;
    contact: SEOSettings;
  };
}

export type Page = 'home' | 'luchtvracht' | 'zeevracht' | 'contact' | 'admin' | 'afvaart-schema' | 'legal';
