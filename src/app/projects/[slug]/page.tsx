import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { resume } from "@/content/resume";
import type { Project } from "@/content/types";
import { fullName } from "@/lib/identity";
import { projectPath } from "@/lib/routes";
import { personalProjects } from "@/lib/selectors";

export const ensureStatic = "navigation";

const SHARE_IMAGE = "/opengraph-image";

function findProject(slug: string): Project | undefined {
  return personalProjects(resume).find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return personalProjects(resume).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = findProject(slug);
  if (!project) return {};

  const name = fullName(resume.profile);
  const title = `${project.name} · ${name}`;
  const url = projectPath(project.slug);

  return {
    title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: name,
      title,
      description: project.summary,
      locale: "en_US",
      images: [SHARE_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description: project.summary, images: [SHARE_IMAGE] },
  };
}

async function ProjectView({ params }: Pick<PageProps<"/projects/[slug]">, "params">) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}

export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={null}>
      <ProjectView params={params} />
    </Suspense>
  );
}
