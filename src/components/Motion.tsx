"use client";

import { useEffect } from "react";

/**
 * The site's scroll and pointer motion, in one place, mounted once in the layout:
 *
 * - `[data-reveal]` elements get `data-visible` the first time they scroll into view, which plays
 *   their entrance (globals.css).
 * - `<html>` gets `data-scrolled` once the page leaves the top, and `--scroll` (0 to 1) for the
 *   reading progress bar.
 * - `[data-words]` statements light up word by word as they cross the viewport.
 * - `[data-pointer]` elements get `--mx` and `--my` (0 to 1) as the pointer moves over them, for
 *   spotlights and gentle tilts.
 *
 * Under `prefers-reduced-motion: reduce`, everything is shown at once and nothing follows the
 * pointer or the scroll position.
 */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.setAttribute("data-motion", reduced ? "reduced" : "full");

    const words = Array.from(document.querySelectorAll<HTMLElement>("[data-words]")).map(
      (element) => ({ element, spans: Array.from(element.querySelectorAll<HTMLElement>(".word")) }),
    );

    const reveal = (element: Element) => element.setAttribute("data-visible", "");
    const hidden = document.querySelectorAll("[data-reveal]:not([data-visible])");
    if (reduced || !("IntersectionObserver" in window)) {
      hidden.forEach(reveal);
      words.forEach(({ spans }) => spans.forEach((span) => span.setAttribute("data-on", "")));
    }
    const observer =
      !reduced && "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  reveal(entry.target);
                  observer?.unobserve(entry.target);
                }
              }
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
          )
        : null;
    hidden.forEach((element) => observer?.observe(element));

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;
      root.toggleAttribute("data-scrolled", y > 24);
      root.style.setProperty("--scroll", max > 0 ? (y / max).toFixed(4) : "0");
      if (reduced) return;
      const view = window.innerHeight;
      for (const { element, spans } of words) {
        const box = element.getBoundingClientRect();
        // From when the statement's top reaches 85% of the screen to when its bottom reaches 45%.
        const start = view * 0.85;
        const end = view * 0.45 - box.height;
        const progress = Math.min(1, Math.max(0, (start - box.top) / (start - end)));
        const lit = Math.round(progress * spans.length);
        spans.forEach((span, index) => span.toggleAttribute("data-on", index < lit));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const pointerTargets = reduced
      ? []
      : Array.from(document.querySelectorAll<HTMLElement>("[data-pointer]"));
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const target = event.currentTarget as HTMLElement;
      const box = target.getBoundingClientRect();
      target.style.setProperty("--mx", ((event.clientX - box.left) / box.width).toFixed(3));
      target.style.setProperty("--my", ((event.clientY - box.top) / box.height).toFixed(3));
    };
    const onLeave = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLElement;
      target.style.removeProperty("--mx");
      target.style.removeProperty("--my");
    };
    for (const target of pointerTargets) {
      target.addEventListener("pointermove", onPointer);
      target.addEventListener("pointerleave", onLeave);
    }

    return () => {
      observer?.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      for (const target of pointerTargets) {
        target.removeEventListener("pointermove", onPointer);
        target.removeEventListener("pointerleave", onLeave);
      }
    };
  }, []);
  return null;
}
