import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { SkillForm } from "../../skill-form";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = await prisma.skill.findUnique({ where: { id } });

  if (!skill) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        Modifier la compétence
      </h1>
      <p className="text-slate-600 mb-8">
        Modifiez les informations de la compétence.
      </p>
      <SkillForm skill={skill} />
    </div>
  );
}
