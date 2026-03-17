import { ProjectForm } from "../project-form";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        Nouveau projet
      </h1>
      <p className="text-slate-600 mb-8">
        Ajoutez un nouveau projet à votre portfolio.
      </p>
      <ProjectForm />
    </div>
  );
}
