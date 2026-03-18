"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteExperience } from "@/app/actions/experiences";
import { useTranslation } from "@/lib/i18n/i18n-context";

type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  order: number;
};

export function ExperiencesTable({ experiences }: { experiences: Experience[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleDelete = async (id: string) => {
    if (!confirm(t.experiences.confirmDelete)) return;
    setDeletingId(id);
    try {
      await deleteExperience(id);
    } finally {
      setDeletingId(null);
    }
  };

  if (experiences.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <p className="text-slate-600 mb-4">{t.experiences.empty}</p>
        <Link
          href="/dashboard/experiences/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <span>{t.experiences.createFirst}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="hidden md:block bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">{t.experiences.position}</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">{t.experiences.company}</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">{t.experiences.period}</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">{t.experiences.actions}</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((exp) => (
                <tr key={exp.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-900">{exp.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="text-slate-900">{exp.company}</span>
                      {exp.location && <span className="text-slate-500 text-sm block">{exp.location}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {exp.startDate} — {exp.endDate ?? t.experiences.present}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/dashboard/experiences/${exp.id}/edit`} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title={t.experiences.edit}>
                        <Pencil size={18} />
                      </Link>
                      <button onClick={() => handleDelete(exp.id)} disabled={deletingId === exp.id} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50" title={t.experiences.delete}>
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

      <div className="md:hidden space-y-3">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-medium text-slate-900 truncate">{exp.role}</h3>
                <p className="text-sm text-slate-600">{exp.company}</p>
                {exp.location && <p className="text-xs text-slate-500">{exp.location}</p>}
                <p className="text-xs text-slate-500 mt-1">
                  {exp.startDate} — {exp.endDate ?? t.experiences.present}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link href={`/dashboard/experiences/${exp.id}/edit`} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <Pencil size={16} />
                </Link>
                <button onClick={() => handleDelete(exp.id)} disabled={deletingId === exp.id} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
