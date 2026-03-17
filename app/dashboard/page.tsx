import Link from "next/link";
import { getProjects } from "@/app/actions/projects";
import { getSkills } from "@/app/actions/skills";
import { FolderKanban, Sparkles } from "lucide-react";

export default async function DashboardPage() {
  const [projects, skills] = await Promise.all([
    getProjects(),
    getSkills(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        Tableau de bord
      </h1>
      <p className="text-slate-600 mb-8">
        Bienvenue dans le backoffice de votre portfolio.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/dashboard/projects"
          className="block p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FolderKanban className="text-blue-600" size={24} />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Projets</h2>
          </div>
          <p className="text-slate-600 text-sm mb-2">
            GÃÂ©rez les projets affichÃÂ©s sur votre portfolio.
          </p>
          <p className="text-2xl font-bold text-slate-900">{projects.length}</p>
          <span className="text-sm text-slate-500">projet(s)</span>
        </Link>

        <Link
          href="/dashboard/skills"
          className="block p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Sparkles className="text-amber-600" size={24} />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">
              CompÃÂ©tences
            </h2>
          </div>
          <p className="text-slate-600 text-sm mb-2">
            GÃÂ©rez les compÃÂ©tences affichÃÂ©es sur votre portfolio.
          </p>
          <p className="text-2xl font-bold text-slate-900">{skills.length}</p>
          <span className="text-sm text-slate-500">compÃÂ©tence(s)</span>
        </Link>
      </div>
    </div>
  );
}
