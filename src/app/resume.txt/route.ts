import { resume } from "@/content/resume";
import { buildMonth } from "@/lib/build-info";
import { toPlainText } from "@/lib/plain-text";

export function GET() {
  return new Response(toPlainText(resume, buildMonth), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
