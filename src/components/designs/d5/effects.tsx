"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
import {
  motion,
  animate,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const INK = "#0B1A10";
export const DEEP = "#050D08";
export const PANEL = "#0A1710";
export const PAPER = "#F5FAF2";
export const HONEY = "#E8F5E4";
export const LIME = "#66F745";
export const EVERGREEN = "#223528";

/**
 * Hydration-safe reduced-motion flag. framer-motion's useReducedMotion()
 * returns null on the server but the real matchMedia value on the first
 * client render, which makes any markup branching on it mismatch during
 * hydration. This variant stays false until after mount.
 */
export function useReducedMotionSafe() {
  const prefers = useReducedMotion();
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setReduce(prefers === true);
  }, [prefers]);
  return reduce;
}

/* ================= Preloader ================= */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.6,
      ease: [0.32, 0, 0.2, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        window.setTimeout(() => doneRef.current(), 300);
      },
    });
    return () => controls.stop();
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden rounded-b-[3rem] px-6 py-10 sm:px-12"
      style={{ backgroundColor: DEEP }}
      aria-hidden
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#E8F5E4]/50">
          Xplainery
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#E8F5E4]/50">
          Practical AI
        </span>
      </div>

      <div className="flex items-center justify-center">
        <motion.img
          src="/logo-mark-dark.png"
          alt=""
          className="h-16 w-auto sm:h-20"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="flex items-end justify-between">
        <div className="h-px w-full max-w-[40vw] self-center overflow-hidden bg-white/10">
          <motion.div
            className="h-full origin-left"
            style={{ backgroundColor: LIME, scaleX: count / 100 }}
          />
        </div>
        <span
          className="font-display text-7xl font-extrabold tabular-nums leading-none sm:text-8xl"
          style={{ color: LIME }}
        >
          {count}
        </span>
      </div>
    </motion.div>
  );
}

/* ================= Custom cursor ================= */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 250, damping: 25, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 250, damping: 25, mass: 0.6 });
  // Center on the pointer: motion's inline transform overrides Tailwind's
  // -translate-x-1/2, so offset by half the element size here instead.
  const dotX = useTransform(x, (v) => v - 4);
  const dotY = useTransform(y, (v) => v - 4);
  const ringCX = useTransform(ringX, (v) => v - 20);
  const ringCY = useTransform(ringY, (v) => v - 20);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as Element | null;
      setHovering(
        Boolean(t?.closest?.("a, button, [role='button'], input, [data-cursor]")),
      );
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[300] h-2 w-2 rounded-full"
        style={{ x: dotX, y: dotY, backgroundColor: LIME }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[299] h-10 w-10 rounded-full border border-white mix-blend-difference"
        style={{ x: ringCX, y: ringCY }}
        animate={{ scale: hovering ? 2.1 : 1, opacity: hovering ? 0.9 : 0.55 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
    </>
  );
}

/* ================= Scroll progress ================= */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-9 z-[95] h-[2px] origin-left"
      style={{ scaleX, backgroundColor: LIME }}
    />
  );
}

/* ================= Film grain ================= */
const NOISE_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80] opacity-[0.05] mix-blend-soft-light"
      style={{ backgroundImage: NOISE_SVG }}
    />
  );
}

/* ================= Split-word reveal ================= */
export function SplitWords({
  text,
  className,
  wordClassName,
  active = true,
  delay = 0,
  stagger = 0.05,
  once = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  /** When false, waits (e.g. for the preloader) before playing. */
  active?: boolean;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-8% 0px" });
  const reduce = useReducedMotionSafe();
  const show = active && inView;

  const words = text.split(" ");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName)}
            initial={{ y: "115%", rotate: 4 }}
            animate={show ? { y: 0, rotate: 0 } : { y: "115%", rotate: 4 }}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ================= Magnetic hover ================= */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });
  const reduce = useReducedMotionSafe();

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

/* ================= 3D tilt card ================= */
export function TiltCard({
  children,
  className,
  max = 7,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 220, damping: 18 });
  const sry = useSpring(ry, { stiffness: 220, damping: 18 });
  const [hover, setHover] = useState(false);
  const reduce = useReducedMotionSafe();

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * max * 2);
    rx.set((0.5 - py) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
    setHover(false);
  }

  const glareBg = useTransform(
    [gx, gy],
    ([xv, yv]) =>
      `radial-gradient(320px circle at ${xv}% ${yv}%, rgba(255,255,255,0.14), transparent 65%)`,
  );

  return (
    <div style={{ perspective: 900 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={onLeave}
        style={{
          rotateX: srx,
          rotateY: sry,
          transformStyle: "preserve-3d" as CSSProperties["transformStyle"],
        }}
        className={cn("relative h-full will-change-transform", className)}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
            style={{ background: glareBg, opacity: hover ? 1 : 0 }}
          />
        )}
      </motion.div>
    </div>
  );
}

/* ================= Animated counter ================= */
export function Counter({
  value,
  className,
}: {
  /** e.g. "3", "100%", "30 min" — the leading number animates. */
  value: string;
  className?: string;
}) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);
  const reduce = useReducedMotionSafe();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, reduce]);

  return (
    <span ref={ref} className={className}>
      {match ? display : ""}
      {suffix}
    </span>
  );
}

/* ================= Scroll-velocity marquee ================= */
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return min + (((v - min) % range) + range) % range;
}

export function VelocityMarquee({
  children,
  baseVelocity = 1.6,
  className,
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 380,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
    clamp: false,
  });
  const skewX = useTransform(smoothVelocity, [-1200, 1200], ["4deg", "-4deg"]);
  const directionFactor = useRef(1);
  const reduce = useReducedMotionSafe();

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) directionFactor.current = -1;
    else if (vf > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <motion.div
        className="flex w-max items-center will-change-transform"
        style={{ x, skewX }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            aria-hidden={i > 0 || undefined}
            className="flex shrink-0 items-center"
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
