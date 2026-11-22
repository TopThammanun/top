import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import type { Period, Project, Resume } from "@/content/types";
import { profileEndpoints } from "@/lib/endpoints";
import { formatFormalPeriod } from "@/lib/format";
import { fullName } from "@/lib/identity";
import { splitCode } from "@/lib/rich-text";
import { companyProjects, personalProjects, skillGroups, techName } from "@/lib/selectors";
import { seoKeywords } from "@/lib/seo";

const INK = "#000000";
const SOFT = "#404040";
const MARGIN_X = 54;
const FOOTER_TOP = 800;
const CONTACT_SEPARATOR = "   |   ";

const styles = StyleSheet.create({
  page: {
    paddingTop: 46,
    paddingBottom: 58,
    paddingHorizontal: MARGIN_X,
    fontFamily: "Times-Roman",
    fontSize: 10.5,
    lineHeight: 1.35,
    color: INK,
  },
  header: { alignItems: "center", borderBottomWidth: 1, borderBottomColor: INK, paddingBottom: 10 },
  name: { fontFamily: "Times-Bold", fontSize: 24, lineHeight: 1.2 },
  title: { fontSize: 12, marginTop: 2 },
  contact: { fontSize: 10, marginTop: 5, textAlign: "center" },
  link: { color: INK, textDecoration: "none" },
  section: { marginTop: 13 },
  heading: {
    fontFamily: "Times-Bold",
    fontSize: 11,
    letterSpacing: 0.9,
    borderBottomWidth: 0.75,
    borderBottomColor: INK,
    paddingBottom: 2,
    marginBottom: 6,
  },
  entry: { marginBottom: 9 },
  entryHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  entryTitle: { flex: 1, fontFamily: "Times-Bold", fontSize: 11, paddingRight: 12 },
  entryPeriod: { fontSize: 10.5 },
  entrySubtitle: { fontFamily: "Times-Italic", marginBottom: 2 },
  bullet: { flexDirection: "row", marginTop: 1.5, paddingLeft: 6 },
  bulletMark: { width: 11 },
  bulletText: { flex: 1 },
  code: { fontFamily: "Courier", fontSize: 9.5 },
  technologies: { marginTop: 3 },
  label: { fontFamily: "Times-Bold" },
  row: { flexDirection: "row", marginBottom: 2 },
  rowLabel: { width: 142, fontFamily: "Times-Bold" },
  rowValue: { flex: 1 },
  footer: {
    position: "absolute",
    top: FOOTER_TOP,
    left: MARGIN_X,
    right: MARGIN_X,
    fontSize: 8.5,
    color: SOFT,
  },
  pageNumber: { textAlign: "right" },
});

Font.registerHyphenationCallback((word) => [word]);

function RichText({ text }: { text: string }) {
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
      <Text style={styles.heading} minPresenceAhead={48}>
        {title.toUpperCase()}
      </Text>
      {children}
    </View>
  );
}

function EntryHead({ title, subtitle, period }: { title: string; subtitle: string; period: Period }) {
  return (
    <View>
      <View style={styles.entryHead}>
        <Text style={styles.entryTitle}>{title}</Text>
        <Text style={styles.entryPeriod}>{formatFormalPeriod(period)}</Text>
      </View>
      <Text style={styles.entrySubtitle}>{subtitle}</Text>
    </View>
  );
}

interface EntryProps {
  project: Project;
  resume: Resume;
}

function Technologies({ project, resume }: EntryProps) {
  return (
    <Text style={styles.technologies}>
      <Text style={styles.label}>Technologies: </Text>
      {project.stack.map((id) => techName(resume, id)).join(", ")}
    </Text>
  );
}

function ExperienceEntry({ project, resume }: EntryProps) {
  return (
    <View style={styles.entry} wrap={false}>
      <EntryHead
        title={project.role}
        subtitle={`${project.name} · ${project.domain}`}
        period={project.period}
      />
      <Text>{project.summary}</Text>
      {project.highlights.map((highlight) => (
        <View key={highlight} style={styles.bullet}>
          <Text style={styles.bulletMark}>•</Text>
          <RichText text={highlight} />
        </View>
      ))}
      <Technologies project={project} resume={resume} />
    </View>
  );
}

function ProjectEntry({ project, resume }: EntryProps) {
  return (
    <View style={styles.entry} wrap={false}>
      <EntryHead
        title={project.name}
        subtitle={`${project.role} · ${project.domain}`}
        period={project.period}
      />
      <Text>{project.summary}</Text>
      <Technologies project={project} resume={resume} />
    </View>
  );
}

export function ResumeDocument({ resume }: { resume: Resume }) {
  const { profile, meta } = resume;
  const name = fullName(profile);
  const contacts = profileEndpoints(resume);

  return (
    <Document
      title={`${name} — ${profile.title} Resume`}
      author={name}
      subject={`Resume of ${name}, ${profile.title}`}
      keywords={seoKeywords(resume).join(", ")}
      creator={name}
      producer={meta.siteUrl}
      language="en"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>{profile.title}</Text>
          <Text style={styles.contact}>
            {profile.location.label}
            {contacts.map((contact) => (
              <Text key={contact.href}>
                {CONTACT_SEPARATOR}
                <Link src={contact.href} style={styles.link}>
                  {contact.value}
                </Link>
              </Text>
            ))}
          </Text>
        </View>

        <Section title="Professional Summary">
          <Text>{profile.summary.join(" ")}</Text>
        </Section>

        <Section title="Professional Experience">
          {companyProjects(resume).map((project) => (
            <ExperienceEntry key={project.slug} project={project} resume={resume} />
          ))}
        </Section>

        <Section title="Selected Projects">
          {personalProjects(resume).map((project) => (
            <ProjectEntry key={project.slug} project={project} resume={resume} />
          ))}
        </Section>

        <Section title="Technical Skills">
          {skillGroups(resume).map((group) => (
            <View key={group.label} style={styles.row} wrap={false}>
              <Text style={styles.rowLabel}>{group.label}</Text>
              <Text style={styles.rowValue}>{group.names.join(", ")}</Text>
            </View>
          ))}
        </Section>

        {resume.education.length > 0 ? (
          <Section title="Education">
            {resume.education.map((education) => (
              <View key={education.school} style={styles.entry} wrap={false}>
                <EntryHead title={education.school} subtitle={education.degree} period={education.period} />
              </View>
            ))}
          </Section>
        ) : null}

        <Section title="Languages">
          <Text>
            {profile.languages.map((language) => `${language.name} (${language.level})`).join(", ")}
          </Text>
        </Section>

        <Text style={styles.footer} fixed>
          {name} — Resume
        </Text>
        <Text
          style={[styles.footer, styles.pageNumber]}
          fixed
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
        />
      </Page>
    </Document>
  );
}
