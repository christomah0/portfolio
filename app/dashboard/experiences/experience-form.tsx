"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createExperience, updateExperience, type ExperienceInput } from "@/app/actions/experiences";
import { useTranslation } from "@/lib/i18n/i18n-context";

type ExperienceFormProps = {
  experience?: {
    id: string;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | null;
    description: string;
    order: number;
  };
};

export function ExperienceForm({ experience }: ExperienceFormProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ExperienceInput>({
    role: experience?.role ?? "",
    company: experience?.company ?? "",
    location: experience?.location ?? "",
    startDate: experience?.startDate ?? "",
    endDate: experience?.endDate ?? null,
    description: experience?.description ?? "",
    order: experience?.order ?? 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!formData.role.trim()) throw new Error(t.experiences.positionRequired);
      if (!formData.company.trim()) throw new Error(t.experiences.companyRequired);
      if (!formData.startDate.trim()) throw new Error(t.experiences.startDateRequired);
      if (!formData.description.trim()) throw new Error(t.experiences.descriptionRequired);

      if (experience) {
        await updateExperience(experience.id, formData);
      } else {
        await createExperience(formData);
      }
      router.push("/dashboard/experiences");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.experiences.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <Link href="/dashboard/experiences" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
        <ArrowLeft size={18} />
        <span>{t.experiences.backToExperiences}</span>
      </Link>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1">{t.experiences.positionLabel}</label>
          <input id="role" type="text" required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500" placeholder={t.experiences.placeholderPosition} />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">{t.experiences.companyLabel}</label>
          <input id="company" type="text" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500" placeholder={t.experiences.placeholderCompany} />
        </div>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">{t.experiences.locationLabel}</label>
        <input id="location" type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500" placeholder={t.experiences.placeholderLocation} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 mb-1">{t.experiences.startDateLabel}</label>
          <input id="startDate" type="text" required value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500" placeholder="Jan 2023" />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 mb-1">{t.experiences.endDateLabel}</label>
          <input id="endDate" type="text" value={formData.endDate ?? ""} onChange={(e) => setFormData({ ...formData, endDate: e.target.value || null })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500" placeholder={t.experiences.placeholderEndDate} />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">{t.experiences.descriptionLabel}</label>
        <textarea id="description" rows={5} required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500" placeholder={t.experiences.placeholderDescription} />
      </div>

      <div className="flex gap-4 pt-4">
        <button type="submit" disabled={isLoading} className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors">
          {isLoading ? t.experiences.saving : experience ? t.experiences.update : t.experiences.create}
        </button>
        <Link href="/dashboard/experiences" className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
          {t.experiences.cancel}
        </Link>
      </div>
    </form>
  );
}
