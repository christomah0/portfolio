import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerDictionary } from "@/lib/i18n/get-locale";
import { SkillForm } from "../../skill-form";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [skill, t] = await Promise.all([
    prisma.skill.findUnique({ where: { id } }),
    getServerDictionary(),
  ]);

  if (!skill) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.skills.editTitle}</h1>
      <p className="text-slate-600 mb-8">{t.skills.editDescription}</p>
      <SkillForm skill={skill} />
    </div>
  );
}
