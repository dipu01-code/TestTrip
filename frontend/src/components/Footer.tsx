import { Link } from 'react-router-dom';
import { Logo } from './Logo';

const LINK_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Plan My Trip', href: '/plan' },
      { label: 'Discover', href: '/#discover' },
      { label: 'How It Works', href: '/#how' },
      { label: 'Experiences', href: '/#experiences' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Sign In', href: '/login' },
      { label: 'GitHub', href: 'https://github.com/', external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2">
            <Logo showWordmark className="text-cream" />
            <p className="mt-4 text-sm text-white/60 max-w-xs leading-relaxed">
              Travel beyond the obvious. Discover places that match your taste.
            </p>
          </div>

          {LINK_COLUMNS.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/80 hover:text-accent transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : link.href.startsWith('/') ? (
                      <Link to={link.href} className="text-sm text-white/80 hover:text-accent transition-colors">
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-white/80 hover:text-accent transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} TasteTrip. Built with cultural taste intelligence.
          </p>
          <p className="text-xs text-white/40">
            Qloo and related marks are used under license. Demo content is clearly labeled.
          </p>
        </div>
      </div>
    </footer>
  );
}