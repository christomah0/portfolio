import Link from "next/link";
import { getProjects } from "@/app/actions/projects";
import { getSkills } from "@/app/actions/skills";
import { getExperiences } from "@/app/actions/experiences";
import { getUsers } from "@/app/actions/users";
import { getMetricsSummary } from "@/app/actions/metrics";
import { getServerDictionary } from "@/lib/i18n/get-locale";
import { FolderKanban, Sparkles, Briefcase, Users, Eye, CalendarDays, TrendingUp, BarChart3 } from "lucide-react";

export default async function DashboardPage() {
  const t = await getServerDictionary();
  const [projects, skills, experiences, users, metricsSummary] = await Promise.all([
    getProjects(),
    getSkills(),
    getExperiences(),
    getUsers(),
    getMetricsSummary(),
  ]);

  const stats = [
    {
      href: "/dashboard/projects",
      icon: FolderKanban,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      label: t.dashboard.projects,
      description: t.dashboard.projectsDesc,
      count: projects.length,
      unit: t.dashboard.projectUnit,
    },
    {
      href: "/dashboard/skills",
      icon: Sparkles,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      label: t.dashboard.skills,
      description: t.dashboard.skillsDesc,
      count: skills.length,
      unit: t.dashboard.skillUnit,
    },
    {
      href: "/dashboard/experiences",
      icon: Briefcase,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      label: t.dashboard.experiences,
      description: t.dashboard.experiencesDesc,
      count: experiences.length,
      unit: t.dashboard.experienceUnit,
    },
    {
      href: "/dashboard/users",
      icon: Users,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      label: t.dashboard.users,
      description: t.dashboard.usersDesc,
      count: users.length,
      unit: t.dashboard.userUnit,
    },
  ];

  const metricsCards = [
    { icon: Eye, label: t.metrics.totalViews, value: metricsSummary.total, color: "bg-indigo-100 text-indigo-600" },
    { icon: CalendarDays, label: t.metrics.today, value: metricsSummary.today, color: "bg-sky-100 text-sky-600" },
    { icon: TrendingUp, label: t.metrics.thisWeek, value: metricsSummary.week, color: "bg-teal-100 text-teal-600" },
    { icon: BarChart3, label: t.metrics.thisMonth, value: metricsSummary.month, color: "bg-rose-100 text-rose-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        {t.dashboard.title}
      </h1>
      <p className="text-slate-600 mb-8">
        {t.dashboard.welcome}
      </p>

      {/* Metrics overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {metricsCards.map((card) => (
          <Link
            key={card.label}
            href="/dashboard/analytics"
            className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
          >
            <div className={`p-2.5 rounded-lg ${card.color}`}>
              <card.icon size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">{card.label}</p>
              <p className="text-xl font-bold text-slate-900">{card.value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Content management */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="block p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 ${stat.iconBg} rounded-lg`}>
                <stat.icon className={stat.iconColor} size={24} />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">
                {stat.label}
              </h2>
            </div>
            <p className="text-slate-600 text-sm mb-2">{stat.description}</p>
            <p className="text-2xl font-bold text-slate-900">{stat.count}</p>
            <span className="text-sm text-slate-500">{stat.unit}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
