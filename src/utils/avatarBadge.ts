export interface LocalizedAvatarBadge {
  es?: string | null;
  en?: string | null;
}

export const DEFAULT_AVATAR_BADGE = {
  es: "Sobre mí",
  en: "About me",
} as const;

export type SupportedLanguage = "es" | "en";

/**
 * Resolves the localized avatar tab badge according to RN-03 hierarchical resolution:
 * 1. Active language value (avatarBadge[lang])
 * 2. Alternative language value (avatarBadge[altLang])
 * 3. Default fallback (PORTFOLIO_DATA.profile.avatarBadge[lang] / DEFAULT_AVATAR_BADGE[lang])
 * 4. Profile name fallback (if provided)
 */
export function resolveAvatarBadge(
  avatarBadge?: LocalizedAvatarBadge | null,
  language: SupportedLanguage = "es",
  profileNameFallback?: string | null,
  customDefaultBadge?: LocalizedAvatarBadge | null
): string {
  const activeVal = avatarBadge?.[language]?.trim();
  if (activeVal) return activeVal;

  const altLang: SupportedLanguage = language === "es" ? "en" : "es";
  const altVal = avatarBadge?.[altLang]?.trim();
  if (altVal) return altVal;

  const defaultSource =
    customDefaultBadge !== undefined ? customDefaultBadge : DEFAULT_AVATAR_BADGE;
  const defaultVal = defaultSource?.[language]?.trim();
  if (defaultVal) return defaultVal;

  const altDefaultVal = defaultSource?.[altLang]?.trim();
  if (altDefaultVal) return altDefaultVal;

  const nameVal = profileNameFallback?.trim();
  if (nameVal) return nameVal;

  return "";
}
