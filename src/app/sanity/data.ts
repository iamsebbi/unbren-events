/**
 * Data layer for UNBREN.
 *
 * Each function fetches from Sanity CMS (Server-side).
 * Minimal fallbacks are provided for initial setup stability.
 */

import {
  getSiteSettings,
  getAllEventProjects,
  getEventProjectBySlug,
  getAllServices,
  getServiceBySlug,
  getAllOfferCategories,
  getAllTestimonials,
  getFaqsByGroup,
  getAllStats,
  getAllTeamMembers,
  getAboutPage,
  getLegalPageByKey,
} from "./queries";
import type { LegalPage, LegalPageKey } from "./types";

// ═══════════════════════════════════════════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * Fetch site-wide statistics/metrics from Sanity.
 *
 * @returns Object containing stats items, label, title, and subtitle.
 */
export async function getStats() {
  try {
    const sanityStats = await getAllStats();
    if (sanityStats?.length > 0) {
      return {
        items: sanityStats.map((s) => ({
          value: s.value,
          suffix: s.suffix,
          label: s.label,
        })),
        label: "(CIFRE)",
        title: "Impactul nostru în numere.",
        subtitle:
          "Fiecare cadru și fiecare secundă livrată reprezintă un standard de excelență.",
      };
    }
  } catch (error) {
    console.error("Error fetching stats:", error);
  }
  return {
    items: [],
    label: "(CIFRE)",
    title: "Impactul nostru în numere.",
    subtitle:
      "Fiecare cadru și fiecare secundă livrată reprezintă un standard de excelență.",
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// OFFERS
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * Fetch all offer categories with their packages from Sanity.
 *
 * @returns Array of offer categories, or empty array on failure.
 */
export async function getOffers() {
  try {
    const data = await getAllOfferCategories();
    if (data?.length > 0) return data;
  } catch (error) {
    console.error("Error fetching offers:", error);
  }
  return [];
}

// ═══════════════════════════════════════════════════════════════════════════════
// TESTIMONIALS
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * Fetch all client testimonials from Sanity.
 *
 * @returns Array of testimonials, or null on failure.
 */
export async function getTestimonials() {
  try {
    const data = await getAllTestimonials();
    if (data?.length > 0) return data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * Fetch FAQ items filtered by group from Sanity.
 *
 * @param group - The FAQ group identifier (e.g. "contact", "offers", "web").
 * @returns Array of FAQ question/answer pairs, or empty array on failure.
 */
export async function getFaqs(group: string) {
  try {
    const data = await getFaqsByGroup(group);
    if (data?.length > 0) {
      return data.map((f) => ({ question: f.question, answer: f.answer }));
    }
  } catch (error) {
    console.error(`Error fetching FAQs for ${group}:`, error);
  }
  return [];
}

// ═══════════════════════════════════════════════════════════════════════════════
// EVENT PROJECTS
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * Fetch all event projects from Sanity, ordered by year descending.
 *
 * @returns Array of event projects, or empty array on failure.
 */
export async function getEvents() {
  try {
    const data = await getAllEventProjects();
    if (data?.length > 0) return data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
  return [];
}
/**
 * Fetch a single event project by its slug.
 *
 * @param slug - The URL slug of the event project.
 * @returns The event project data, or null if not found.
 */
export async function getEventBySlug(slug: string) {
  try {
    const data = await getEventProjectBySlug(slug);
    if (data) return data;
  } catch (error) {
    console.error(`Error fetching event by slug ${slug}:`, error);
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICES
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * Fetch all services from Sanity, ordered by creation date.
 *
 * @returns Array of services, or null on failure.
 */
export async function getServicesData() {
  try {
    const data = await getAllServices();
    if (data?.length > 0) return data;
  } catch (error) {
    console.error("Error fetching services:", error);
  }
  return null;
}
/**
 * Fetch a single service by its slug.
 *
 * @param slug - The URL slug of the service.
 * @returns The service data, or null if not found.
 */
export async function getServiceBySlugData(slug: string) {
  try {
    const data = await getServiceBySlug(slug);
    if (data) return data;
  } catch (error) {
    console.error(`Error fetching service by slug ${slug}:`, error);
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEAM MEMBERS
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * Fetch all team members from Sanity.
 *
 * @returns Array of team members, or null on failure.
 */
export async function getTeam() {
  try {
    const data = await getAllTeamMembers();
    if (data?.length > 0) return data;
  } catch (error) {
    console.error("Error fetching team members:", error);
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * Fetch the About page content from Sanity.
 *
 * @returns About page data including hero, approach steps, services, and quick links.
 */
export async function getAboutData() {
  try {
    const data = await getAboutPage();
    if (data) return data;
  } catch (error) {
    console.error("Error fetching about page data:", error);
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SITE SETTINGS
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * Fetch site settings from Sanity (nav items, social links, contact info, etc.).
 *
 * Falls back to hardcoded defaults if Sanity is unavailable.
 *
 * @returns Site settings object.
 */
export async function getSettings() {
  try {
    const data = await getSiteSettings();
    if (data) return data;
  } catch (error) {
    console.error("Error fetching site settings:", error);
  }
  return {
    _id: "fallback",
    _type: "siteSettings" as const,
    siteTitle: "UNBREN.",
    heroHeadlines: ["CREEĂM MIȘCAREA", "IMAGINI CARE STAU", "MEREU CU TINE."],
    heroDescription: "Capturăm emoții, livrăm amintiri.",
    ctaLabels: { primary: "Vezi oferte", secondary: "Galerie" },
    ctaLinks: { primary: "/offers", secondary: "/gallery" },
    whatsappNumber: "40700000000",
    offerCard: {
      label: "Ofertă limitată",
      title: "Oferim servicii de la 200€",
      buttonLabel: "WhatsApp",
      buttonHref: "",
      whatsappMessage:
        "Bună ziua! Sunt interesat de oferta de servicii de la 200€.",
    },
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com" },
      { platform: "Facebook", url: "https://facebook.com" },
    ],
    navItems: [
      { label: "Acasă", href: "/" },
      { label: "Evenimente", href: "/evenimente" },
      { label: "Galerie", href: "/gallery" },
      { label: "Oferte", href: "/offers" },
      { label: "Despre noi", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    legalLinks: {
      privacyHref: "/politica-de-confidentialitate",
      termsHref: "/termeni-si-conditii",
      cookieHref: "/politica-cookie",
    },
  };
}

const LEGAL_PAGE_FALLBACKS: Record<
  LegalPageKey,
  Omit<LegalPage, "_id" | "_type">
> = {
  terms: {
    key: "terms",
    title: "TERMENI SI CONDITII",
    sections: [
      {
        heading: "Acceptarea Termenilor",
        content:
          "Prin utilizarea acestui site web, ești de acord cu acești Termeni și Condiții. Dacă nu ești de acord cu oricare dintre acești termeni, te rugăm să nu utilizezi serviciile noastre. UNBREN. își rezervă dreptul de a modifica acești termeni în orice moment, fără o notificare prealabilă.",
      },
      {
        heading: "Serviciile Noastre",
        content:
          "UNBREN. oferă servicii creative și de management pentru evenimente. Toate ofertele prezentate pe site au caracter informativ și pot fi subiectul unor negocieri și contractcontracts specifice pentru fiecare proiect în parte.",
      },
      {
        heading: "Proprietate Intelectuală",
        content:
          "Conținutul acestui site (imagini, design, logo-uri, texte) este proprietatea UNBREN. și este protejat de legile dreptului de autor. Este strict interzisă reproducerea, distribuirea sau utilizarea neautorizată a acestora fără acordul nostru scris.",
      },
      {
        heading: "Limitarea Răspunderii",
        content:
          "UNBREN. nu va fi responsabilă pentru niciun fel de daune directe, indirecte sau accidentale care rezultă din utilizarea sau imposibilitatea utilizării informațiilor de pe acest site. Depunem toate eforturile pentru ca informațiile să fie corecte și actualizate.",
      },
      {
        heading: "Litigii",
        content:
          "Orice dispută care rezultă din sau în legătură cu acești Termeni și Condiții va fi soluționată pe cale amiabilă sau, dacă acest lucru nu este posibil, de către instanțele judecătorești competente din România.",
      },
    ],
  },
  privacy: {
    key: "privacy",
    title: "POLITICA DE CONFIDENTIALITATE",
    sections: [
      {
        heading: "Introducere",
        content:
          "La UNBREN., ne respectăm angajamentul de a proteja confidențialitatea și securitatea datelor tale cu caracter personal. Această Politică de Confidențialitate explică modul în care colectăm, utilizăm și protejăm informațiile tale atunci când interacționezi cu serviciile noastre prin intermediul acestui site.",
      },
      {
        heading: "Datele Pe Care Le Colectăm",
        content:
          "Colectăm informații care ne permit să îți oferim serviciile noastre într-un mod eficient și personalizat:",
        listItems: [
          "Informații de contact (nume, adresă de e-mail, număr de telefon).",
          "Detalii despre evenimentul tău pentru a putea personaliza oferta noastra.",
          "Informații tehnice (adresa IP, tipul de browser, paginile vizitate) colectate prin cookie-uri.",
        ],
      },
      {
        heading: "Scopul Prelucrării",
        content: "Utilizăm datele tale pentru:",
        listItems: [
          "A răspunde solicitărilor de ofertă și întrebărilor tale.",
          "A îmbunătăți experiența utilizatorilor pe site-ul nostru.",
          "A trimite ocazional informații despre serviciile noastre, dacă ți-ai dat acordul.",
        ],
      },
      {
        heading: "Drepturile Tale",
        content:
          "Conform Regulamentului General privind Protecția Datelor (GDPR), ai următoarele drepturi:",
        listItems: [
          "Dreptul de acces la datele tale.",
          "Dreptul de a solicita rectificarea sau ștergerea acestora.",
          "Dreptul de a te opune prelucrării datelor tale.",
          "Dreptul la portabilitatea datelor.",
        ],
      },
      {
        heading: "Contact",
        content:
          "Pentru orice întrebări legată de prelucrarea datelor tale cu caracter personal, ne poți contacta la adresa de e-mail: hello@unbren.ro.",
      },
    ],
  },
  cookie: {
    key: "cookie",
    title: "POLITICA COOKIE",
    sections: [
      {
        heading: "Ce sunt cookie-urile?",
        content:
          "Cookie-urile sunt fișiere text mici care sunt stocate pe dispozitivul tău (computer, tabletă sau telefon mobil) atunci când vizitezi un site web. Acestea permit site-ului să recunoască dispozitivul și să rețină anumite informații despre preferințele tale sau acțiunile trecute.",
      },
      {
        heading: "Cum utilizăm cookie-urile?",
        content:
          "În prezent, site-ul UNBREN. utilizează exclusiv cookie-uri tehnice și necesare. Acestea sunt esențiale pentru funcționarea corectă a site-ului și pentru a-ți oferi o experiență fluidă de navigare.",
        listItems: [
          "Cookie-uri de sesiune: Necesare pentru securitate și performanță.",
          "Cookie-uri de preferințe: Rețin setările de bază ale interfeței.",
          "UNBREN. NU utilizează în acest moment cookie-uri de publicitate sau tracking în scopuri de marketing.",
        ],
      },
      {
        heading: "Controlul cookie-urilor",
        content:
          "Poți controla și/sau șterge cookie-urile după cum dorești. Poți șterge toate cookie-urile care sunt deja pe computerul tău și poți seta majoritatea browserelor să împiedice plasarea acestora.",
      },
      {
        heading: "Actualizări ale politicii",
        content:
          "Putem actualiza această Politică de Cookie din când în când pentru a reflecta modificări tehnice, operaționale sau legale.",
      },
      {
        heading: "Contact",
        content:
          "Dacă ai întrebări despre utilizarea noastră de cookie-uri, te rugăm să ne scrii la: hello@unbren.ro.",
      },
    ],
  },
};

export async function getLegalPageData(key: LegalPageKey): Promise<LegalPage> {
  try {
    const data = await getLegalPageByKey(key);
    if (data?.sections?.length) return data;
  } catch (error) {
    console.error(`Error fetching legal page (${key}):`, error);
  }

  return {
    _id: `fallback-${key}`,
    _type: "legalPage",
    ...LEGAL_PAGE_FALLBACKS[key],
  };
}
