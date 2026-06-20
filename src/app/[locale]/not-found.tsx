import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <Logo />
      <p className="mt-8 font-display text-6xl font-bold text-brand">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink">
        Page not found
      </h1>
      <p className="mt-2 max-w-sm text-muted">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link href="/en" className="btn-brand mt-8 !px-6 !py-3">
        Back to home
      </Link>
    </div>
  );
}
