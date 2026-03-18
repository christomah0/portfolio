"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createSkill, updateSkill, type SkillInput } from "@/app/actions/skills";
import { useTranslation } from "@/lib/i18n/i18n-context";

type SkillFormProps = {
  skill?: {
    id: string;
    title: string;
    description: string;
    order: number;
  };
};

export function SkillForm({ skill }: SkillFormProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SkillInput>({
    title: skill?.title ?? "",
    description: skill?.description ?? "",
    order: skill?.order ?? 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!formData.title.trim()) throw new Error(t.skills.titleRequired);
      if (!formData.description.trim()) throw new Error(t.skills.descriptionRequired);

      if (skill) {
        await updateSkill(skill.id, formData);
      } else {
        await createSkill(formData);
      }
      router.push("/dashboard/skills");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.skills.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <Link href="/dashboard/skills" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
        <ArrowLeft size={18} />
        <span>{t.skills.backToSkills}</span>
      </Link>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">{t.skills.skillTitle}</label>
        <input id="title" type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500" placeholder={t.skills.placeholderTitle} />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">{t.skills.skillDescription}</label>
        <textarea id="description" rows={4} required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500" placeholder={t.skills.placeholderDescription} />
      </div>

      <div className="flex gap-4 pt-4">
        <button type="submit" disabled={isLoading} className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors">
          {isLoading ? t.skills.saving : skill ? t.skills.update : t.skills.create}
        </button>
        <Link href="/dashboard/skills" className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
          {t.skills.cancel}
        </Link>
      </div>
    </form>
  );
}
