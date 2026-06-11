"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Reveals children on scroll into view. Respects prefers-reduced-motion via
 * the CSS in globals.css (the .reveal class collapses to visible there).
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}
