import { cn } from "@/lib/utils";

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="xpl-grad" x1="6" y1="6" x2="34" y2="34">
              <stop stopColor="rgb(var(--brand))" />
              <stop offset="1" stopColor="rgb(var(--accent))" />
            </linearGradient>
          </defs>
          <rect
            x="1"
            y="1"
            width="38"
            height="38"
            rx="11"
            fill="rgb(var(--brand) / 0.10)"
            stroke="rgb(var(--brand) / 0.22)"
          />
          <path
            d="M13 12L20 19.5L27 12"
            stroke="url(#xpl-grad)"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 28L20 20.5L27 28"
            stroke="url(#xpl-grad)"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
          />
          <circle cx="20" cy="20" r="2.1" fill="url(#xpl-grad)" />
        </svg>
      </span>
      {showWordmark && (
        <span className="font-display text-lg font-bold tracking-tight text-ink">
          Xplainery
        </span>
      )}
    </span>
  );
}
