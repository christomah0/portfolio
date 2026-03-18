"use server";

import { prisma } from "@/lib/db";

export async function getMetricsSummary() {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfDay);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [total, today, week, month] = await Promise.all([
    prisma.pageView.count(),
    prisma.pageView.count({ where: { createdAt: { gte: startOfDay } } }),
    prisma.pageView.count({ where: { createdAt: { gte: startOfWeek } } }),
    prisma.pageView.count({ where: { createdAt: { gte: startOfMonth } } }),
  ]);

  return { total, today, week, month };
}

export async function getViewsByPage() {
  const results = await prisma.pageView.groupBy({
    by: ["path"],
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 20,
  });

  return results.map((r: any) => ({
    path: r.path as string,
    views: r._count.id as number,
  }));
}

export async function getDailyViews(days: number = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const views = await prisma.pageView.findMany({
    where: { createdAt: { gte: since } },
    select: { createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  // Group by date
  const dailyMap = new Map<string, number>();
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    dailyMap.set(d.toISOString().split("T")[0], 0);
  }

  for (const view of views) {
    const key = view.createdAt.toISOString().split("T")[0];
    dailyMap.set(key, (dailyMap.get(key) ?? 0) + 1);
  }

  return Array.from(dailyMap.entries()).map(([date, views]) => ({
    date,
    views,
  }));
}
