import { resume } from "@/content/resume";
import { toJsonResume } from "@/lib/json-resume";

export function GET() {
  return Response.json(toJsonResume(resume));
}
