export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M22 4H12a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8V18H20v8h8v2H12V12h10V4Z"
        fill="currentColor"
      />
      <path d="M28 4h8v8h-8z" fill="var(--accent, #f2633c)" />
    </svg>
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

export function TaskMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="#167263" />
      <path
        d="m9 21 6 6L29 13m-8 14 10-10M15 21l6-6"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
