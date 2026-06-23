export const i18n = {
  defaultLocale: "en",
  locales: ["en"],
  localeDirection: {
    en: "ltr",
    ar: "rtl",
  } as Record<string, "ltr" | "rtl">,
  localeNames: {
    en: "english",
    ar: "arabic",
  } as Record<string, string>,
} as const
