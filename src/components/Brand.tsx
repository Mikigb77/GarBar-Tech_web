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

/**
 * TaskFlow's mark: its website's favicon (TaskFlowWeb `public/favicon.svg`), the white double tick
 * on the Lagoon gradient tile, as the app's icon has it too.
 */
export function TaskMark({ className = "" }: { className?: string }) {
  return <img className={`task-mark ${className}`} src="/images/taskflow/icon.svg" alt="" />;
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

/**
 * "Coming soon to Google Play", drawn as a store badge the way TaskFlow's and Lucid Saga's sites
 * draw their own. Not a link and not Google's badge: neither app is on Google Play yet.
 */
export function StoreBadge({ store }: { store: { top: string; name: string } }) {
  return (
    <p className="store-badge">
      <svg className="store-badge-play" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 3.8v16.4c0 .8.9 1.3 1.6.9l13.3-8.2c.6-.4.6-1.3 0-1.7L7.6 2.9C6.9 2.5 6 3 6 3.8Z" />
      </svg>
      <span className="store-badge-text">
        <small>{store.top}</small>{" "}
        <strong>{store.name}</strong>
      </span>
    </p>
  );
}
