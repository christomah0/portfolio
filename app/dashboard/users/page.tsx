import Link from "next/link";
import { getUsers } from "@/app/actions/users";
import { getServerDictionary } from "@/lib/i18n/get-locale";
import { Plus } from "lucide-react";
import { UsersTable } from "./users-table";

export default async function UsersPage() {
  const [users, t] = await Promise.all([getUsers(), getServerDictionary()]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t.users.title}</h1>
          <p className="text-slate-600 mt-1">{t.users.description}</p>
        </div>
        <Link
          href="/dashboard/users/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors w-fit"
        >
          <Plus size={18} />
          <span>{t.users.newUser}</span>
        </Link>
      </div>

      <UsersTable users={users} />
    </div>
  );
}
