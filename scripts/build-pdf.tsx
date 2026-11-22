import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { renderToFile } from "@react-pdf/renderer";
import { resume } from "@/content/resume";
import { ResumeDocument } from "@/pdf/ResumeDocument";

const output = join(process.cwd(), "public", "resume.pdf");
mkdirSync(dirname(output), { recursive: true });

renderToFile(<ResumeDocument resume={resume} />, output)
  .then(() => console.log(`wrote ${output}`))
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
