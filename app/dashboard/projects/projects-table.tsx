"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { deleteProject } from "@/app/actions/projects";
import { useTranslation } from "@/lib/i18n/i18n-context";

type Project = {
  id: string;
  imageUrl: string;
  name: string;
  shortDescription: string;
  linkName: string;
  link: string;
  order: number;
};

export function ProjectsTable({ projects }: { projects: Project[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleDelete = async (id: string) => {
    if (!confirm(t.projects.confirmDelete)) return;
    setDeletingId(id);
    try {
      await deleteProject(id);
    } finally {
      setDeletingId(null);
    }
  };

  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <p className="text-slate-600 mb-4">{t.projects.empty}</p>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <span>{t.projects.createFirst}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop table view */}
      <div className="hidden md:block bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">{t.projects.project}</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">{t.projects.descriptionCol}</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">{t.projects.link}</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">{t.projects.actions}</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                        <Image src={project.imageUrl} alt={project.name} fill className="object-cover" />
                      </div>
                      <span className="font-medium text-slate-900">{project.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-600 text-sm line-clamp-2 max-w-xs">{project.shortDescription}</p>
                  </td>
                  <td className="px-6 py-4">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                      {project.linkName}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/dashboard/projects/${project.id}/edit`} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title={t.projects.edit}>
                        <Pencil size={18} />
                      </Link>
                      <button onClick={() => handleDelete(project.id)} disabled={deletingId === project.id} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50" title={t.projects.delete}>
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

      {/* Mobile card view */}
      <div className="md:hidden space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                <Image src={project.imageUrl} alt={project.name} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-slate-900 truncate">{project.name}</h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <Link href={`/dashboard/projects/${project.id}/edit`} className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <Pencil size={16} />
                    </Link>
                    <button onClick={() => handleDelete(project.id)} disabled={deletingId === project.id} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-slate-600 text-sm line-clamp-2 mt-1">{project.shortDescription}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mt-1 inline-block">
                  {project.linkName}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
