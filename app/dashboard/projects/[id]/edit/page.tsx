import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerDictionary } from "@/lib/i18n/get-locale";
import { ProjectForm } from "../../project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, t] = await Promise.all([
    prisma.project.findUnique({ where: { id } }),
    getServerDictionary(),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.projects.editTitle}</h1>
      <p className="text-slate-600 mb-8">{t.projects.editDescription}</p>
      <ProjectForm project={project} />
    </div>
  );
}
