import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  'aria-hidden': true, focusable: false, ...p,
});

export const IconCheck = (p: P) => <svg {...base(p)}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>;
export const IconDash = (p: P) => <svg {...base(p)}><path d="M6 12h12" /></svg>;
export const IconAlert = (p: P) => <svg {...base(p)}><path d="M12 6v7M12 17.5v.5" /></svg>;
export const IconEye = (p: P) => <svg {...base(p)}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.8" /></svg>;
export const IconEyeOff = (p: P) => <svg {...base(p)}><path d="M3 3l18 18M10 6a9 9 0 0 1 2-.5c6 0 9.5 6.5 9.5 6.5a16 16 0 0 1-3 3.6M6.4 7.6A16 16 0 0 0 2.5 12S6 18.5 12 18.5c1.4 0 2.700-.3 3.800-.8" /></svg>;
export const IconPlay = (p: P) => <svg {...base(p)}><path d="M8 5.500v13l10-6.500z" /></svg>;
