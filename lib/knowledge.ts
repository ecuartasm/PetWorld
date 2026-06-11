import { readFileSync, readdirSync } from "fs";
import { join } from "path";

let cachedContext: string | null = null;

export function getKnowledgeContext(): string {
  if (cachedContext) return cachedContext;

  const knowledgeDir = join(process.cwd(), "knowledge");
  const files = readdirSync(knowledgeDir).filter((f) => f.endsWith(".md"));

  const content = files
    .map((file) => {
      const text = readFileSync(join(knowledgeDir, file), "utf-8");
      return text;
    })
    .join("\n\n---\n\n");

  cachedContext = content;
  return content;
}
