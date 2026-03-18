import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerDictionary } from "@/lib/i18n/get-locale";
import { ExperienceForm } from "../../experience-form";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [experience, t] = await Promise.all([
    prisma.experience.findUnique({ where: { id } }),
    getServerDictionary(),
  ]);

  if (!experience) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.experiences.editTitle}</h1>
      <p className="text-slate-600 mb-8">{t.experiences.editDescription}</p>
      <ExperienceForm experience={experience} />
    </div>
  );
}
