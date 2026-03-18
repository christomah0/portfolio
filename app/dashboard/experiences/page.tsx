import Link from "next/link";
import { getExperiences } from "@/app/actions/experiences";
import { getServerDictionary } from "@/lib/i18n/get-locale";
import { Plus } from "lucide-react";
import { ExperiencesTable } from "./experiences-table";

export default async function ExperiencesPage() {
  const [experiences, t] = await Promise.all([getExperiences(), getServerDictionary()]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t.experiences.title}</h1>
          <p className="text-slate-600 mt-1">{t.experiences.description}</p>
        </div>
        <Link
          href="/dashboard/experiences/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors w-fit"
        >
          <Plus size={18} />
          <span>{t.experiences.newExperience}</span>
        </Link>
      </div>

      <ExperiencesTable experiences={experiences} />
    </div>
  );
}
