import { cookies } from "next/headers";
import type { Locale } from "./dictionaries";
import { getDictionary } from "./dictionaries";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value;
  if (locale === "fr" || locale === "en") return locale;
  return "en";
}

export async function getServerDictionary() {
  const locale = await getServerLocale();
  return getDictionary(locale);
}
