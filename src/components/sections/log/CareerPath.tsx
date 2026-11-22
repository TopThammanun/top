import { resume } from "@/content/resume";
import { careerSteps } from "@/lib/career";
import { CareerStepCard } from "./CareerStepCard";

export function CareerPath() {
  const steps = careerSteps(resume);
  if (steps.length === 0) return null;

  return (
    <div className="mb-16 md:mb-20">
      <h3 className="mb-8 font-mono text-sm text-fg-muted">
        <span aria-hidden className="text-accent">
          #{" "}
        </span>
        Career path
      </h3>
      <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <CareerStepCard key={step.id} step={step} order={i} last={i === steps.length - 1} />
        ))}
      </ol>
    </div>
  );
}
