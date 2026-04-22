// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// SHARED TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// SITE SETTINGS
// ═══════════════════════════════════════════════════════════════════════════════

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  siteTitle: string;
  logo?: string;
  ogImage?: string;
  siteDescription?: string;
  heroVideoMobile?: string;
  heroVideoDesktop?: string;
  heroHeadlines: string[];
  heroDescription: string;
  ctaLabels: {
    primary: string;
    secondary: string;
  };
  ctaLinks?: {
    primary?: string;
    secondary?: string;
  };
  whatsappNumber: string;
  offerCard?: {
    label?: string;
    title?: string;
    buttonLabel?: string;
    buttonHref?: string;
    whatsappMessage?: string;
  };
  socialLinks: {
    platform: string;
    url: string;
  }[];
  navItems: {
    label: string;
    href: string;
  }[];
  legalLinks?: {
    privacyHref?: string;
    termsHref?: string;
    cookieHref?: string;
  };
  email?: string;
  address?: string;
}

export type LegalPageKey = "terms" | "privacy" | "cookie";

export interface LegalSection {
  heading: string;
  content: string;
  listItems?: string[];
}

export interface LegalPage {
  _id: string;
  _type: "legalPage";
  key: LegalPageKey;
  title: string;
  sections: LegalSection[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// EVENT PROJECT (Last Events)
// ═══════════════════════════════════════════════════════════════════════════════

export interface EventGalleryItem {
  image: SanityImage;
  tag: string;
  description: string;
  aspectRatio: string;
}

export interface EventProject {
  _id: string;
  _type: "eventProject";
  title: string;
  slug: { current: string };
  category: string;
  year: string;
  coverImage: SanityImage;
  heroQuote: string;
  author: string;
  readTime: string;
  intro: string;
  approach: string[];
  conclusion: string;
  reflection: string;
  gallery: EventGalleryItem[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE (Service Explore)
// ═══════════════════════════════════════════════════════════════════════════════

export interface ServiceProcessStep {
  title: string;
  content: string;
}

export interface Service {
  _id: string;
  _type: "service";
  title: string;
  slug: { current: string };
  featured?: boolean;
  showInAccordion?: boolean;
  order?: number;
  coverImage?: SanityImage;
  accordionControl?: {
    shortTitle?: string;
    description?: string;
    tags?: string[];
    images?: SanityImage[];
  };
  hero: {
    title: string;
    subtitle: string;
    image: SanityImage;
  };
  introQuote: string;
  visualAnchor: {
    image: SanityImage;
    images: SanityImage[];
    video?: string;
  };
  caseStudy: {
    meta: {
      service: string;
      location: string;
      year: string;
    };
    title: string;
    subtitle: string;
    challenge: string;
    approach: string;
    result: string;
  };
  process: {
    title: string;
    items: ServiceProcessStep[];
  };
  galleryImages: SanityImage[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// OFFER CATEGORY & PACKAGE
// ═══════════════════════════════════════════════════════════════════════════════

export interface Package {
  name: string;
  duration: string;
  description?: string;
  recommended?: boolean;
  features: string[];
  excludedFeatures?: string[];
  price: string;
}

export interface OfferCategory {
  _id: string;
  _type: "offerCategory";
  title: string;
  subtitle: string;
  description: string;
  packages: Package[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// TESTIMONIAL
// ═══════════════════════════════════════════════════════════════════════════════

export interface Testimonial {
  _id: string;
  _type: "testimonial";
  content: string;
  author: string;
  category: string;
  image: SanityImage;
}

// ═══════════════════════════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════════════════════════

export interface FaqItem {
  _id: string;
  _type: "faqItem";
  question: string;
  answer: string;
  group: "contact" | "offers";
  order?: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// STAT (Metrics)
// ═══════════════════════════════════════════════════════════════════════════════

export interface Stat {
  _id: string;
  _type: "stat";
  value: string;
  suffix?: string;
  label: string;
  order: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEAM MEMBER
// ═══════════════════════════════════════════════════════════════════════════════

export interface TeamMember {
  _id: string;
  _type: "teamMember";
  name: string;
  role: string;
  avatar: SanityImage;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export interface AboutPage {
  _id: string;
  _type: "aboutPage";
  heroTitle: string;
  heroImage: SanityImage;
  informationLabel: string;
  informationBody: string;
  informationSidebar: string[];
  approachSteps: {
    title: string;
    description: string;
    image: SanityImage;
  }[];
  services: {
    title: string;
    description: string;
    image: SanityImage;
  }[];
  quickLinks: {
    label: string;
    href: string;
  }[];
}
