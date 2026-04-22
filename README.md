# UNBREN. (unbren.events)

Platformă web dedicată serviciilor de tip vizual (Foto, Video, Design) sub brandul **UNBREN**. Proiectul este optimizat pentru performanță, SEO și o experiență de utilizare premium.

## Arhitectură

Site-ul este construit folosind **Next.js App Router** cu o structură plată pentru accesibilitate maximă și SEO eficient. Toate rutele principale sunt accesibile direct din rădăcina proiectului.

- **Cod principal**: `src/app/`
- **Componente partajate**: `src/app/_shared/`
- **CMS**: Sanity.io integrat pentru management dinamic de conținut și galerii.

## Stack Tehnologic

### Core
- **Framework**: Next.js 16+ (App Router)
- **Limbaj**: TypeScript
- **Styling**: Tailwind CSS 4
- **Runtime**: Node.js / npm

### Componente și UI
- **Animații**: GSAP & Framer Motion
- **Icons**: Lucide React
- **Tipografie**:
  - **Inter**: Font principal (Sans)
  - **Xanh Mono**: Font de accent (Display)

### Management Conținut
- **CMS**: Sanity.io Headless CMS
- **Visual Editing**: Suport complet pentru Draft Mode și Previzualizare Live.

## Dezvoltare și Rulare

1. **Instalare**:
   ```bash
   npm install
   ```

2. **Rulare în modul de dezvoltare**:
   ```bash
   npm run dev
   ```

3. **Build pentru producție**:
   ```bash
   npm run build
   ```

---
**Status**: Migrare finalizată. Pregătit pentru producție.
