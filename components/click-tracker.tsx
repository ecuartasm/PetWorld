"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ClickTracker() {
  const pathname = usePathname();

  useEffect(() => {
    function getClickTarget(el: HTMLElement): string {
      if (el.tagName === "A") return "link";
      if (el.tagName === "BUTTON") return "button";
      if (el.tagName === "INPUT") return `input:${(el as HTMLInputElement).type}`;
      if (el.tagName === "SELECT") return "select";
      if (el.tagName === "TEXTAREA") return "textarea";
      if (el.closest("a")) return "link";
      if (el.closest("button")) return "button";
      return el.tagName.toLowerCase();
    }

    function getClickText(el: HTMLElement): string {
      const interactive = el.closest("a, button") as HTMLElement | null;
      const source = interactive || el;
      const text = source.textContent?.trim().slice(0, 80) || "";
      return text;
    }

    function getClickHref(el: HTMLElement): string {
      const anchor = el.closest("a") as HTMLAnchorElement | null;
      return anchor?.getAttribute("href") || "";
    }

    function handleClick(e: MouseEvent) {
      const el = e.target as HTMLElement;
      if (!el) return;

      const target = getClickTarget(el);
      const text = getClickText(el);
      const href = getClickHref(el);

      navigator.sendBeacon(
        "/api/log",
        JSON.stringify({
          event: "click",
          target,
          text,
          href,
          page: pathname,
        }),
      );
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname]);

  return null;
}
