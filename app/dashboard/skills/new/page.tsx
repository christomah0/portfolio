import { SkillForm } from "../skill-form";

export default function NewSkillPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        Nouvelle compétence
      </h1>
      <p className="text-slate-600 mb-8">
        Ajoutez une nouvelle compétence à votre portfolio.
      </p>
      <SkillForm />
    </div>
  );
}
