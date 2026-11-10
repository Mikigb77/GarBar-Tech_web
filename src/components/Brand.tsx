import brand from "@/content/brand.json";

/**
 * The GB monogram: a G and an orange B sharing one stem. With `draw`, each stroke is given a path
 * length of 1 so the stylesheet can draw it in (`.mark-draw`), and it settles fully drawn under
 * reduced motion.
 */
export function BrandMark({ className = "", draw = false }: { className?: string; draw?: boolean }) {
  const length = draw ? 1 : undefined;
  return (
    <svg
      className={`brand-mark ${draw ? "mark-draw" : ""} ${className}`}
      viewBox={brand.viewBox}
      fill="none"
      strokeWidth={brand.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path className="mark-g" d={brand.gPath} stroke="currentColor" pathLength={length} />
      <path className="mark-b" d={brand.bPath} stroke={`var(--accent, ${brand.accent})`} pathLength={length} />
    </svg>
  );
}

export function BrandLockup() {
  return (
    <>
      <BrandMark />
      <span>{brand.name}</span>
    </>
  );
}

export function Arrow({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={`arrow ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      {diagonal ? <path d="M5 19 19 5M5 5h14v14" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}
    </svg>
  );
}

/** TaskFlow's mark as its website and app draw it: a double tick on a Lagoon gradient tile. */
export function TaskMark({ className = "" }: { className?: string }) {
  return (
    <span className={`task-mark ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 12 5 5L19 6" />
        <path d="m13 14 3 3 7-8" />
      </svg>
    </span>
  );
}

export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <path
          key={i}
          d="M44 8a6 6 0 0 1 12 0v26l-6 10-6-10V8Z"
          transform={`rotate(${i * 30} 50 50)`}
          fill="currentColor"
        />
      ))}
      <circle cx="50" cy="50" r="18" fill="currentColor" />
    </svg>
  );
}
