'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgressBar
 *
 * A thin gold progress bar fixed to the top of the viewport that fills
 * as the user scrolls down the page. Uses Framer Motion's useScroll
 * for a buttery-smooth 60fps experience backed by spring physics.
 */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  // Spring-based smoothing — prevents jittery updates on fast scroll
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 origin-left z-[9999]"
      style={{ scaleX }}
    />
  );
}
