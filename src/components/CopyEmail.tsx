"use client";

import { useEffect, useRef, useState } from "react";

export function CopyEmail({
  email,
  label,
  copied,
  error,
}: {
  email: string;
  label: string;
  copied: string;
  error: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setStatus("idle"), 3500);
    } catch {
      setStatus("error");
    }
  }
  return (
    <div className="copy-email">
      <button type="button" onClick={copy}>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          aria-hidden="true"
        >
          <rect x="7" y="7" width="10" height="10" rx="2" />
          <path d="M12 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h2" />
        </svg>
        {status === "copied" ? copied : label}
      </button>
      <span role="status" className={status === "error" ? "copy-error" : "sr-only"}>
        {status === "copied" ? copied : status === "error" ? error : ""}
      </span>
    </div>
  );
}
