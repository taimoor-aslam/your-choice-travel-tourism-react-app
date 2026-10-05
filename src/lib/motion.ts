import type { Transition, Variants } from "motion/react";

// Expo-out: quick start, long soft landing.
export const ease = [0.16, 1, 0.3, 1] as const;
// For journeys with a take-off and a landing (flight path, menu curtain).
export const easeInOut = [0.65, 0, 0.35, 1] as const;

// Overdamped spring that scroll-linked values follow, so they glide instead of tracking every wheel tick.
export const scrollSpring = { stiffness: 90, damping: 25, mass: 0.5, restDelta: 0.0005 };

// Sliding indicators (nav pill, language thumb, dots): settle without bouncing.
export const glide: Transition = { type: "spring", visualDuration: 0.55, bounce: 0 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease } },
};

// Text rising out of an overflow-hidden mask.
export const rise: Variants = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 1.2, ease } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});
