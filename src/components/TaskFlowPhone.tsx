import type { CSSProperties } from "react";
import type { Locale } from "@/content/site";
import { copy } from "@/content/site";

/** TaskFlow's line icons, drawn as on its website (TaskFlowWeb `src/components/Icon.tsx`). */
const paths = {
  logo: ["m3 12 5 5L19 6", "m13 14 3 3 7-8"],
  check: ["m5 12 4 4L19 6"],
  mic: ["M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0V5", "M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8"],
  spark: ["m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"],
  calendar: [
    "M8 2v4M16 2v4",
    "M3 10h18",
    "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2",
    "M7 14h2m6 0h2m-10 4h2m6 0h2",
  ],
  notes: [
    "M8 7h8M8 12h8m-8 5h5",
    "M5 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2",
  ],
  sliders: ["M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3", "M14 2v4M8 10v4M16 18v4"],
} as const;

export type TaskIconName = keyof typeof paths;

export function TaskIcon({
  name,
  size = 20,
  className,
}: {
  name: TaskIconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

const tabIcons: TaskIconName[] = ["calendar", "check", "notes", "sliders"];

/**
 * The TaskFlow app as its website draws it: this week, tomorrow's plan with the two things just
 * said, the Add a task button and the four tabs, in the Lagoon palette. A drawing, not a
 * screenshot, so it follows the app's language and colours.
 */
export function TaskFlowPhone({ locale }: { locale: Locale }) {
  const { app, imageAlt } = copy[locale].projects.taskflow;
  return (
    <div className="tf-device" role="img" aria-label={imageAlt}>
      <span className="tf-device-camera" aria-hidden="true" />
      <div className="tf-screen" aria-hidden="true">
        <div className="tf-app-bar">
          <span className="tf-app-brand">
            <span className="tf-app-mark">
              <TaskIcon name="logo" size={14} />
            </span>
            <span>
              taskflow<span className="tf-dot">.</span>
            </span>
          </span>
          <span className="tf-app-avatar" />
        </div>
        <p className="tf-app-kicker">{app.week}</p>
        <div className="tf-app-week">
          {app.weekdays.map((day, i) => (
            <span key={i} className={i === 4 ? "is-on" : undefined}>
              <small>{day}</small>
              {19 + i}
              {i % 2 === 0 && i < 5 ? <i /> : null}
            </span>
          ))}
        </div>
        <p className="tf-app-day">{app.day}</p>
        <div className="tf-app-list">
          <div className="tf-app-event">
            <time>10:00</time>
            <div>
              <strong>{app.event.title}</strong>
              <small>{app.event.detail}</small>
            </div>
          </div>
          {app.tasks.map((task, i) => (
            <div key={task} className="tf-app-task" style={{ "--n": i } as CSSProperties}>
              <span className="tf-app-check" />
              <strong>{task}</strong>
              <TaskIcon name="spark" size={13} className="tf-app-new" />
            </div>
          ))}
        </div>
        <div className="tf-app-fab">
          <span className="tf-app-fab-ring" />
          <TaskIcon name="mic" size={20} />
          {app.addTask}
        </div>
        <div className="tf-app-tabs">
          {app.tabs.map((label, i) => (
            <span key={label} className={i === 0 ? "is-on" : undefined}>
              <TaskIcon name={tabIcons[i]} size={17} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
