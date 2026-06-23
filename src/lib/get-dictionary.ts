// More info: https://nextjs.org/docs/app/building-your-application/routing/internationalization#localization
import "server-only"

import type { LocaleType } from "@/types"

const dictionaries = {
  en: () =>
    import("@/data/dictionaries/en.json").then((module) => module.default),
}

export async function getDictionary(locale: string) {
  const dictionaryLoader =
    dictionaries[locale as keyof typeof dictionaries] ?? dictionaries.en
  return dictionaryLoader()
}

export type DictionaryType = Awaited<ReturnType<typeof getDictionary>>
