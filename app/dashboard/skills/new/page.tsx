import { getServerDictionary } from "@/lib/i18n/get-locale";
import { SkillForm } from "../skill-form";

export default async function NewSkillPage() {
  const t = await getServerDictionary();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.skills.newTitle}</h1>
      <p className="text-slate-600 mb-8">{t.skills.newDescription}</p>
      <SkillForm />
    </div>
  );
}
