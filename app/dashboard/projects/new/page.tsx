import { getServerDictionary } from "@/lib/i18n/get-locale";
import { ProjectForm } from "../project-form";

export default async function NewProjectPage() {
  const t = await getServerDictionary();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.projects.newTitle}</h1>
      <p className="text-slate-600 mb-8">{t.projects.newDescription}</p>
      <ProjectForm />
    </div>
  );
}
