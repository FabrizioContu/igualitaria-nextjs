import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  CONSENT_COOKIE,
  CONSENT_MAX_AGE,
  CONSENT_VERSION,
  buildConsentCookie,
  getConsent,
  parseConsent,
  saveConsent,
  subscribeConsent,
} from '@/lib/consent';

const encode = (data: unknown) => encodeURIComponent(JSON.stringify(data));

const clearConsentCookie = () => {
  document.cookie = `${CONSENT_COOKIE}=; Path=/; Max-Age=0`;
};

describe('parseConsent()', () => {
  it('parses a valid consent', () => {
    const raw = encode({ v: CONSENT_VERSION, ts: '2026-10-26T10:00:00.000Z', external: true });
    expect(parseConsent(raw)).toEqual({
      v: CONSENT_VERSION,
      ts: '2026-10-26T10:00:00.000Z',
      external: true,
    });
  });

  it('returns null for empty input', () => {
    expect(parseConsent(null)).toBeNull();
    expect(parseConsent(undefined)).toBeNull();
    expect(parseConsent('')).toBeNull();
  });

  it('returns null for malformed values', () => {
    expect(parseConsent('not-json')).toBeNull();
    expect(parseConsent('%E0%A4%A')).toBeNull();
  });

  it('returns null when the version is outdated', () => {
    const raw = encode({ v: CONSENT_VERSION - 1, ts: '2026-01-01T00:00:00.000Z', external: true });
    expect(parseConsent(raw)).toBeNull();
  });

  it('returns null when a category is missing or has the wrong type', () => {
    expect(parseConsent(encode({ v: CONSENT_VERSION, ts: 'x' }))).toBeNull();
    expect(parseConsent(encode({ v: CONSENT_VERSION, ts: 'x', external: 'yes' }))).toBeNull();
  });

  it('drops unknown fields', () => {
    const raw = encode({ v: CONSENT_VERSION, ts: 'x', external: false, analytics: true });
    expect(parseConsent(raw)).toEqual({ v: CONSENT_VERSION, ts: 'x', external: false });
  });
});

describe('buildConsentCookie()', () => {
  const state = { v: CONSENT_VERSION, ts: '2026-10-26T10:00:00.000Z', external: false };

  it('sets path, max-age and samesite', () => {
    const cookie = buildConsentCookie(state, false);
    expect(cookie).toContain(`${CONSENT_COOKIE}=`);
    expect(cookie).toContain('Path=/');
    expect(cookie).toContain(`Max-Age=${CONSENT_MAX_AGE}`);
    expect(cookie).toContain('SameSite=Lax');
    expect(cookie).not.toContain('Secure');
  });

  it('adds Secure only on https', () => {
    expect(buildConsentCookie(state, true)).toMatch(/; Secure$/);
  });

  it('keeps the max-age within the AEPD recommendation (24 months)', () => {
    expect(CONSENT_MAX_AGE).toBeLessThanOrEqual(60 * 60 * 24 * 365 * 2);
  });

  it('round-trips through parseConsent', () => {
    const value = buildConsentCookie(state, false).split(';')[0].slice(CONSENT_COOKIE.length + 1);
    expect(parseConsent(value)).toEqual(state);
  });
});

describe('consent store', () => {
  beforeEach(() => {
    clearConsentCookie();
  });

  it('returns null when there is no decision', () => {
    expect(getConsent()).toBeNull();
  });

  it('persists the decision in the cookie', () => {
    saveConsent({ external: true });
    expect(getConsent()).toMatchObject({ v: CONSENT_VERSION, external: true });

    saveConsent({ external: false });
    expect(getConsent()).toMatchObject({ external: false });
  });

  it('returns the same reference while the cookie does not change', () => {
    saveConsent({ external: true });
    expect(getConsent()).toBe(getConsent());
  });

  it('notifies subscribers on save and stops after unsubscribe', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeConsent(listener);

    saveConsent({ external: true });
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    saveConsent({ external: false });
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
