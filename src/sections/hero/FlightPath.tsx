import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { easeInOut } from "../../lib/motion";

const ROUTE = "M 60 760 C 380 800, 700 580, 920 420 S 1260 140, 1540 40";
const PLANE =
  "M20 0c0-1.6-2-2.6-4-2.6H4L-6-18h-5l6 15.4h-12L-21-8h-4l3 8-3 8h4l4-5.4h12L-11 18h5L4 2.6h12c2 0 4-1 4-2.6Z";

// A red route draws itself across the hero with the plane riding its tip.
export default function FlightPath({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const routeRef = useRef<SVGPathElement>(null);
  const progress = useMotionValue(0);
  const x = useMotionValue(60);
  const y = useMotionValue(760);
  const rotate = useMotionValue(0);

  useMotionValueEvent(progress, "change", (p) => {
    const route = routeRef.current;
    if (!route) return;
    const length = route.getTotalLength();
    const at = route.getPointAtLength(p * length);
    const ahead = route.getPointAtLength(Math.min(p * length + 2, length));
    x.set(at.x);
    y.set(at.y);
    if (ahead.x !== at.x) rotate.set((Math.atan2(ahead.y - at.y, ahead.x - at.x) * 180) / Math.PI);
  });

  useEffect(() => {
    // Imperative animate() ignores MotionConfig, so honour reduced motion by hand.
    if (reduce) return progress.set(1);
    // Ease in-out: the plane builds speed on take-off and eases off as it leaves the frame.
    const controls = animate(progress, 1, { duration: 4.2, delay: 1, ease: easeInOut });
    return () => controls.stop();
  }, [progress, reduce]);

  return (
    <svg
      className={className}
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMaxYMax slice"
      aria-hidden
    >
      <path d={ROUTE} fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="2 12" strokeLinecap="round" />
      <motion.path
        ref={routeRef}
        d={ROUTE}
        fill="none"
        stroke="var(--signal)"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ pathLength: progress }}
      />
      <motion.g style={{ x, y, rotate }}>
        <path d={PLANE} fill="white" transform="scale(1.6)" />
      </motion.g>
    </svg>
  );
}
