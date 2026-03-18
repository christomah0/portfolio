"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createProject, updateProject, type ProjectInput } from "@/app/actions/projects";
import { useTranslation } from "@/lib/i18n/i18n-context";

type ProjectFormProps = {
  project?: {
    id: string;
    imageUrl: string;
    name: string;
    shortDescription: string;
    linkName: string;
    link: string;
    order: number;
  };
};

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProjectInput>({
    imageUrl: project?.imageUrl ?? "/globe.svg",
    name: project?.name ?? "",
    shortDescription: project?.shortDescription ?? "",
    linkName: project?.linkName ?? "",
    link: project?.link ?? "",
    order: project?.order ?? 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!formData.name.trim()) throw new Error(t.projects.nameRequired);
      if (!formData.shortDescription.trim()) throw new Error(t.projects.descriptionRequired);
      if (!formData.link.trim()) throw new Error(t.projects.linkRequired);

      if (project) {
        await updateProject(project.id, formData);
      } else {
        await createProject(formData);
      }
      router.push("/dashboard/projects");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.projects.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <Link href="/dashboard/projects" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
        <ArrowLeft size={18} />
        <span>{t.projects.backToProjects}</span>
      </Link>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
      )}

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-700 mb-1">{t.projects.imageUrl}</label>
        <input id="imageUrl" type="text" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500" placeholder="/globe.svg" />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">{t.projects.projectName}</label>
        <input id="name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500" placeholder={t.projects.placeholderName} />
      </div>

      <div>
        <label htmlFor="shortDescription" className="block text-sm font-medium text-slate-700 mb-1">{t.projects.shortDescription}</label>
        <textarea id="shortDescription" rows={3} required value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500" placeholder={t.projects.placeholderDescription} />
      </div>

      <div>
        <label htmlFor="linkName" className="block text-sm font-medium text-slate-700 mb-1">{t.projects.linkText}</label>
        <input id="linkName" type="text" value={formData.linkName} onChange={(e) => setFormData({ ...formData, linkName: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500" placeholder={t.projects.placeholderLinkText} />
      </div>

      <div>
        <label htmlFor="link" className="block text-sm font-medium text-slate-700 mb-1">{t.projects.linkUrl}</label>
        <input id="link" type="url" required value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500" placeholder="https://example.com" />
      </div>

      <div className="flex gap-4 pt-4">
        <button type="submit" disabled={isLoading} className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors">
          {isLoading ? t.projects.saving : project ? t.projects.update : t.projects.create}
        </button>
        <Link href="/dashboard/projects" className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
          {t.projects.cancel}
        </Link>
      </div>
    </form>
  );
}
