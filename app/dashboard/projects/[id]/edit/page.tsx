import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProjectForm } from "../../project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        Modifier le projet
      </h1>
      <p className="text-slate-600 mb-8">
        Modifiez les informations du projet.
      </p>
      <ProjectForm project={project} />
    </div>
  );
}
