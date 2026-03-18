import { en } from "./en";
import { fr } from "./fr";
import type { Dictionary } from "./en";

export type Locale = "en" | "fr";

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

export type { Dictionary };
