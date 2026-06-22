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
      <span className="relative inline-flex h-8 items-center">
        {/* Light mode: black + green mark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-mark.png"
          alt="Xplainery"
          className="block h-8 w-auto dark:hidden"
        />
        {/* Dark mode: white + green mark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-mark-dark.png"
          alt=""
          aria-hidden="true"
          className="hidden h-8 w-auto dark:block"
        />
      </span>
      {showWordmark && (
        <span className="font-display text-lg font-bold tracking-tight text-ink">
          Xplainery
        </span>
      )}
    </span>
  );
}
