import Link from "next/link";
import { getProjects } from "@/app/actions/projects";
import { getServerDictionary } from "@/lib/i18n/get-locale";
import { Plus } from "lucide-react";
import { ProjectsTable } from "./projects-table";

export default async function ProjectsPage() {
  const [projects, t] = await Promise.all([getProjects(), getServerDictionary()]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t.projects.title}</h1>
          <p className="text-slate-600 mt-1">{t.projects.description}</p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors w-fit"
        >
          <Plus size={18} />
          <span>{t.projects.newProject}</span>
        </Link>
      </div>

      <ProjectsTable projects={projects} />
    </div>
  );
}
