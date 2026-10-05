import { useScroll, useSpring } from "motion/react";
import { scrollSpring } from "./motion";

// Scroll progress (0 → 1) eased through a spring.
export default function useSmoothScroll(options?: Parameters<typeof useScroll>[0]) {
  const { scrollYProgress } = useScroll(options);
  return useSpring(scrollYProgress, scrollSpring);
}
