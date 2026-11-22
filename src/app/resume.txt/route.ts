import { resume } from "@/content/resume";
import { toPlainText } from "@/lib/plain-text";

export function GET() {
  return new Response(toPlainText(resume), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
