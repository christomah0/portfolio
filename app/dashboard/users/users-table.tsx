"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteUser, type UserInfo } from "@/app/actions/users";
import { useTranslation } from "@/lib/i18n/i18n-context";

export function UsersTable({ users }: { users: UserInfo[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleDelete = async (id: string) => {
    if (!confirm(t.users.confirmDelete)) return;
    setDeletingId(id);
    try {
      await deleteUser(id);
    } catch {
      alert(t.users.error);
    } finally {
      setDeletingId(null);
    }
  };

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <p className="text-slate-600 mb-4">{t.users.empty}</p>
        <Link
          href="/dashboard/users/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <span>{t.users.createFirst}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="hidden md:block bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">{t.users.name}</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">{t.users.email}</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">{t.users.username}</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">{t.users.createdAt}</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">{t.users.actions}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{user.username ?? "—"}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/dashboard/users/${user.id}/edit`} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title={t.users.edit}>
                        <Pencil size={18} />
                      </Link>
                      <button onClick={() => handleDelete(user.id)} disabled={deletingId === user.id} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50" title={t.users.delete}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden space-y-3">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-medium text-slate-900">{user.name}</h3>
                <p className="text-sm text-slate-600">{user.email}</p>
                <p className="text-xs text-slate-500 mt-1">@{user.username ?? "—"}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link href={`/dashboard/users/${user.id}/edit`} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <Pencil size={16} />
                </Link>
                <button onClick={() => handleDelete(user.id)} disabled={deletingId === user.id} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
