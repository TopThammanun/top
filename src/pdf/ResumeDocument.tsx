import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import type { Education, Project, Resume, Role } from "@/content/types";
import { educationDegree, educationWhen, roleProjects } from "@/lib/career";
import { profileEndpoints, type Endpoint } from "@/lib/endpoints";
import { formatFormalPeriod, formatQuantity } from "@/lib/format";
import { fullName } from "@/lib/identity";
import { splitCode } from "@/lib/rich-text";
import { absoluteUrl, displayUrl } from "@/lib/routes";
import type { SectionId } from "@/lib/sections";
import { personalProjects, skillGroups, techName } from "@/lib/selectors";
import { seoKeywords } from "@/lib/seo";

const INK = "#000000";
const SOFT = "#404040";
const MARGIN_X = 54;
const FOOTER_TOP = 800;
const CONTACT_SEPARATOR = "   |   ";
const DIRECT_CONTACTS: ReadonlySet<string> = new Set(["/email", "/linkedin"]);
const LISTED_PERSONAL_PROJECTS = 2;
const ORPHAN_GUARD = 48;
const PERSONAL_SECTION: SectionId = "personal";

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 52,
    paddingHorizontal: MARGIN_X,
    fontFamily: "Times-Roman",
    fontSize: 10,
    lineHeight: 1.35,
    color: INK,
  },
  header: { alignItems: "center", borderBottomWidth: 1, borderBottomColor: INK, paddingBottom: 10 },
  name: { fontFamily: "Times-Bold", fontSize: 24, lineHeight: 1.2 },
  title: { fontSize: 12, marginTop: 2 },
  contact: { fontSize: 10, marginTop: 5, textAlign: "center" },
  contactNext: { fontSize: 10, marginTop: 2, textAlign: "center" },
  link: { color: INK, textDecoration: "none" },
  section: { marginTop: 10 },
  heading: {
    fontFamily: "Times-Bold",
    fontSize: 11,
    letterSpacing: 0.9,
    borderBottomWidth: 0.75,
    borderBottomColor: INK,
    paddingBottom: 2,
    marginBottom: 5,
  },
  entry: { marginBottom: 7 },
  entryHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  entryTitle: { flex: 1, fontFamily: "Times-Bold", fontSize: 11, paddingRight: 12 },
  entryPeriod: { fontSize: 10 },
  entrySubtitle: { fontFamily: "Times-Italic", marginBottom: 2 },
  roleProject: { marginTop: 5 },
  projectTitle: { flex: 1, paddingRight: 12 },
  bullet: { flexDirection: "row", marginTop: 1.5, paddingLeft: 6 },
  bulletMark: { width: 11 },
  bulletText: { flex: 1 },
  code: { fontFamily: "Courier", fontSize: 9 },
  technologies: { marginTop: 3 },
  label: { fontFamily: "Times-Bold" },
  row: { flexDirection: "row", marginBottom: 2 },
  rowLabel: { width: 128, fontFamily: "Times-Bold" },
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

function ContactLine({ lead, contacts, first }: { lead?: string; contacts: Endpoint[]; first: boolean }) {
  return (
    <Text style={first ? styles.contact : styles.contactNext}>
      {lead}
      {contacts.map((contact, i) => (
        <Text key={contact.href}>
          {lead || i > 0 ? CONTACT_SEPARATOR : null}
          <Link src={contact.href} style={styles.link}>
            {contact.value}
          </Link>
        </Text>
      ))}
    </Text>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.heading} minPresenceAhead={ORPHAN_GUARD}>
        {title.toUpperCase()}
      </Text>
      {children}
    </View>
  );
}

function EntryHead({ title, subtitle, aside }: { title: string; subtitle: string; aside: string }) {
  return (
    <View>
      <View style={styles.entryHead}>
        <Text style={styles.entryTitle}>{title}</Text>
        <Text style={styles.entryPeriod}>{aside}</Text>
      </View>
      <Text style={styles.entrySubtitle}>{subtitle}</Text>
    </View>
  );
}

function Labelled({ label, items }: { label: string; items: string[] }) {
  return (
    <Text style={styles.technologies}>
      <Text style={styles.label}>{label}: </Text>
      {items.join(", ")}
    </Text>
  );
}

function Highlights({ items }: { items: string[] }) {
  return items.map((item) => (
    <View key={item} style={styles.bullet} wrap={false}>
      <Text style={styles.bulletMark}>•</Text>
      <RichText text={item} />
    </View>
  ));
}

function technologies(resume: Resume, project: Project): string[] {
  return project.stack.map((id) => techName(resume, id));
}

function RoleProject({ project, resume }: { project: Project; resume: Resume }) {
  return (
    <View style={styles.roleProject}>
      <View wrap={false} minPresenceAhead={ORPHAN_GUARD}>
        <Text>
          <Text style={styles.label}>Project: {project.name}</Text>
          {` · ${project.domain} · ${formatFormalPeriod(project.period)}`}
        </Text>
        <Text>{project.summary}</Text>
      </View>
      <Highlights items={project.highlights} />
      <Labelled label="Technologies" items={technologies(resume, project)} />
    </View>
  );
}

function RoleEntry({ role, resume }: { role: Role; resume: Resume }) {
  return (
    <View style={styles.entry}>
      <View wrap={false}>
        <EntryHead title={role.title} subtitle={role.employer} aside={formatFormalPeriod(role.period)} />
        <Text>{role.summary}</Text>
        {role.stack.length > 0 ? <Labelled label="Technologies" items={role.stack} /> : null}
      </View>
      {roleProjects(resume, role).map((project) => (
        <RoleProject key={project.slug} project={project} resume={resume} />
      ))}
    </View>
  );
}

function ProjectEntry({ project, resume }: { project: Project; resume: Resume }) {
  return (
    <View style={styles.entry} wrap={false}>
      <View style={styles.entryHead}>
        <Text style={styles.projectTitle}>
          <Text style={styles.label}>{project.name}</Text>
          {` · ${project.domain}`}
        </Text>
        <Text style={styles.entryPeriod}>{formatFormalPeriod(project.period)}</Text>
      </View>
      <Text>{project.summary}</Text>
      <Labelled label="Technologies" items={technologies(resume, project)} />
    </View>
  );
}

function MoreProjects({ resume, count }: { resume: Resume; count: number }) {
  const href = absoluteUrl(resume, `/#${PERSONAL_SECTION}`);
  return (
    <Text>
      {formatQuantity(count, "more project")} with screenshots:{" "}
      <Link src={href} style={styles.link}>
        {displayUrl(href)}
      </Link>
    </Text>
  );
}

function EducationEntry({ education }: { education: Education }) {
  return (
    <View style={styles.entry} wrap={false}>
      <EntryHead
        title={education.school}
        subtitle={educationDegree(education)}
        aside={educationWhen(education)}
      />
      {education.coursework.length > 0 ? <Labelled label="Coursework" items={education.coursework} /> : null}
    </View>
  );
}

export function ResumeDocument({ resume }: { resume: Resume }) {
  const { profile, meta } = resume;
  const name = fullName(profile);
  const contacts = profileEndpoints(resume);
  const direct = contacts.filter((contact) => DIRECT_CONTACTS.has(contact.path));
  const web = contacts.filter((contact) => !DIRECT_CONTACTS.has(contact.path));
  const personal = personalProjects(resume);
  const listed = personal.slice(0, LISTED_PERSONAL_PROJECTS);

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
          <ContactLine lead={profile.location.label} contacts={direct.length > 0 ? direct : web} first />
          {direct.length > 0 ? <ContactLine contacts={web} first={false} /> : null}
        </View>

        <Section title="Professional Summary">
          <Text>{profile.summary.join(" ")}</Text>
        </Section>

        {resume.career.length > 0 ? (
          <Section title="Professional Experience">
            {resume.career.map((role) => (
              <RoleEntry key={role.id} role={role} resume={resume} />
            ))}
          </Section>
        ) : null}

        {listed.length > 0 ? (
          <Section title="Projects">
            {listed.map((project) => (
              <ProjectEntry key={project.slug} project={project} resume={resume} />
            ))}
            {personal.length > listed.length ? (
              <MoreProjects resume={resume} count={personal.length - listed.length} />
            ) : null}
          </Section>
        ) : null}

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
              <EducationEntry key={education.school} education={education} />
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
