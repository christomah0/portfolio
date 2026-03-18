import { notFound } from "next/navigation";
import { getUser } from "@/app/actions/users";
import { getServerDictionary } from "@/lib/i18n/get-locale";
import { UserForm } from "../../user-form";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [user, t] = await Promise.all([
    getUser(id),
    getServerDictionary(),
  ]);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.users.editTitle}</h1>
      <p className="text-slate-600 mb-8">{t.users.editDescription}</p>
      <UserForm user={user} />
    </div>
  );
}
