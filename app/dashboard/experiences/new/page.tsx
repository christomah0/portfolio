import { getServerDictionary } from "@/lib/i18n/get-locale";
import { ExperienceForm } from "../experience-form";

export default async function NewExperiencePage() {
  const t = await getServerDictionary();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.experiences.newTitle}</h1>
      <p className="text-slate-600 mb-8">{t.experiences.newDescription}</p>
      <ExperienceForm />
    </div>
  );
}
