import { getServerDictionary } from "@/lib/i18n/get-locale";
import { UserForm } from "../user-form";

export default async function NewUserPage() {
  const t = await getServerDictionary();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.users.newTitle}</h1>
      <p className="text-slate-600 mb-8">{t.users.newDescription}</p>
      <UserForm />
    </div>
  );
}
