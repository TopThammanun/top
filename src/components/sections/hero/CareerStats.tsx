import { StatGrid } from "@/components/ui/StatGrid";
import { resume } from "@/content/resume";
import { buildMonth } from "@/lib/build-info";
import { careerStats } from "@/lib/stats";

export function CareerStats() {
  const stats = careerStats(resume, buildMonth);
  if (stats.length === 0) return null;

  return (
    <div className="mt-12 md:mt-16">
      <StatGrid stats={stats} size="lg" className="grid-cols-2 lg:grid-cols-4" />
      <p className="mt-3 font-mono text-xs text-fg-muted">
        Counts are rounded figures from local clones on {resume.meta.statsAsOf}.
      </p>
    </div>
  );
}
