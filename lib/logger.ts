import { appendFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const LOG_DIR = join(process.cwd(), "logs");
const LOG_FILE = join(LOG_DIR, "app.log");

function ensureLogDir() {
  if (!existsSync(LOG_DIR)) {
    mkdirSync(LOG_DIR, { recursive: true });
  }
}

function formatEntry(level: string, route: string, method: string, data: Record<string, unknown>): string {
  const timestamp = new Date().toISOString();
  const line = JSON.stringify({ timestamp, level, method, route, ...data });
  return line + "\n";
}

export function logRequest(
  route: string,
  method: string,
  status: number,
  extra?: Record<string, unknown>,
) {
  try {
    ensureLogDir();
    const level = status >= 500 ? "ERROR" : status >= 400 ? "WARN" : "INFO";
    const entry = formatEntry(level, route, method, { status, ...extra });
    appendFileSync(LOG_FILE, entry);
  } catch {
    // Fail silently — logging should never break the app
  }
}

export function logError(route: string, method: string, error: unknown) {
  try {
    ensureLogDir();
    const message = error instanceof Error ? error.message : String(error);
    const entry = formatEntry("ERROR", route, method, { error: message });
    appendFileSync(LOG_FILE, entry);
  } catch {
    // Fail silently
  }
}
