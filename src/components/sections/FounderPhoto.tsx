"use client";

import { useState } from "react";

/**
 * Founder portrait. Renders the photo from `src`; if it's missing or fails to
 * load, gracefully falls back to the gradient + initials placeholder.
 */
export function FounderPhoto({
  src,
  name,
  initials,
}: {
  src?: string;
  name: string;
  initials: string;
}) {
  const [ok, setOk] = useState(Boolean(src));

  return (
    <div className="relative flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-brand via-brand to-accent">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {ok && src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          onError={() => setOk(false)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <span className="font-display text-7xl font-bold text-white/90">
          {initials}
        </span>
      )}
    </div>
  );
}
