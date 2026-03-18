"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createUser, updateUser } from "@/app/actions/users";
import { useTranslation } from "@/lib/i18n/i18n-context";

type UserFormProps = {
  user?: {
    id: string;
    name: string;
    email: string;
    username: string | null;
  };
};

export function UserForm({ user }: UserFormProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    username: user?.username ?? "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!formData.name.trim()) throw new Error(t.users.nameRequired);
      if (!formData.email.trim()) throw new Error(t.users.emailRequired);
      if (!formData.username.trim()) throw new Error(t.users.usernameRequired);
      if (!user && !formData.password.trim()) throw new Error(t.users.passwordRequired);

      if (user) {
        const updateData: Record<string, string> = {
          name: formData.name,
          email: formData.email,
          username: formData.username,
        };
        if (formData.password.trim()) {
          updateData.password = formData.password;
        }
        await updateUser(user.id, updateData);
      } else {
        await createUser(formData);
      }
      router.push("/dashboard/users");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.users.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <Link href="/dashboard/users" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
        <ArrowLeft size={18} />
        <span>{t.users.backToUsers}</span>
      </Link>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">{t.users.nameLabel}</label>
          <input id="name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500" placeholder={t.users.placeholderName} />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">{t.users.emailLabel}</label>
          <input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500" placeholder={t.users.placeholderEmail} />
        </div>
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">{t.users.usernameLabel}</label>
        <input id="username" type="text" required value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500" placeholder={t.users.placeholderUsername} />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
          {user ? t.users.passwordEditLabel : t.users.passwordLabel}
        </label>
        <input id="password" type="password" required={!user} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500" placeholder={t.users.placeholderPassword} />
      </div>

      <div className="flex gap-4 pt-4">
        <button type="submit" disabled={isLoading} className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors">
          {isLoading ? t.users.saving : user ? t.users.update : t.users.create}
        </button>
        <Link href="/dashboard/users" className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
          {t.users.cancel}
        </Link>
      </div>
    </form>
  );
}
