import { client } from "./client";
import type {
  SiteSettings,
  EventProject,
  Service,
  OfferCategory,
  Testimonial,
  FaqItem,
  Stat,
  TeamMember,
  AboutPage,
  LegalPage,
  LegalPageKey,
} from "./types";

// ═══════════════════════════════════════════════════════════════════════════════
// SITE SETTINGS
// ═══════════════════════════════════════════════════════════════════════════════

export async function getSiteSettings(): Promise<SiteSettings> {
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      _id,
      _type,
      siteTitle,
      siteDescription,
      "logo": logo.asset->url,
      "ogImage": ogImage.asset->url,
      "heroVideoMobile": heroVideoMobile.asset->url,
      "heroVideoDesktop": heroVideoDesktop.asset->url,
      heroHeadlines,
      heroDescription,
      ctaLabels,
      ctaLinks,
      whatsappNumber,
      offerCard,
      email,
      address,
      socialLinks,
      navItems,
      legalLinks
    }`,
  );
}

export async function getLegalPageByKey(
  key: LegalPageKey,
): Promise<LegalPage | null> {
  return client.fetch(
    `*[_type == "legalPage" && key == $key][0]{
      _id,
      _type,
      key,
      title,
      sections[]{
        heading,
        content,
        listItems
      }
    }`,
    { key },
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EVENT PROJECTS (Last Events)
// ═══════════════════════════════════════════════════════════════════════════════

export async function getAllEventProjects(): Promise<EventProject[]> {
  return client.fetch(
    `*[_type == "eventProject"] | order(year desc) {
      _id,
      _type,
      title,
      slug,
      category,
      year,
      coverImage,
      heroQuote,
      author,
      readTime,
      intro,
      approach,
      conclusion,
      reflection,
      gallery
    }`,
  );
}

export async function getEventProjectBySlug(
  slug: string,
): Promise<EventProject | null> {
  return client.fetch(
    `*[_type == "eventProject" && slug.current == $slug][0]{
      _id,
      _type,
      title,
      slug,
      category,
      year,
      coverImage,
      heroQuote,
      author,
      readTime,
      intro,
      approach,
      conclusion,
      reflection,
      gallery
    }`,
    { slug },
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICES (Service Explore)
// ═══════════════════════════════════════════════════════════════════════════════

export async function getAllServices(): Promise<Service[]> {
  return client.fetch(
    `*[_type == "service"] | order(order asc, _createdAt asc) {
      _id,
      _type,
      title,
      slug,
      featured,
      showInAccordion,
      order,
      coverImage,
      accordionControl,
      hero,
      introQuote,
      visualAnchor,
      caseStudy,
      process,
      galleryImages
    }`,
  );
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return client.fetch(
    `*[_type == "service" && slug.current == $slug][0]{
      _id,
      _type,
      title,
      slug,
      hero,
      introQuote,
      visualAnchor,
      caseStudy,
      process,
      galleryImages
    }`,
    { slug },
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// OFFER CATEGORIES
// ═══════════════════════════════════════════════════════════════════════════════

export async function getAllOfferCategories(): Promise<OfferCategory[]> {
  return client.fetch(
    `*[_type == "offerCategory"] | order(_createdAt asc) {
      _id,
      _type,
      title,
      subtitle,
      description,
      packages
    }`,
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TESTIMONIALS
// ═══════════════════════════════════════════════════════════════════════════════

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return client.fetch(
    `*[_type == "testimonial"] | order(_createdAt asc) {
      _id,
      _type,
      content,
      author,
      category,
      image
    }`,
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════════════════════════

export async function getFaqsByGroup(group: string): Promise<FaqItem[]> {
  return client.fetch(
    `*[_type == "faqItem" && group == $group] | order(order asc, _createdAt asc) {
      _id,
      _type,
      question,
      answer,
      group,
      order
    }`,
    { group },
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STATS (Metrics)
// ═══════════════════════════════════════════════════════════════════════════════

export async function getAllStats(): Promise<Stat[]> {
  return client.fetch(
    `*[_type == "stat"] | order(order asc) {
      _id,
      _type,
      value,
      suffix,
      label,
      order
    }`,
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEAM MEMBERS
// ═══════════════════════════════════════════════════════════════════════════════

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  return client.fetch(
    `*[_type == "teamMember"] | order(_createdAt asc) {
      _id,
      _type,
      name,
      role,
      avatar
    }`,
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export async function getAboutPage(): Promise<AboutPage> {
  return client.fetch(
    `*[_type == "aboutPage"][0]{
      _id,
      _type,
      heroTitle,
      heroImage,
      informationLabel,
      informationBody,
      informationSidebar,
      approachSteps,
      services,
      quickLinks
    }`,
  );
}
