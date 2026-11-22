import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TechFocus } from "@/components/shell/TechFocus";
import { ChipList } from "@/components/ui/ChipList";
import { GroupDot } from "@/components/ui/GroupDot";
import { Reveal } from "@/components/ui/Reveal";
import { resume } from "@/content/resume";
import type { Project, ProjectImage } from "@/content/types";
import { projectAnchor } from "@/lib/anchors";
import { buildMonth } from "@/lib/build-info";
import { cx } from "@/lib/cx";
import { formatFormalPeriod, formatQuantity, periodDuration } from "@/lib/format";
import { projectPath } from "@/lib/routes";
import { techName } from "@/lib/selectors";

interface PersonalCardProps {
  project: Project;
  images: ProjectImage[];
  order: number;
  featured: boolean;
}

export function PersonalCard({ project, images, order, featured }: PersonalCardProps) {
  const [cover] = images;

  return (
    <TechFocus
      stack={project.stack}
      id={projectAnchor(project.slug)}
      className={cx("group scroll-mt-6", featured && "md:col-span-2 lg:col-span-3")}
    >
      <Reveal
        order={order}
        className={cx(
          "relative flex h-full flex-col gap-5 rounded-xl border border-line p-5 transition-colors duration-150 group-hover:border-line-strong group-data-[focus=match]:border-violet sm:p-6",
          featured && "md:grid md:grid-cols-2 md:items-center md:gap-8",
        )}
      >
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            unoptimized
            className="h-auto w-full rounded-lg border border-line"
          />
        ) : null}
        <div className="flex flex-1 flex-col">
          <p className="flex items-center gap-2 mono-label text-fg-muted">
            <GroupDot group="personal" />
            {project.domain}
          </p>
          <h3 className="mt-4 text-lg leading-snug font-medium text-fg">
            <Link href={projectPath(project.slug)} className="after:absolute after:inset-0 after:rounded-xl">
              {project.name}
            </Link>
          </h3>
          <p className="mt-1 font-mono text-xs text-fg-muted">
            {formatFormalPeriod(project.period)} · {periodDuration(project.period, buildMonth)}
          </p>
          <p className="mt-3 text-sm text-fg-muted">{project.summary}</p>
          <div className="mt-4">
            <ChipList label="Stack" items={project.stack.map((id) => techName(resume, id))} />
          </div>
          <p className="mt-auto flex items-center gap-2 pt-6 font-mono text-sm text-fg-muted transition-colors duration-150 group-hover:text-fg">
            View project
            <ArrowRight aria-hidden className="size-4" />
            {images.length > 0 ? (
              <span className="ml-auto">{formatQuantity(images.length, "image")}</span>
            ) : null}
          </p>
        </div>
      </Reveal>
    </TechFocus>
  );
}
