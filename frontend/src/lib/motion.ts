import type { Variants } from 'framer-motion';

// Shared motion variants. All respect prefers-reduced-motion at runtime via the
// `reduceMotion` flag toggled by the MotionConfig in the app root.

// Scroll-triggered animations using whileInView
export const fadeUp = (delay = 0, distance = 14) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8% 0px -8% 0px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-8% 0px -8% 0px' },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});

export const slideUp = (delay = 0, distance = 20) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8% 0px -8% 0px' },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

// Stagger container for children orchestration
export const staggerContainer = (stagger = 0.08): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const floaty = {
  animate: { y: [0, -10, 0] },
  transition: { duration: 6, repeat: Infinity, ease: 'ease-in-out' },
};

export const liftHover = {
  whileHover: { y: -4, transition: { duration: 0.25, ease: 'easeOut' } },
  whileTap: { scale: 0.98 },
};

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export const accordionContent: Variants = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export const buttonPress = {
  whileTap: { scale: 0.96 },
};

export const shimmer = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: { repeat: Infinity, duration: 2, ease: 'linear' },
  },
};