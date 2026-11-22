import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import type { Project, Resume } from "@/content/types";
import { profileEndpoints } from "@/lib/endpoints";
import { formatPeriod } from "@/lib/format";
import { splitCode } from "@/lib/rich-text";
import { absoluteUrl } from "@/lib/routes";
import { techName } from "@/lib/selectors";

const INK = "#11181c";
const MUTED = "#52525b";
const ACCENT = "#955713";
const RULE = "#d4d4d8";
const PERIOD_SEPARATOR = "–";

const styles = StyleSheet.create({
  page: {
    paddingTop: 42,
    paddingBottom: 54,
    paddingHorizontal: 48,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.45,
    color: INK,
  },
  name: { fontFamily: "Helvetica-Bold", fontSize: 22, lineHeight: 1.1 },
  title: { fontSize: 11, color: MUTED, marginTop: 3 },
  contact: { fontFamily: "Courier", fontSize: 8.5, color: MUTED, marginTop: 8 },
  link: { color: MUTED, textDecoration: "none" },
  section: { marginTop: 16 },
  heading: {
    fontFamily: "Courier-Bold",
    fontSize: 8.5,
    letterSpacing: 1,
    color: ACCENT,
    borderBottomWidth: 0.5,
    borderBottomColor: RULE,
    paddingBottom: 3,
    marginBottom: 7,
  },
  paragraph: { marginBottom: 3 },
  entry: { marginBottom: 9 },
  entryHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  entryName: { fontFamily: "Helvetica-Bold", fontSize: 10.5 },
  mono: { fontFamily: "Courier", fontSize: 8.5, color: MUTED },
  meta: { color: MUTED, marginBottom: 2 },
  bullet: { flexDirection: "row", marginTop: 1.5 },
  bulletMark: { width: 10, color: ACCENT },
  bulletText: { flex: 1 },
  code: { fontFamily: "Courier" },
  row: { flexDirection: "row", marginBottom: 2 },
  rowLabel: { width: 132, color: MUTED },
  rowValue: { flex: 1 },
  footer: { position: "absolute", bottom: 26, left: 48, fontFamily: "Courier", fontSize: 7.5, color: MUTED },
});

Font.registerHyphenationCallback((word) => [word]);

function RichLine({ text }: { text: string }) {
  return (
    <Text style={styles.bulletText}>
      {splitCode(text).map((run, i) =>
        run.code ? (
          <Text key={i} style={styles.code}>
            {run.text}
          </Text>
        ) : (
          run.text
        ),
      )}
    </Text>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{title.toUpperCase()}</Text>
      {children}
    </View>
  );
}

function Experience({ project }: { project: Project }) {
  return (
    <View style={styles.entry} wrap={false}>
      <View style={styles.entryHead}>
        <Text style={styles.entryName}>{project.name}</Text>
        <Text style={styles.mono}>{formatPeriod(project.period, PERIOD_SEPARATOR)}</Text>
      </View>
      <Text style={styles.meta}>
        {project.role} · {project.domain}
      </Text>
      <Text style={styles.paragraph}>{project.summary}</Text>
      {project.highlights.map((highlight) => (
        <View key={highlight} style={styles.bullet}>
          <Text style={styles.bulletMark}>–</Text>
          <RichLine text={highlight} />
        </View>
      ))}
    </View>
  );
}

function SideProject({ project, resume }: { project: Project; resume: Resume }) {
  return (
    <View style={styles.entry} wrap={false}>
      <View style={styles.entryHead}>
        <Text style={styles.entryName}>{project.name}</Text>
        <Text style={styles.mono}>{formatPeriod(project.period, PERIOD_SEPARATOR)}</Text>
      </View>
      <Text>{project.summary}</Text>
      <Text style={styles.meta}>{project.stack.map((id) => techName(resume, id)).join(", ")}</Text>
    </View>
  );
}

export function ResumeDocument({ resume }: { resume: Resume }) {
  const { profile, meta } = resume;
  const name = profile.fullName ?? profile.displayName;
  const contacts = profileEndpoints(resume);

  return (
    <Document
      title={`${name} — ${profile.title}`}
      author={name}
      subject="Resume"
      creator={meta.siteUrl}
      producer={meta.siteUrl}
      language="en"
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.title}>
          {profile.title} · {profile.location.label} ({profile.location.utcOffset})
        </Text>
        <Text style={styles.contact}>
          {contacts.map((contact, i) => (
            <Text key={contact.href}>
              {i > 0 ? "  ·  " : ""}
              <Link src={contact.href} style={styles.link}>
                {contact.value}
              </Link>
            </Text>
          ))}
        </Text>

        <Section title="Summary">
          {profile.summary.map((line) => (
            <Text key={line} style={styles.paragraph}>
              {line}
            </Text>
          ))}
        </Section>

        <Section title="Experience">
          {resume.projects
            .filter((p) => p.kind === "client")
            .map((project) => (
              <Experience key={project.slug} project={project} />
            ))}
        </Section>

        <Section title="Projects">
          {resume.projects
            .filter((p) => p.kind !== "client")
            .map((project) => (
              <SideProject key={project.slug} project={project} resume={resume} />
            ))}
        </Section>

        <Section title="Skills">
          {resume.categories.map((category) => (
            <View key={category.id} style={styles.row} wrap={false}>
              <Text style={styles.rowLabel}>{category.label}</Text>
              <Text style={styles.rowValue}>
                {resume.tech
                  .filter((tech) => tech.category === category.id)
                  .map((tech) => tech.name)
                  .join(", ")}
              </Text>
            </View>
          ))}
        </Section>

        <Section title="Languages">
          <Text>{profile.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}</Text>
        </Section>

        <Text style={styles.footer} fixed>
          <Link src={meta.siteUrl} style={styles.link}>
            {meta.siteUrl.replace(/^https:\/\//, "")}
          </Link>
          {`  ·  v${meta.version}  ·  ${absoluteUrl(resume, "/resume.json")}`}
        </Text>
      </Page>
    </Document>
  );
}
