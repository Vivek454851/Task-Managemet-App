'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  formatValue?: (value: number) => string;
}

export default function AnimatedCounter({
  value,
  duration = 1.2,
  formatValue,
}: AnimatedCounterProps) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => {
    const num = Math.round(latest);
    return formatValue ? formatValue(num) : num.toString();
  });
  const prevValue = useRef(0);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
    });

    prevValue.current = value;

    return () => controls.stop();
  }, [value, duration, motionValue]);

  return (
    <motion.span
      style={{
        display: 'inline-block',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {rounded}
    </motion.span>
  );
}
