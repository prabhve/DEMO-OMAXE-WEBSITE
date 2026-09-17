import React, { useEffect, useRef, useState } from 'react';
import { StatItem } from '../../types';

interface StatCounterProps {
  stat: StatItem;
  className?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({ stat, className = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(stat.value);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = performance.now();
          const targetValue = stat.value;

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = easeProgress * targetValue;

            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(targetValue);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    const el = elementRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [stat.value, hasAnimated]);

  const formattedValue =
    stat.decimals !== undefined
      ? count.toFixed(stat.decimals)
      : Math.round(count).toString();

  return (
    <div
      ref={elementRef}
      className={`flex flex-col items-center text-center px-4 py-6 space-y-4 ${className}`}
    >
      <div className="font-display text-5xl sm:text-6xl lg:text-[80px] font-light text-gold leading-none tracking-[-0.02em]">
        {stat.prefix}
        {formattedValue}
        {stat.suffix}
      </div>
      <p className="text-[11px] font-normal uppercase tracking-[0.18em] text-cream">
        {stat.label}
      </p>
      {stat.sublabel && (
        <p className="text-[14px] text-stone font-light tracking-normal max-w-[26ch] leading-[1.6]">
          {stat.sublabel}
        </p>
      )}
    </div>
  );
};
