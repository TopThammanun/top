import { resume } from "@/content/resume";
import { toLlmsTxt } from "@/lib/llms";

export function GET() {
  return new Response(toLlmsTxt(resume), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
