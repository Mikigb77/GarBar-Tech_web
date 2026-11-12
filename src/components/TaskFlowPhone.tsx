import Image from "next/image";
import type { Locale } from "@/content/site";
import { copy } from "@/content/site";

/** TaskFlow's line icons, drawn as on its website (TaskFlowWeb `src/components/Icon.tsx`). */
const paths = {
  check: ["m5 12 4 4L19 6"],
  mic: ["M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0V5", "M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8"],
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

/**
 * TaskFlow on a phone, as its website's hero shows it: the app's own Calendar screen in the page's
 * language, in the dark Lagoon theme the website opens in. The screens are copied from TaskFlowWeb
 * (`public/images/hero-calendar-*-dark.png`), which renders them from the app.
 */
export function TaskFlowPhone({ locale }: { locale: Locale }) {
  const { imageAlt } = copy[locale].projects.taskflow;
  return (
    <div className="tf-device">
      <span className="tf-device-camera" aria-hidden="true" />
      <div className="tf-screen">
        <Image
          src={`/images/taskflow/hero-calendar-${locale}-dark.png`}
          width={780}
          height={1688}
          sizes="300px"
          alt={imageAlt}
        />
      </div>
    </div>
  );
}
