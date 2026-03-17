"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteSkill } from "@/app/actions/skills";

type Skill = {
  id: string;
  title: string;
  description: string;
  order: number;
};

export function SkillsTable({ skills }: { skills: Skill[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette compétence ?")) return;
    setDeletingId(id);
    try {
      await deleteSkill(id);
    } finally {
      setDeletingId(null);
    }
  };

  if (skills.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <p className="text-slate-600 mb-4">Aucune compétence pour le moment.</p>
        <Link
          href="/dashboard/skills/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <span>Créer la première compétence</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                Titre
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                Description
              </th>
              <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr
                key={skill.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  {skill.title}
                </td>
                <td className="px-6 py-4">
                  <p className="text-slate-600 text-sm line-clamp-2 max-w-md">
                    {skill.description}
                  </p>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/dashboard/skills/${skill.id}/edit`}
                      className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      disabled={deletingId === skill.id}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
