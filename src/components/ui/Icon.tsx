import {
  Target,
  MessageSquareOff,
  MousePointerClick,
  Briefcase,
  Languages,
  ShieldCheck,
  User,
  Users,
  MapPin,
  Mic,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Target,
  MessageSquareOff,
  MousePointerClick,
  Briefcase,
  Languages,
  ShieldCheck,
  User,
  Users,
  MapPin,
  Mic,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = map[name] ?? Target;
  return <Cmp className={className} aria-hidden="true" strokeWidth={1.75} />;
}
