import { useState, useEffect, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import { Button } from './Button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Discover', href: '/#discover', scrollTarget: 'discover' },
  { label: 'How It Works', href: '/#how', scrollTarget: 'how' },
  { label: 'Experiences', href: '/#experiences', scrollTarget: 'experiences' },
  { label: 'About', href: '/about', isRoute: true },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'bg-cream/90 backdrop-blur-md',
        scrolled ? 'border-b border-line shadow-soft' : 'border-b border-transparent',
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-ink/80 hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink/80 hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ),
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button as="link" href="/login" variant="ghost" size="md">
            Sign In
          </Button>
          <Button as="link" href="/plan" variant="secondary" size="md">
            Plan My Trip
          </Button>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-cream border-b border-line overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {NAV_LINKS.map((link) =>
                link.isRoute ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block py-3 text-base font-medium text-ink hover:text-accent-ink"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block py-3 text-base font-medium text-ink hover:text-accent-ink"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ),
              )}
              <div className="pt-4 space-y-3">
                <Button
                  as="link"
                  href="/login"
                  variant="ghost"
                  size="lg"
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button
                  as="link"
                  href="/plan"
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  Plan My Trip
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}