import Link from "next/link";
import { getSkills } from "@/app/actions/skills";
import { Plus } from "lucide-react";
import { SkillsTable } from "./skills-table";

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Compétences</h1>
          <p className="text-slate-600 mt-1">
            Gérez les compétences affichées sur votre portfolio.
          </p>
        </div>
        <Link
          href="/dashboard/skills/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Plus size={18} />
          <span>Nouvelle compétence</span>
        </Link>
      </div>

      <SkillsTable skills={skills} />
    </div>
  );
}
