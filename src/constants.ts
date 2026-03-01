export const FIREBASE_URL = process.env.FIREBASE_URL;

/**
 * Client-side email validation:
 * - Local part: letters, numbers, dots, hyphens, underscores, +, % (no spaces)
 * - Single @
 * - Domain with at least one dot and TLD of 2+ chars
 * - Max 254 chars (RFC 5321)
 */
export const EMAIL_MAX_LENGTH = 254;
export const emailRegex = () =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

export const Colors: Record<string, string> = {
  headerBg: '#F7F7FF',
  headerFooterBg: 'linear-gradient(180deg, #f6f7fb 0%, #eef0f5 100%)',
  headerFooterBgSolid: '#f2f4f8',
  colorPrimary: '#78be21',
  colorPrimaryHover: '#68a81c',
  colorSecondary: '#3e3e40',
  colorSecondaryHover: '#2d2d2f',
  white: '#ffffff',
  cardBg: '#ffffff',
  border: '#e2e4eb',
  textMuted: '#5c5d61'
};

export const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
} as const;

export const spacing = {
  pagePadding: 'clamp(16px, 4vw, 32px)',
  sectionGap: 'clamp(24px, 5vw, 48px)',
  cardPadding: 'clamp(20px, 4vw, 32px)'
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16
} as const;
