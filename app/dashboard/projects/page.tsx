import Link from "next/link";
import { getProjects } from "@/app/actions/projects";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { ProjectsTable } from "./projects-table";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projets</h1>
          <p className="text-slate-600 mt-1">
            Gérez les projets affichés sur votre portfolio.
          </p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Plus size={18} />
          <span>Nouveau projet</span>
        </Link>
      </div>

      <ProjectsTable projects={projects} />
    </div>
  );
}
