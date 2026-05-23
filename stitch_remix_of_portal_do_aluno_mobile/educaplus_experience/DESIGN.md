---
name: EducaPlus Experience
colors:
  surface: '#eefcff'
  surface-dim: '#cedde0'
  surface-bright: '#eefcff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e8f6f9'
  surface-container: '#e2f0f3'
  surface-container-high: '#ddebee'
  surface-container-highest: '#d7e5e8'
  on-surface: '#111e20'
  on-surface-variant: '#454652'
  inverse-surface: '#263335'
  inverse-on-surface: '#e5f3f6'
  outline: '#767683'
  outline-variant: '#c6c5d4'
  surface-tint: '#006688'
  primary: '#001e2b'
  on-primary: '#ffffff'
  primary-container: '#003448'
  on-primary-container: '#26a2d4'
  inverse-primary: '#77d1ff'
  secondary: '#00677d'
  on-secondary: '#ffffff'
  secondary-container: '#50d9fe'
  on-secondary-container: '#005c70'
  tertiary: '#001f24'
  on-tertiary: '#ffffff'
  tertiary-container: '#0e353b'
  on-tertiary-container: '#7a9ea5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c2e8ff'
  primary-fixed-dim: '#77d1ff'
  on-primary-fixed: '#001e2c'
  on-primary-fixed-variant: '#004d68'
  secondary-fixed: '#b3ebff'
  secondary-fixed-dim: '#4cd6fb'
  on-secondary-fixed: '#001f27'
  on-secondary-fixed-variant: '#004e5f'
  tertiary-fixed: '#c3e9f1'
  tertiary-fixed-dim: '#a8cdd5'
  on-tertiary-fixed: '#001f24'
  on-tertiary-fixed-variant: '#284c53'
  background: '#eefcff'
  on-background: '#111e20'
  surface-variant: '#d7e5e8'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  container-padding: 20px
  stack-gap: 16px
  inline-gap: 12px
  section-margin: 24px
  grid-columns: '4'
  grid-gutter: 16px
---

## Brand & Style

The design system is anchored in the principles of **Modern Corporate** aesthetics, specifically tailored for the academic environment. It prioritizes clarity, organizational efficiency, and a sense of institutional reliability. The UI should evoke a feeling of "ordered empowerment," allowing students and educators to navigate complex academic data without cognitive overload.

The visual language uses a disciplined approach to whitespace and a vibrant "Cerulean Blue" to establish a sense of modern innovation. It balances the seriousness of education with a clean, accessible interface that feels contemporary and approachable. The focus is on a high-signal-to-noise ratio, ensuring that essential information like grades, schedules, and deadlines remains the focal point.

## Colors

The palette is dominated by **Vibrant Cerulean (#0096C7)**, used for primary actions, navigation headers, and branding elements to instill confidence and energy. The background utilizes a sophisticated slate-neutral tone to provide a stable foundation for high-contrast content.

This design system utilizes "Fresh Accents" for discipline categorization. Instead of high-saturation colors, it employs light cyan and cool-toned backgrounds with darker text for specific subjects (e.g., Math, Science), allowing for quick visual scanning without breaking the professional tone. Success and warning states follow standard semantic patterns but are slightly adjusted to maintain the modern, tech-forward aesthetic.

## Typography

The design system exclusively uses **Inter** to leverage its exceptional legibility on mobile screens and its neutral, professional character. The typographic hierarchy is strictly enforced to manage information density.

- **Headlines:** Use a bold weight with slight negative letter spacing to create a compact, modern look for screen titles and card headers.
- **Body Text:** Optimized for readability with a standard 1.5x line height for longer academic descriptions.
- **Labels:** Used for metadata (dates, room numbers, credits), often employing an uppercase style with increased letter spacing to differentiate from body text at small sizes.

## Layout & Spacing

This design system is built for a **Mobile Portrait** environment using a fluid 4-column grid. The primary layout philosophy is based on a vertical stack of containers, mirroring the way students consume chronological information like schedules and task lists.

- **Safe Zones:** A 20px horizontal margin is maintained on all screens to ensure content doesn't feel cramped against device edges.
- **Rhythm:** An 8px-based spacing system is used for component relationships, while 4px is reserved for internal micro-adjustments (e.g., icon to text).
- **Density:** High-density lists are used for grade views, while low-density, high-padding cards are used for the dashboard overview.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and tonal layering. The design system avoids heavy shadows, opting for soft, diffused blurs that suggest the surface is hovering just above the background.

- **Background:** Neutral Slate (#AEBCBF).
- **Surface (Level 0):** Flat white containers for secondary info.
- **Card (Level 1):** White background with a 4% opacity black shadow, 8px blur, and 2px vertical offset. This is the primary interactive container.
- **Floating Action Button (Level 2):** Primary Blue background with a more pronounced shadow (12% opacity, 12px blur) to indicate its role as the primary trigger for adding tasks or events.
- **Overlays:** Full-screen modals use a 40% backdrop tint to maintain focus.

## Shapes

The shape language is **Rounded**, conveying a professional, clean, and structured user experience. This moderate degree of roundedness balances the friendly accessibility of the platform with the precision required for academic data, creating a UI that feels organized yet approachable.

- **Primary Containers:** Cards and input fields use a 0.5rem (8px) radius to create a refined, modern container style.
- **Action Elements:** Buttons follow the same 0.5rem radius to maintain consistency across the interactive surface area.
- **Floating Action Buttons:** These are fully circular to distinguish them from content cards and standard buttons.
- **Chips/Badges:** Use a pill-shape (full radius) for subject tags and status indicators to make them feel like distinct, touchable "objects."

## Components

### Buttons & FABs
- **Primary Button:** Filled with Vibrant Cerulean (#0096C7), white text, bold weight.
- **Secondary Button:** Outlined in Vibrant Cerulean with a 1px border.
- **FAB:** A 56x56px circular button in Vibrant Cerulean with a white linear "+" icon, positioned in the bottom-right corner.

### Cards
- **Dashboard Cards:** 16px internal padding, rounded-lg (16px), light shadow. 
- **Course Cards:** Feature a 4px left-border accent color corresponding to the subject category.

### Input Fields
- Understated style: light gray stroke (1px), 8px corner radius, and 12px horizontal padding. Labels sit above the field in `label-md` style.

### Navigation
- **Bottom Navigation:** A fixed white bar with a subtle top border. Icons are linear (2px stroke). The active state is indicated by a color shift to Vibrant Cerulean and a small dot indicator below the icon.

### Lists & Chips
- **Lists:** Use 16px vertical padding for touch targets. Dividers are 1px thick in a very light gray.
- **Chips:** Small, pill-shaped tags used for "Em Aberto", "Concluído", or "Atrasado" statuses using semantic colors.