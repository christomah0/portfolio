import { getMetricsSummary, getViewsByPage, getDailyViews } from "@/app/actions/metrics";
import { getServerDictionary } from "@/lib/i18n/get-locale";
import { Eye, CalendarDays, TrendingUp, BarChart3 } from "lucide-react";

export default async function AnalyticsPage() {
  const [t, summary, viewsByPage, dailyViews] = await Promise.all([
    getServerDictionary(),
    getMetricsSummary(),
    getViewsByPage(),
    getDailyViews(30),
  ]);

  const maxDailyViews = Math.max(...dailyViews.map((d) => d.views), 1);

  const metricsCards = [
    { icon: Eye, label: t.metrics.totalViews, value: summary.total, color: "bg-indigo-100 text-indigo-600" },
    { icon: CalendarDays, label: t.metrics.today, value: summary.today, color: "bg-sky-100 text-sky-600" },
    { icon: TrendingUp, label: t.metrics.thisWeek, value: summary.week, color: "bg-teal-100 text-teal-600" },
    { icon: BarChart3, label: t.metrics.thisMonth, value: summary.month, color: "bg-rose-100 text-rose-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.metrics.title}</h1>
      <p className="text-slate-600 mb-8">{t.metrics.description}</p>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {metricsCards.map((card) => (
          <div
            key={card.label}
            className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm"
          >
            <div className={`p-2.5 rounded-lg ${card.color}`}>
              <card.icon size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">{card.label}</p>
              <p className="text-xl font-bold text-slate-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {summary.total === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-slate-600">{t.metrics.noData}</p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Daily trend chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">{t.metrics.dailyTrend}</h2>
            <div className="flex items-end gap-1 h-40">
              {dailyViews.map((day) => (
                <div key={day.date} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                  <div
                    className="w-full bg-indigo-500 rounded-t-sm min-h-[2px] transition-all hover:bg-indigo-600"
                    style={{ height: `${Math.max((day.views / maxDailyViews) * 100, 2)}%` }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {day.date}: {day.views}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-400">
              <span>{dailyViews[0]?.date}</span>
              <span>{dailyViews[dailyViews.length - 1]?.date}</span>
            </div>
          </div>

          {/* Views by page */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">{t.metrics.viewsByPage}</h2>
            {viewsByPage.length === 0 ? (
              <p className="text-slate-500 text-sm">{t.metrics.noData}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 text-sm font-medium text-slate-600">{t.metrics.path}</th>
                      <th className="text-right py-2 text-sm font-medium text-slate-600">{t.metrics.views}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewsByPage.map((row) => (
                      <tr key={row.path} className="border-b border-slate-100 last:border-0">
                        <td className="py-2 text-sm text-slate-900 font-mono">{row.path}</td>
                        <td className="py-2 text-sm text-slate-600 text-right font-semibold">{row.views}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
