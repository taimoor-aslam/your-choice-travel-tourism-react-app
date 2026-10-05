import { motion, type HTMLMotionProps } from "motion/react";
import { fadeUp } from "../lib/motion";

export default function Reveal(props: Omit<HTMLMotionProps<"div">, "ref">) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      {...props}
    />
  );
}
