import React, { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

export default function CountUp({ value, suffix = "", pad = 0, className = "" }) {
  const ref = useRef(null);
  const count = useMotionValue(0);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const display = useTransform(
    count,
    (current) =>
      `${pad ? Math.round(current).toString().padStart(pad, "0") : Math.round(current)}${suffix}`,
  );

  useEffect(() => {
    if (!isInView) return undefined;
    if (prefersReducedMotion) {
      count.set(value);
      return undefined;
    }

    const animation = animate(count, value, {
      duration: 1.5,
      ease: "easeOut",
    });
    return () => animation.stop();
  }, [count, isInView, prefersReducedMotion, value]);

  return <motion.span ref={ref} className={className}>{display}</motion.span>;
}
